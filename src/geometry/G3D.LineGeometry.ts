import BufferView from '../core/G3D.BufferView';
import BaseGeometry from './G3D.BaseGeometry';

interface ILineGeometryConfig {
    vertices?: number[];
    indices?: {
        [propName: string]: number[]
    };
}


class LineGeometry extends BaseGeometry {

    constructor({ vertices, indices }: ILineGeometryConfig = {}) {

        super();

        if (vertices) {

            const normals = [];
            const uvs = [];
            for (let i = 0; i < vertices.length; i += 3) {
                normals.push(0, 0, 1);
                uvs.push(0, 0);
            }

            this.bufferViews = {
                vertices: this.createBufferView(vertices) as BufferView,
                normals: this.createBufferView(normals) as BufferView,
                uvs: this.createBufferView(uvs),
                indices: this.createElementBufferView(indices, true),
            }

        }
    }
}

export default LineGeometry;