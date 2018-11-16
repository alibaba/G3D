import Buffer from '../core/G3D.Buffer';
import BufferView from "../core/G3D.BufferView";
import ElementBufferView from "../core/G3D.ElementBufferView";
import ElementBuffer from '../core/G3D.ElementBuffer';
import GL from '../core/G3D.GL';

interface IGeometryBufferViews {
    vertices?: BufferView;
    normals?: BufferView;
    uvs?: BufferView | {
        [propName: string]: BufferView
    },
    indices?: {
        [propName: string]: ElementBufferView
    }
}

class BaseGeometry {

    bufferViews: IGeometryBufferViews = {};

    getBoundingBox() {

        let [minX, maxX, minY, maxY, minZ, maxZ] = [undefined, undefined, undefined, undefined, undefined, undefined];
        const compare = (x, y, z) => {
            if (minX === undefined) { [minX, maxX, minY, maxY, minZ, maxZ] = [x, x, y, y, z, z]; }
            if (x < minX) { minX = x; }
            if (x > maxX) { maxX = x; }
            if (y < minY) { minY = y; }
            if (y > maxY) { maxY = y; }
            if (z < minZ) { minZ = z; }
            if (z > maxZ) { maxZ = z; }
        }

        const { gl } = GL;

        const { indices, vertices } = this.bufferViews;
        const verticesOffset = vertices.byteOffset / 4;
        const verticesStride = vertices.byteStride === 0 ? 3 : vertices.byteStride / 4;

        for (let key in indices) {

            const eleBufferView = indices[key];
            const { count } = eleBufferView;

            const indexBytes = eleBufferView.type === gl.UNSIGNED_INT ? 4 : 2;
            const indexOffset = eleBufferView.byteOffset / indexBytes;

            const indexArray = eleBufferView.type === gl.UNSIGNED_INT ?
                new Uint32Array(eleBufferView.buffer.arrayBuffer) :
                new Uint16Array(eleBufferView.buffer.arrayBuffer);
            const verticeArray = new Float32Array(vertices.buffer.arrayBuffer);

            for (let i = 0; i < count; i++) {
                const j = indexArray[i + indexOffset] * verticesStride + verticesOffset;
                compare(verticeArray[j], verticeArray[j + 1], verticeArray[j + 2]);
            }
        }

        return [minX, maxX, minY, maxY, minZ, maxZ];

    }

    protected createBufferView(data: number[] | BufferView | { [propName: string]: number[] | BufferView }): BufferView | { [propName: string]: BufferView } {

        if (Array.isArray(data)) {

            return new BufferView({
                buffer: new Buffer({
                    data: new Float32Array(data)
                })
            });

        } else if (data instanceof BufferView) {

            return data;

        } else {

            const bufferViews = {};
            for (let key in data) {
                bufferViews[key] = this.createBufferView(data[key]) as BufferView;
            }
            return bufferViews;

        }
    }

    protected createElementBufferView(data: { [propName: string]: number[] | ElementBufferView }, line: boolean = false): { [propName: string]: ElementBufferView } {

        const elementBufferViews = {};

        for (let key in data) {

            elementBufferViews[key] = Array.isArray(data[key]) ? new ElementBufferView({
                buffer: new ElementBuffer({
                    data: new Uint32Array(data[key] as number[])
                }),
                mode: line ? 'LINES' : 'TRIANGLES',
                count: (data[key] as number[]).length,
                type: 'UNSIGNED_INT',
                byteOffset: 0
            }) : data[key];

        }

        return elementBufferViews;
    }

}

export default BaseGeometry;