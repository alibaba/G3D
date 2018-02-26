const stlParser = {

    parse: function (data) {
        let res = null;
        if (data instanceof ArrayBuffer) {
            res = this.parseBinary(data);
        } else {
            res = this.parseASCII(data);
        }
        return res;
    },

    parseBinary: function (data) {

        const reader = new DataView(data);
        const faces = reader.getUint32(80, true);

        const dataOffset = 84;
        const faceLength = 12 * 4 + 2;

        const positions = [];
        const normals = [];
        const uvs = [];
        const indices = [];

        for (let face = 0; face < faces; face++) {

            const start = dataOffset + face * faceLength;
            const normalX = reader.getFloat32(start, true);
            const normalY = reader.getFloat32(start + 4, true);
            const normalZ = reader.getFloat32(start + 8, true);

            for (let i = 1; i <= 3; i++) {
                const vertexstart = start + i * 12;
                positions.push(reader.getFloat32(vertexstart, true));
                positions.push(reader.getFloat32(vertexstart + 4, true));
                positions.push(reader.getFloat32(vertexstart + 8, true));
                normals.push(normalX, normalY, normalZ);
                uvs.push(0, 0);
                indices.push(indices.length);
            }
        }

        return {
            positions,
            normals,
            uvs,
            indices
        }

    },

    parseASCII: function (data) {

        const patternFace = /facet([\s\S]*?)endfacet/g;

        const patternFloat = /[\s]+([+-]?(?:\d+.\d+|\d+.|\d+|.\d+)(?:[eE][+-]?\d+)?)/.source;
        const patternVertex = new RegExp('vertex' + patternFloat + patternFloat + patternFloat, 'g');
        const patternNormal = new RegExp('normal' + patternFloat + patternFloat + patternFloat, 'g');

        let faceCounter = 0;
        const positions = [];
        const normals = [];
        const uvs = [];
        const indices = [];

        const normal = { x: 0, y: 0, z: 0 };
        let result;

        while ((result = patternFace.exec(data)) !== null) {
            var vertexCountPerFace = 0;
            var normalCountPerFace = 0;
            var text = result[0];
            while ((result = patternNormal.exec(text)) !== null) {
                normal.x = parseFloat(result[1]);
                normal.y = parseFloat(result[2]);
                normal.z = parseFloat(result[3]);
                normalCountPerFace++;
            }
            while ((result = patternVertex.exec(text)) !== null) {
                positions.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(0, 0);
                indices.push(indices.length);
                vertexCountPerFace++;
            }
            if (normalCountPerFace !== 1) {
                console.log('normalCountPerFace is not 1');
            }
            if (vertexCountPerFace !== 3) {
                console.log('vertexCountPerFace is not 3');
            }
            faceCounter++;
        }

        return {
            positions,
            normals,
            uvs,
            indices
        }
    }
}

export default stlParser;