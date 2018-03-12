class MeshBuilder {

    static createGround(scene, width, height = width) {

        const hWidth = width / 2;
        const hHeight = height / 2;

        const mesh = new Mesh(scene);
        mesh.geometry.vertices = [
            -hWidth, hHeight, 0,
            -hWidth, -hHeight, 0,
            hWidth, -hHeight, 0,
            hWidth, hHeight, 0
        ];
        mesh.geometry.uvs = [0, 1, 0, 0, 1, 0, 1, 1];
        mesh.geometry.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
        mesh.geometry.indices.default = [0, 1, 2, 0, 2, 3];
        return mesh;
    }

    static createCube(scene, width, height = width, depth = width) {
        const w = width / 2;
        const h = height / 2;
        const d = depth / 2;

        return MeshBuilder.createBox(scene, -w, w, h, -h, d, -d);

        const mesh = new Mesh(scene);
        mesh.geometry.vertices = [
            -w, h, d,
            w, h, d,
            w, -h, d,
            -w, -h, d,

            -w, h, -d,
            w, h, -d,
            w, -h, -d,
            -w, -h, -d,

            -w, -h, d,
            -w, h, d,
            -w, h, -d,
            -w, -h, -d,

            w, -h, d,
            w, h, d,
            w, h, -d,
            w, -h, -d,

            -w, h, d,
            w, h, d,
            w, h, -d,
            -w, h, -d,

            -w, -h, d,
            w, -h, d,
            w, -h, -d,
            -w, -h, -d
        ];

        mesh.geometry.uvs = [
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0
        ];

        mesh.geometry.normals = [
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        ];

        mesh.geometry.indices.default = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];

        return mesh;
    }

    static createBox(scene, left, right, top, bottom, front, back) {

        const mesh = new Mesh(scene);
        mesh.geometry.vertices = [
            left, top, front,
            right, top, front,
            right, bottom, front,
            left, bottom, front,

            left, top, back,
            right, top, back,
            right, bottom, back,
            left, bottom, back,

            left, bottom, front,
            left, top, front,
            left, top, back,
            left, bottom, back,

            right, bottom, front,
            right, top, front,
            right, top, back,
            right, bottom, back,

            left, top, front,
            right, top, front,
            right, top, back,
            left, top, back,

            left, bottom, front,
            right, bottom, front,
            right, bottom, back,
            left, bottom, back
        ];

        mesh.geometry.uvs = [
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 1, 0
        ];

        mesh.geometry.normals = [
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        ];

        mesh.geometry.indices.default = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];

        return mesh;
    }

    static createSphere(scene, radius, widthSeg = 16, heightSeg = 12) {

        const phiStart = 0;
        const phiLength = Math.PI * 2;

        const thetaStart = 0;
        const thetaLength = Math.PI;

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        const grid = [];
        let index = 0;

        for (let iy = 0; iy <= heightSeg; iy++) {
            const verticesRow = [];

            const v = iy / heightSeg;
            for (let ix = 0; ix <= widthSeg; ix++) {
                const u = ix / widthSeg;

                const x = - radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                const y = radius * Math.cos(thetaStart + v * thetaLength);
                const z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

                vertices.push(x, y, z);

                const normal = Vec3.normalize(Vec3.create(), Vec3.fromValues(x, y, z));
                normals.push(...normal);

                uvs.push(u, v);

                verticesRow.push(index++);
            }

            grid.push(verticesRow);
        }

        for (let iy = 0; iy < heightSeg; iy++) {
            for (let ix = 0; ix < widthSeg; ix++) {
                const a = grid[iy][ix + 1];
                const b = grid[iy][ix];
                const c = grid[iy + 1][ix];
                const d = grid[iy + 1][ix + 1];
                if (iy !== 0 || thetaStart > 0) {
                    indices.push(a, b, d)
                };
                if (iy !== heightSeg - 1 || thetaLength < Math.PI) {
                    indices.push(b, c, d)
                };
            }

        }

        const mesh = new Mesh(scene);
        mesh.geometry.vertices = vertices;
        mesh.geometry.uvs = uvs;
        mesh.geometry.normals = normals;
        mesh.geometry.indices.default = indices;

        return mesh;
    }

    static createCylinder(scene, radius, height, segs = 16) {

        const vertices = [];
        const uvs = [];
        const normals = [];
        const indices = [];

        const dTheta = Math.PI * 2 / segs;
        const halfHeight = height / 2;

        const body = function () {

            const iStart = vertices.length / 3;

            for (let i = 0; i < segs; i++) {
                const theta1 = dTheta * i;
                const theta2 = dTheta * (i + 1);

                const p1 = [Math.cos(theta1) * radius, -halfHeight, Math.sin(theta1) * radius];
                const p2 = [Math.cos(theta1) * radius, halfHeight, Math.sin(theta1) * radius];
                const n1 = [p1[0], 0, p1[2]];
                const n2 = [p2[0], 0, p2[2]];

                vertices.push(...p1, ...p2);
                uvs.push(0, 0, 0, 0);
                normals.push(...n1, ...n2);

                const base = i * 2;
                if (i === segs - 1) {
                    indices.push(base, base + 1, iStart + 1, base, iStart, iStart + 1);
                } else {
                    indices.push(base, base + 1, base + 3, base, base + 3, base + 2);
                }
            }
        }

        const cop = function (y) {

            const iStart = vertices.length / 3;

            const center = [0, halfHeight * y, 0];
            const normal = [0, y, 0];
            const uv = [0, 0];
            vertices.push(...center);
            normals.push(...normal);
            uvs.push(...uv);
            for (let i = 0; i < segs; i++) {

                const theta = i * dTheta;

                const p = [Math.cos(theta) * radius, halfHeight * y, Math.sin(theta) * radius];
                vertices.push(...p);
                normals.push(...normal);
                uvs.push(...uv);

                if (i !== segs - 1) {
                    indices.push(iStart, iStart + i + 1, iStart + i + 2);
                } else {
                    indices.push(iStart, iStart + i + 1, iStart + 1);
                }
            }
        }

        body();
        cop(1);
        cop(-1);

        const mesh = new Mesh(scene);
        mesh.geometry.vertices = vertices;
        mesh.geometry.uvs = uvs;
        mesh.geometry.normals = normals;
        mesh.geometry.indices.default = indices;

        return mesh;
    }

    static createCone(scene, radius, height, segs = 16) {
        const vertices = [];
        const uvs = [];
        const normals = [];
        const indices = [];

        const halfHeight = height / 2;
        const dTheta = Math.PI * 2 / segs;

        const body = function () {
            const iStart = vertices.length / 3;

            const center = [0, halfHeight, 0];

            const beta = Math.atan(radius / height);
            const cosBeta = Math.cos(beta);
            const sinBeta = Math.sin(beta);

            for (let i = 0; i < segs; i++) {
                const theta = dTheta * i;

                const p = [Math.cos(theta) * radius, -halfHeight, Math.sin(theta) * radius];
                const n = [Math.cos(theta) * cosBeta, sinBeta, Math.sin(theta) * cosBeta];
                const uv = [0, 0];

                vertices.push(...center, ...p);
                normals.push(...n, ...n);
                uvs.push(...uv, ...uv);
                const base = iStart + i * 2;
                if (i !== segs - 1) {
                    indices.push(base, base + 1, base + 3);
                } else {
                    indices.push(base, base + 1, iStart + 1);
                }
            }


        }

        const cop = function (y) {

            const iStart = vertices.length / 3;

            const center = [0, halfHeight * y, 0];
            const normal = [0, y, 0];
            const uv = [0, 0];
            vertices.push(...center);
            normals.push(...normal);
            uvs.push(...uv);
            for (let i = 0; i < segs; i++) {
                const theta = i * dTheta;
                const p = [Math.cos(theta) * radius, halfHeight * y, Math.sin(theta) * radius];
                vertices.push(...p);
                normals.push(...normal);
                uvs.push(...uv);
                if (i !== segs - 1) {
                    indices.push(iStart, iStart + i + 1, iStart + i + 2);
                } else {
                    indices.push(iStart, iStart + i + 1, iStart + 1);
                }
            }
        }

        body();
        cop(-1);


        const mesh = new Mesh(scene);
        mesh.geometry.vertices = vertices;
        mesh.geometry.uvs = uvs;
        mesh.geometry.normals = normals;
        mesh.geometry.indices.default = indices;

        return mesh;
    }

    static createCoordinate(scene, size) {

        const mesh = new Mesh(scene);

        var xc = new LineMesh(scene);
        xc.geometry.vertices = [0, 0, 0, size, 0, 0];
        xc.geometry.indices.default = [0, 1];
        xc.materials.default.color.r = 256;
        xc.materials.default.color.g = 0;
        xc.materials.default.color.b = 0;
        xc.parent = mesh;

        var yc = new LineMesh(scene);
        yc.geometry.vertices = [0, 0, 0, 0, size, 0];
        yc.geometry.indices.default = [0, 1];
        yc.materials.default.color.r = 0;
        yc.materials.default.color.g = 256;
        yc.materials.default.color.b = 0;
        yc.parent = mesh;

        var zc = new LineMesh(scene);
        zc.geometry.vertices = [0, 0, 0, 0, 0, size];
        zc.geometry.indices.default = [0, 1];
        zc.materials.default.color.r = 0;
        zc.materials.default.color.g = 0;
        zc.materials.default.color.b = 256;
        zc.parent = mesh;

        return mesh;
    }

    static createFromObjModel(scene, model) {

        model = ObjParser.parse(model);

        const flatten = arr => {
            const res = [];
            arr.forEach(a => res.push(...a));
            return res;
        }

        const mesh = new Mesh(scene);
        mesh.geometry.vertices = flatten(model.positions);
        mesh.geometry.uvs = flatten(model.uvs);
        mesh.geometry.normals = flatten(model.normals);
        for (let key in model.indices) {
            const indices = model.indices[key];
            const mtl = model.mtls[key];
            if (!mtl) {
                mesh.geometry.indices.default = indices;
            } else {
                mesh.geometry.indices[key] = indices;

                if (!mesh.materials[key]) {
                    mesh.materials[key] = new StandardMaterial(mesh);
                }

                if (mtl.ambientColor) {
                    mesh.materials[key].ambientColor = {
                        r: mtl.ambientColor[0] * 255,
                        g: mtl.ambientColor[1] * 255,
                        b: mtl.ambientColor[2] * 255,
                    }
                }
                if (mtl.ambientTexture) {
                    const image = new Env.Image();
                    image.crossOrigin = true;
                    image.onload = function () {
                        mesh.materials[key].ambientTexture.image = image;
                        mesh.materials[key].ambientSource = Material.TEXTURE;
                    }
                    image.src = mtl.ambientTexture;
                }

                if (mtl.diffuseColor) {
                    mesh.materials[key].diffuseColor = {
                        r: mtl.diffuseColor[0] * 255,
                        g: mtl.diffuseColor[1] * 255,
                        b: mtl.diffuseColor[2] * 255,
                    }
                }
                if (mtl.diffuseTexture) {
                    const image = new Env.Image();
                    image.crossOrigin = true;
                    image.onload = function () {
                        mesh.materials[key].diffuseTexture.image = image;
                        mesh.materials[key].diffuseSource = Material.TEXTURE;
                    }
                    image.src = mtl.diffuseTexture;
                }

                if (mtl.specularColor) {
                    mesh.materials[key].specularColor = {
                        r: mtl.specularColor[0] * 255,
                        g: mtl.specularColor[1] * 255,
                        b: mtl.specularColor[2] * 255,
                    }
                }
                if (mtl.specularTexture) {
                    const image = new Env.Image();
                    image.crossOrigin = true;
                    image.onload = function () {
                        mesh.materials[key].specularTexture.image = image;
                        mesh.materials[key].specularSource = Material.TEXTURE;
                    }
                    image.src = mtl.specularTexture;
                }
            }
        }
        return mesh;
    }

    static createFromStlModel(scene, model) {
        model = StlParser.parse(model);

        const mesh = new Mesh(scene);
        mesh.geometry.vertices = model.positions;
        mesh.geometry.uvs = model.uvs;
        mesh.geometry.normals = model.normals;
        mesh.geometry.indices.default = model.indices;

        return mesh;
    }

    static createFromG3DModel(scene, model) {

        const mesh = new MorphTargetMesh(scene);

        mesh.geometry.vertices = [];
        mesh.geometry.uvs = [];
        mesh.geometry.normals = [];
        mesh.geometry.indices.default = [];

        const makeGeometry = function (oVertices, faces) {

            const vertices = [];
            const uvs = [];
            const normals = [];

            for (let i = 0; i < faces.length; i += 8) {
                const idx = [faces[i + 1], faces[i + 2], faces[i + 3]];
                const vts = idx.map(k => [oVertices[k * 3], oVertices[k * 3 + 1], oVertices[k * 3 + 2]]);

                const V1 = Vec3.sub(Vec3.create(), Vec3.fromValues(...vts[0]), Vec3.fromValues(...vts[1]));
                const V2 = Vec3.sub(Vec3.create(), Vec3.fromValues(...vts[0]), Vec3.fromValues(...vts[2]));
                const VN = Vec3.cross(Vec3.create(), V1, V2);

                for (let j = 0; j < 3; j++) {
                    const p = idx[j] * 3;
                    vertices.push(...vts[j]);
                    uvs.push(0.0, 0.0);
                    normals.push(...VN);
                }
            }

            return { vertices, uvs, normals };
        }

        for (let i = 0; i < model.faces.length; i += 8) {
            const k = i / 8;
            mesh.geometry.indices.default.push(k * 3, k * 3 + 1, k * 3 + 2);
        }

        const { vertices, uvs, normals } = makeGeometry(model.vertices, model.faces);
        mesh.geometry.vertices = vertices;
        mesh.geometry.uvs = uvs;
        mesh.geometry.normals = normals;

        mesh.morphTargetsGeometries = model.morphTargets.map(item => {
            const { vertices, uvs, normals } = makeGeometry(item.vertices, model.faces);
            const geometry = new Geometry(mesh);
            geometry.vertices = vertices;
            geometry.uvs = uvs;
            geometry.normals = normals;
            geometry.indices = mesh.geometry.indices;
            return geometry;
        });

        return mesh;
    }

    static createWireFrameFromMesh(scene, target) {
        const mesh = new LineMesh(scene);

        const cache = {};

        function addLine(i, j) {
            const key1 = `${i}-${j}`;
            const key2 = `${j}-${i}`;
            if (!cache[key1] && !cache[key2]) {
                mesh.geometry.indices.default.push(i, j);
            }
        }

        mesh.geometry.vertices = [...target.geometry.vertices];

        for (let key in target.geometry.indices) {

            const source = target.geometry.indices[key];

            for (let i = 0; i < source.length; i += 3) {
                addLine(source[i], source[i + 1]);
                addLine(source[i], source[i + 2]);
                addLine(source[i + 1], source[i + 2]);
            }

        }

        return mesh;
    }

    static createBoundingBoxFromMesh(scene, target) {

        const vertices = target.geometry.vertices;

        if (vertices.length > 0) {

            let left, right, top, bottom, front, back;
            left = right = top = bottom = front = back = null;

            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const y = vertices[i + 1];
                const z = vertices[i + 2];

                if (left === null) {
                    left = right = x;
                    top = bottom = y;
                    front = back = z;
                } else {
                    left = Math.min(left, x);
                    right = Math.max(right, x);
                    bottom = Math.min(bottom, y);
                    top = Math.max(top, y);
                    back = Math.min(back, z);
                    front = Math.max(front, z);
                }
            }

            return this.createBox(scene, left, right, top, bottom, front, back);
        }





    }

    static createLineFromPath(scene, path, resolution) {
        const { vertices, indices } = PathParser.parseToLine(path, resolution);
        const line = new LineMesh(scene);
        line.geometry.vertices.push(...vertices);
        line.geometry.indices.default.push(...indices);
        return line;
    }

    static createMeshFromPath(scene, path, thickness, resolution) {
        const { vertices: mv, indices: mi, uvs, normals } = PathParser.parseToGeometry(path, thickness, resolution);
        const mesh = new Mesh(scene);
        mesh.geometry.vertices = mv;
        mesh.geometry.normals = normals;
        mesh.geometry.uvs = uvs;
        mesh.geometry.indices.default.push(...mi);
        return mesh;
    }
}

export default MeshBuilder;