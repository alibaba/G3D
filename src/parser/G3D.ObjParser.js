const vertexPattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
const normalPattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
const uvPattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
const facePattern1 = /f\s+(([\d]{1,}[\s]?){3,})+/;
const facePattern2 = /f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
const facePattern3 = /f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
const facePattern4 = /f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
const usemtlPattern = /^usemtl /;
const mtllibPattern = /^mtllib /;
const groupPattern = /^g/;

const ObjParser = {

    parse: function (data) {

        const positions = [];
        const normals = [];
        const uvs = [];
        const tuple = [];

        const target = {
            positions: [],
            uvs: [],
            normals: [],
            indices: {},
            mtls: data.mtl ? this.parseMtl(data.mtl) : {}
        };
        let curPos = 0;
        let curMtl = null;

        const lines = data.obj.split('\n');

        lines.forEach(line => {
            line = line.trim();
            let result;
            if (line.length === 0 || line.charAt(0) === '#') {
                return;
            } else if ((result = vertexPattern.exec(line)) !== null) {
                positions.push(result.splice(1).map(Number));
            } else if ((result = normalPattern.exec(line)) !== null) {
                normals.push(result.splice(1).map(Number));
            } else if ((result = uvPattern.exec(line)) !== null) {
                uvs.push(result.splice(1).map(Number));
            } else if ((result = facePattern3.exec(line)) !== null) {
                setDataForCurrentFaceWithPattern3(result[1].trim().split(" "));
            } else if ((result = facePattern2.exec(line)) !== null) {
                setDataForCurrentFaceWithPattern2(result[1].trim().split(" "));
            } else if (usemtlPattern.test(line)) {
                const mtlName = line.substring(7).trim();
                if (!target.indices[mtlName]) {
                    target.indices[mtlName] = [];
                }
                curMtl = mtlName;
            } else if (mtllibPattern.test(line)) {
                const mtlName = line.substring(7).trim();
            } else if (groupPattern.test(line)) {
                const groupName = line.substring(2).trim();

            } else {
                console.log("Unhandled expression at line : " + line);
            }
        });

        return target;

        function setDataForCurrentFaceWithPattern3(face) {
            // face is like ["1/1/1", "2/2/1", "3/3/1", "4/4/1"]
            const triangles = getTriangles(face);
            // triangles is like ["5/5/2", "6/6/2", "1/7/2", "5/5/2", "1/7/2", "4/8/2", "5/5/2", "4/8/2", "7/9/2"]

            triangles.forEach(vertex => {
                const [iPos, iUV, iNorm] = vertex.split('/').map(k => Number(k) - 1);
                setTarget(iPos, iUV, iNorm);
            })
        }

        function setDataForCurrentFaceWithPattern2(face) {

            // face is like ["1/1", "2/2", "3/3"]
            const triangles = getTriangles(face);

            let currentiNorm = 0;

            triangles.forEach((vertex, i, list) => {
                const [iPos, iUV] = vertex.split('/').map(k => Number(k) - 1);

                if (i % 3 === 0) {

                    const vc = Vec3.fromValues(...positions[iPos]);
                    const [iPos1] = list[i + 1].split('/').map(k => Number(k) - 1);
                    const v1 = Vec3.fromValues(...positions[iPos1]);
                    const [iPos2] = list[i + 2].split('/').map(k => Number(k) - 1);
                    const v2 = Vec3.fromValues(...positions[iPos2]);

                    const arrow1 = Vec3.sub(Vec3.create(), v1, vc);
                    const arrow2 = Vec3.sub(Vec3.create(), v2, vc);
                    const norm = Vec3.cross(Vec3.create(), arrow1, arrow2);

                    normals.push([...norm]);
                    currentiNorm = normals.length - 1;
                }

                const iNorm = currentiNorm;
                setTarget(iPos, iUV, iNorm);
            });
        }

        function setTarget(iPos, iUV, iNorm) {
            if (!tuple[iPos]) {
                tuple[iPos] = {
                    uvs: [iUV],
                    normals: [iNorm],
                    pos: [curPos]
                }
                target.positions.push(positions[iPos]);
                target.uvs.push(uvs[iUV]);
                target.normals.push(normals[iNorm]);
                target.indices[curMtl].push(curPos++);
            } else {
                const idx = findMatchedIndex(tuple[iPos].uvs, iUV, tuple[iPos].normals, iNorm);
                if (idx !== -1 /* && false*/) {  // uncomment if you want to expand all vertices
                    target.indices[curMtl].push(tuple[iPos].pos[idx]);
                } else {
                    tuple[iPos].uvs.push(iUV);
                    tuple[iPos].normals.push(iNorm);
                    tuple[iPos].pos.push(curPos);
                    target.positions.push(positions[iPos]);
                    target.uvs.push(uvs[iUV]);
                    target.normals.push(normals[iNorm]);
                    target.indices[curMtl].push(curPos++);
                }
            }
        }

        function getTriangles(face, triangles = []) {
            let v = 1;
            while (v + 1 < face.length) {
                triangles.push(face[0], face[v], face[v + 1]);
                v++;
            }
            return triangles;
        }

        function findMatchedIndex(arr1, value1, arr2, value2) {
            const idx1 = arr1.map((value, i) => {
                return { value, i }
            }).filter(item => item.value === value1)
                .map(item => item.i);
            for (let i = 0; i < idx1.length; i++) {
                if (arr2[idx1[i]] === value2) {
                    return idx1[i];
                }
            }
            return -1;
        }
    },

    parseMtl: function (mtl) {

        const lines = mtl.split('\n');
        const target = {};
        let curMtl = null;

        lines.forEach(line => {

            line = line.trim();

            if (line.length === 0 || line.charAt(0) === '#') {
                return;
            }

            const pos = line.indexOf(' ');
            const key = ((pos >= 0) ? line.substring(0, pos) : line).toLowerCase();
            const value = (pos >= 0) ? line.substring(pos + 1).trim() : '';

            if (key === "newmtl") {
                target[value] = {};
                curMtl = value;
            } else if (key === 'kd') {
                target[curMtl].diffuseColor = value.split(' ').map(Number);
            } else if (key === 'ka') {
                target[curMtl].ambientColor = value.split(' ').map(Number);
            } else if (key === 'ks') {
                target[curMtl].specularColor = value.split(' ').map(Number);
            } else if (key === 'map_kd') {
                target[curMtl].diffuseTexture = value;
            } else if (key === 'map_ka') {
                target[curMtl].ambientTexture = value;
            } else if (key === 'map_ks') {
                target[curMtl].specularTexture = value;
            } else if (key === 'ns') {
                target[curMtl].glossiness = Number(value);
            } else {
                console.log("Unhandled expression at line : " + line);
            }
        });

        return target;
    }
}


export default ObjParser;