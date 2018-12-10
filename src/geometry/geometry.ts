import BufferView from "../buffer/buffer-view";
import ElementBufferView from "../buffer/element-buffer-view";
import BaseGeometry from "./base-geometry";

interface IGeometryConfig {
    vertices?: BufferView | number[];
    normals?: BufferView | number[];
    uvs?: BufferView | number[] | {
        [propName: string]: BufferView | number[],
    };
    indices?: {
        [propName: string]: ElementBufferView | number[],
    };
    mergeNormals?: boolean;
    facing?: FACING;
}

enum FACING {
    FRONT, BACK, BOTH,
}

class Geometry extends BaseGeometry {

    public static FACING = FACING;

    public facing: FACING;

    constructor(
        { vertices, normals, uvs, indices, mergeNormals = false, facing = Geometry.FACING.FRONT }: IGeometryConfig = {},
    ) {

        super();

        if (mergeNormals && Array.isArray(vertices) && Array.isArray(normals)) {
            normals = this.mergeNormals(vertices, normals);
        }

        this.facing = facing;

        if (vertices) {
            this.bufferViews = {
                vertices: this.createBufferView(vertices) as BufferView,
                normals: normals ? this.createBufferView(normals) as BufferView : null,
                uvs: uvs ? this.createBufferView(uvs) : null,
                indices: this.createElementBufferView(indices),
            };
        }
    }

    private mergeNormals(vertices: number[], normals: number[]): number[] {

        const hash = {};

        for (let i = 0; i < vertices.length; i += 3) {
            const key = [vertices[i], vertices[i + 1], vertices[i + 2]].join(",");
            if (!hash[key]) {
                hash[key] = {
                    indices: [],
                    normal: [0, 0, 0],
                };
            }

            const hashItem = hash[key];
            hashItem.indices.push(i / 3);
            hashItem.normal[0] += normals[i];
            hashItem.normal[1] += normals[i + 1];
            hashItem.normal[2] += normals[i + 2];
        }

        for (const key in hash) {
            const { indices, normal } = hash[key];
            for (let i = 0; i < indices.length; i++) {
                const idx = indices[i];
                normals[idx * 3] = normal[0] / indices.length;
                normals[idx * 3 + 1] = normal[1] / indices.length;
                normals[idx * 3 + 2] = normal[2] / indices.length;
            }
        }

        return normals;
    }
}

export default Geometry;
