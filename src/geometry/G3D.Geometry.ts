import Buffer from '../core/G3D.Buffer';
import BufferView from '../core/G3D.BufferView';
import ElementBufferView from '../core/G3D.ElementBufferView';


interface IGeometryConfig {
    vertices?: BufferView | number[];
    normals?: BufferView | number[];
    uvs?: BufferView | number[] | {
        [propName: string]: BufferView | number[]
    };
    indices?: {
        [propName: string]: ElementBufferView | number[]
    };
    mergeNormals?: boolean;
    facing?: FACING;
}

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

enum FACING {
    FRONT, BACK, BOTH
}


class Geometry {

    static FACING = FACING;

    facing: FACING;

    bufferViews: IGeometryBufferViews = {};

    constructor(
        { vertices, normals, uvs, indices, mergeNormals = false, facing = Geometry.FACING.FRONT }: IGeometryConfig = {}
    ) {

        if (mergeNormals && vertices && normals) {
            normals = this.mergeNormals(vertices, normals);
        }

        this.facing = facing;

        if (vertices) {
            this.bufferViews = {
                vertices: this.createBufferView(vertices) as BufferView,
                normals: normals ? this.createBufferView(normals) as BufferView : null,
                uvs: uvs ? this.createBufferView(uvs) : null,
                indices: this.createELementBufferView(indices)
            }
        }

    }

    private createBufferView(data: number[] | BufferView | { [propName: string]: number[] | BufferView }): BufferView | { [propName: string]: BufferView } {

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
                bufferViews[key] = this.createBufferView(data) as BufferView;
            }
            return bufferViews;

        }
    }

    private createELementBufferView(data: { [propName: string]: number[] | ElementBufferView }): { [propName: string]: ElementBufferView } {

        const elementBufferViews = {};

        for (let key in data) {

            elementBufferViews[key] = Array.isArray(data[key]) ? new ElementBufferView({
                buffer: new Buffer({
                    data: new Uint32Array(data[key] as number[]),
                    target: 'ELEMENT_ARRAY_BUFFER'
                }),
                mode: 'TRIANGLES',
                count: (data[key] as number[]).length,
                type: 'UNSIGNED_INT',
                offset: 0
            }) : data[key];

        }

        return elementBufferViews;
    }

    private mergeNormals(vertices, normals) {

        const hash = {};

        for (let i = 0; i < vertices.length; i += 3) {
            const key = [vertices[i], vertices[i + 1], vertices[i + 2]].join(',');
            if (!hash[key]) {
                hash[key] = {
                    indices: [],
                    normal: [0, 0, 0]
                }
            }

            const hashItem = hash[key];
            hashItem.indices.push(i / 3);
            hashItem.normal[0] += normals[i];
            hashItem.normal[1] += normals[i + 1];
            hashItem.normal[2] += normals[i + 2];
        }

        for (let key in hash) {
            const { indices, normal } = hash[key];
            for (let i = 0; i < indices.length; i++) {
                let idx = indices[i];
                normals[idx * 3] = normal[0] / indices.length;
                normals[idx * 3 + 1] = normal[1] / indices.length;
                normals[idx * 3 + 2] = normal[2] / indices.length;
            }
        }

        return normals;
    }
}

export default Geometry;