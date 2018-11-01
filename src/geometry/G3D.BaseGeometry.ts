import Buffer from '../core/G3D.Buffer';
import BufferView from "../core/G3D.BufferView";
import ElementBufferView from "../core/G3D.ElementBufferView";

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

    protected createBufferView(data: number[] | BufferView | { [propName: string]: number[] | BufferView }): BufferView | { [propName: string]: BufferView } {

        if (Array.isArray(data)) {

            return new BufferView({
                buffer: new Buffer({
                    data: new Float32Array(data),
                    target: 'ARRAY_BUFFER'
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

    protected createELementBufferView(data: { [propName: string]: number[] | ElementBufferView }, line: boolean = false): { [propName: string]: ElementBufferView } {

        const elementBufferViews = {};

        for (let key in data) {

            elementBufferViews[key] = Array.isArray(data[key]) ? new ElementBufferView({
                buffer: new Buffer({
                    data: new Uint32Array(data[key] as number[]),
                    target: 'ELEMENT_ARRAY_BUFFER'
                }),
                mode: line ? 'LINES' : 'TRIANGLES',
                count: (data[key] as number[]).length,
                type: 'UNSIGNED_INT',
                offset: 0
            }) : data[key];

        }

        return elementBufferViews;
    }

}

export default BaseGeometry;