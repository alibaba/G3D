import Buffer from '../core/G3D.Buffer';
import BufferView from '../core/G3D.BufferView';
import ElementBufferView from '../core/G3D.ElementBufferView';

import Geometry from './G3D.Geometry';

class LineGeometry {

    bufferViews: any = {};

    facing = Geometry.BOTH;

    constructor({ vertices, indices }: any = {}) {

        if (vertices) {

            this.bufferViews.vertices = new BufferView({
                buffer: new Buffer({
                    data: new Float32Array(vertices),
                    target: 'ARRAY_BUFFER'
                })
            })

            {
                const normals = [];
                for (let i = 0; i < vertices.length; i += 3) {
                    normals.push(0, 0, 1);
                }

                this.bufferViews.normals = new BufferView({
                    buffer: new Buffer({
                        data: new Float32Array(normals),
                        target: 'ARRAY_BUFFER'
                    })
                })
            }

            {
                const uvs = [];
                for (let i = 0; i < vertices.length; i += 3) {
                    uvs.push(0, 0);
                }

                this.bufferViews.uvs = new BufferView({
                    buffer: new Buffer({
                        data: new Float32Array(uvs),
                        target: 'ARRAY_BUFFER'
                    })
                });
            }


            {
                this.bufferViews.indices = {}
                for (let key in indices) {

                    this.bufferViews.indices[key] = new ElementBufferView({
                        buffer: new Buffer({
                            data: new Uint32Array(indices[key]),
                            target: 'ELEMENT_ARRAY_BUFFER'
                        }),
                        mode: 'LINES',
                        count: indices[key].length,
                        type: 'UNSIGNED_INT',
                        offset: 0
                    })
                }
            }

        }
    }
}

export default LineGeometry;