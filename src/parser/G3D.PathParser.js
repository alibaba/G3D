function Quadratic(x0, y0, x1, y1, x2, y2, resolution) {

    function QuadraticBezierP0(t, p) {
        var k = 1 - t;
        return k * k * p;
    }

    function QuadraticBezierP1(t, p) {
        return 2 * (1 - t) * t * p;
    }

    function QuadraticBezierP2(t, p) {
        return t * t * p;
    }

    function QuadraticBezier(t, p0, p1, p2) {
        return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) +
            QuadraticBezierP2(t, p2);
    }

    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.sqrt(dx * dx + dy * dy);

    let divs = Math.ceil(len / resolution);
    if (divs < 3) {
        divs = 3;
    }

    const vertices = [];

    for (let i = 1; i <= divs; i++) {
        const x = QuadraticBezier(i / divs, x0, x1, x2);
        const y = QuadraticBezier(i / divs, y0, y1, y2);
        vertices.push(x, y);
    }

    return vertices;
}

const PathParser = {

    parse: function (data, resolution) {

        data = data.split('\n').join('');

        const list = data.split(' ').filter(Boolean);

        const vertices = [];
        const lines = [];

        let i = 0;
        let line = [];

        let current = null;

        while (i < list.length) {

            switch (list[i++]) {
                case 'm':
                    {
                        const x = Number(list[i++]);
                        const y = Number(list[i++]);

                        if (line.length) {
                            checkLineRing(line);
                            lines.push(line);
                            line = [];
                        }

                        vertices.push(x, y);
                        line.push(vertices.length / 2 - 1);

                        current = [x, y];

                        break;
                    }
                case 'q':
                    {
                        const [x0, y0] = current;
                        const x2 = Number(list[i++]);
                        const y2 = Number(list[i++]);
                        const x1 = Number(list[i++]);
                        const y1 = Number(list[i++]);
                        const points = Quadratic(x0, y0, x1, y1, x2, y2, resolution);
                        for (let i = 0; i < points.length; i += 2) {
                            vertices.push(points[i], points[i + 1]);
                            line.push(vertices.length / 2 - 1);
                        }

                        current = [x2, y2];

                        break;
                    }
                case 'l':
                    {
                        const x = Number(list[i++]);
                        const y = Number(list[i++]);
                        vertices.push(x, y);
                        line.push(vertices.length / 2 - 1);

                        current = [x, y];

                        break;
                    }
                default:
                    throw new Error('parse path failed, unhandled item ' + list[i]);
            }
        }

        checkLineRing(line);
        lines.push(line);
        line = [];

        function checkLineRing(line) {
            const len = line.length;
            const i = line[0];
            const j = line[len - 1];

            if (
                vertices[i * 2] === vertices[j * 2] &&
                vertices[i * 2 + 1] === vertices[j * 2 + 1] &&
                j * 2 + 1 === vertices.length - 1
            ) {
                vertices.pop();
                vertices.pop();
                line[len - 1] = i;
            }
        }

        return { vertices, lines };
    },

    parseToLine: function (data, resolution) {

        const { vertices, lines } = this.parse(data, resolution);

        const indices = [];

        lines.forEach((line, i) => {
            line.forEach((item, j) => {
                if (j !== 0) {
                    indices.push(line[j - 1], item);
                }
            });
        });

        const vertices3d = [];
        for (let i = 0; i < vertices.length; i += 2) {
            vertices3d.push(vertices[i], vertices[i + 1], 0);
        }


        return { vertices: vertices3d, indices };
    },

    parseToTriangles: function (data, resolution) {

        const { vertices, lines } = this.parse(data, resolution);

        const clonedLines = cloneLines(lines);

        const { polygons, holes } = distinguish(lines);

        const indices = earcut(polygons, holes, []);

        const vertices3d = [];
        const normals = [];
        const uvs = [];
        for (let i = 0; i < vertices.length; i += 2) {
            vertices3d.push(vertices[i], vertices[i + 1], 0);
            normals.push(0, 0, 1);
            uvs.push(0, 0);
        }

        return {
            vertices: vertices3d,
            indices,
            normals,
            uvs,
            lines: clonedLines
        };

        function earcut(polygons, holes, triangles) {

            if (holes.length > 0) {

                const res = removeHoles(polygons, holes);
                polygons = res.polygons;
                holes = res.holes;
            }

            polygons.forEach(polygon => {
                triangles.push(...earcutPolygon(polygon));
            });

            return triangles;
        }

        function earcutPolygon(polygon) {
            if (polygon.length < 3) {

                throw 'not valid polygon'

            } else if (polygon.length === 3) {

                if (polygon[0] === polygon[2]) {
                    return [];
                } else {
                    throw new Error('invalid polygon');
                }

            } else {

                for (let i = 1; i < polygon.length - 1; i++) {

                    const [j0, j1, j2] = [
                        i - 1,
                        i,
                        i + 1
                    ]
                    const [i0, i1, i2] = [polygon[j0], polygon[j1], polygon[j2]];

                    if (isEar(i0, i1, i2, polygon)) {
                        polygon.splice(i, 1);
                        return [
                            i0, i1, i2, ...earcutPolygon(polygon)
                        ]
                    }
                }

                throw new Error('hole not cleaned');
                // return [];
            }
        }

        function distinguish(indices) {

            const polygons = [];
            const holes = [];

            indices.forEach((list) => {

                let sum = 0;

                for (let i = 0; i < list.length - 1; i++) {
                    const j = i + 1;
                    const [x0, y0, x1, y1] = [...pt(list[i]), ...pt(list[j])];
                    sum += (x1 - x0) * (y1 + y0);
                }

                if (sum >= 0) {
                    polygons.push(list);
                } else {
                    holes.push(list)
                }
            })

            return {
                polygons,
                holes
            }
        }

        function pt(i) {
            return [vertices[i * 2], vertices[i * 2 + 1]];
        }

        // -1 for left side
        // 1 for right side
        // 0 for on the segment
        // NaN for on the line but not on the segment
        function sign(x, y, x0, y0, x1, y1) {
            const res = (x - x1) * (y0 - y1) - (x0 - x1) * (y - y1);
            if (res === 0) {
                if ((x - x0) * (x - x1) <= 0 && (y - y0) * (y - y1) <= 0) {
                    return 0;
                } else {
                    return NaN;
                }
            } else {
                return res > 0 ? 1 : -1;
            }
        }

        function insideTriangle(x, y, x0, y0, x1, y1, x2, y2) {

            const s0 = sign(x, y, x0, y0, x1, y1);
            const s1 = sign(x, y, x1, y1, x2, y2);
            const s2 = sign(x, y, x2, y2, x0, y0);

            if (isNaN(s0 * s1 * s2)) {
                return false;
            } else if (s0 * s1 * s2 === 0) {
                return true;
            } else if (s0 === s1 && s0 === s2) {
                return true;
            } else {
                return false;
            }
        }

        function isEar(i0, i1, i2, polygon) {
            const [x0, y0, x1, y1, x2, y2] = [...pt(i0), ...pt(i1), ...pt(i2)];
            const v1 = [x1 - x0, y1 - y0];
            const v2 = [x2 - x1, y2 - y1];
            const cross = Vec2.cross([], v1, v2);

            const convex = sign(x2, y2, x0, y0, x1, y1) <= 0;
            if (!convex) {
                return false;
            }

            for (let i = 0; i < polygon.length; i++) {
                const ix = polygon[i];
                if (ix !== i0 && ix !== i1 && ix !== i2) {
                    const [x, y] = pt(ix);
                    if (insideTriangle(x, y, x0, y0, x1, y1, x2, y2)) {
                        return false;
                    }
                }
            }

            return true;
        }

        function removeHoles(polygons, holes) {

            if (holes.length === 0) {
                return {
                    polygons, holes
                }
            }

            for (let hi = 0; hi < holes.length; hi++) {

                let hole = holes[hi];

                for (let hvi = 0; hvi < hole.length; hvi++) {
                    const hv = hole[hvi];
                    const [hvx, hvy] = pt(hv);

                    for (let pi = 0; pi < polygons.length; pi++) {
                        let polygon = polygons[pi];

                        for (let pvi = 0; pvi < polygon.length; pvi++) {
                            const pv = polygon[pvi];

                            const [pvx, pvy] = pt(pv);

                            if (visible(hvx, hvy, pvx, pvy)) {

                                polygons.splice(pi, 1);
                                holes.splice(hi, 1);

                                hole.pop();
                                hole = hole.splice(hvi).concat(hole);
                                hole.push(hv);

                                polygon.splice(pvi + 1, 0, ...hole, pv);

                                polygons.push(polygon);

                                return removeHoles(polygons, holes);
                            }
                        }
                    }

                    throw new Error('can not find visible point pair');
                }

            }


            function visible(x0, y0, x1, y1) {

                const lines = [...polygons, ...holes];

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    for (let j = 0; j < line.length - 1; j++) {
                        const [v2, v3] = [line[j], line[j + 1]];

                        const [x2, y2, x3, y3] = [...pt(v2), ...pt(v3)];

                        if (intersect(x0, y0, x1, y1, x2, y2, x3, y3)) {
                            return false;
                        }
                    }
                }

                return true;
            }

            function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {

                const s0 = sign(x0, y0, x2, y2, x3, y3);
                const s1 = sign(x1, y1, x2, y2, x3, y3);
                const s2 = sign(x2, y2, x0, y0, x1, y1);
                const s3 = sign(x3, y3, x0, y0, x1, y1);

                if (isNaN(s0 * s1 * s2 * s3)) {
                    return false;
                }

                if (s0 * s1 < 0 && s2 * s3 < 0) {
                    return true;
                } else {
                    return false;
                }
            }

            return {
                polygons,
                holes: []
            }
        }

        function cloneLines(lines) {
            return lines.map(line => [...line]);
        }
    },

    parseToGeometry: function (data, thickness = 100, resolution = 10) {

        const { vertices: f1Vertices, indices: f1Indices, lines } = this.parseToTriangles(data, resolution);

        const f1Normals = [];
        const f1UVs = [];
        const f2Normals = [];
        const f2UVs = [];
        f1Vertices.forEach((v, i) => {
            if (i % 3 === 2) {
                f1Vertices[i] = thickness / 2;
                f1Normals.push(0, 0, 1);
                f1UVs.push(0, 0);
                f2Normals.push(0, 0, -1);
                f2UVs.push(0, 0);
            }
        })

        const f2Vertices = f1Vertices.map((v, i) => {
            if (i % 3 === 2) {
                return -thickness / 2;
            } else {
                return v;
            }
        })

        const f2Indices = [...f1Indices];

        const f3Vertices = [];
        const f3Indices = [];
        const f3Normals = [];
        const f3UVs = [];

        lines.forEach(line => {
            for (let i = 0; i < line.length - 1; i++) {
                const j = i + 1;
                const [v1, v2, v3, v4] = [
                    pt(f1Vertices, line[i]),
                    pt(f1Vertices, line[j]),
                    pt(f2Vertices, line[i]),
                    pt(f2Vertices, line[j])
                ];
                const norm = normal(v1, v2, v4);

                const s = f3Vertices.length / 3;
                f3Vertices.push(...v1, ...v2, ...v3, ...v4);
                f3Normals.push(...norm, ...norm, ...norm, ...norm);
                f3UVs.push(0, 0, 0, 0, 0, 0, 0, 0);
                f3Indices.push(s, s + 1, s + 2, s + 1, s + 2, s + 3);
            }
        });

        return merge(
            [f1Vertices, f2Vertices, f3Vertices],
            [f1Indices, f2Indices, f3Indices],
            [f1Normals, f2Normals, f3Normals],
            [f1UVs, f2UVs, f3UVs]
        );

        function merge(vList, iList, nList, uList) {

            if (vList.length !== iList.length) {
                throw new Error('merge vertices not valid');
            }

            let vertices = [];
            let indices = [];
            let normals = [];
            let uvs = [];

            for (let i = 0; i < vList.length; i++) {
                const len = vertices.length / 3;
                vertices = vertices.concat(vList[i]);
                indices = indices.concat(iList[i].map(v => v + len));
                normals = normals.concat(...nList[i]);
                uvs = normals.concat(...uList[i]);
            }

            return {
                vertices, indices, normals, uvs
            }
        }

        function pt(vertices, i) {
            return [
                vertices[i * 3],
                vertices[i * 3 + 1],
                vertices[i * 3 + 2]
            ];
        }

        function normal(v1, v2, v3) {
            const a1 = Vec3.sub([], v1, v2);
            const a2 = Vec3.sub([], v2, v3);
            return Vec3.cross([], a1, a2);
        }
    }
}

export default PathParser;