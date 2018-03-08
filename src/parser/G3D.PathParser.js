function Quadratic(x0, y0, x1, y1, x2, y2) {

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

    const divs = 5;

    const vertices = [];

    for (let i = 1; i <= divs; i++) {
        const x = QuadraticBezier(i / divs, x0, x1, x2);
        const y = QuadraticBezier(i / divs, y0, y1, y2);
        vertices.push(x, y);
    }

    return vertices;
}







// #
let data = "m 619 974 l 522 698 l 684 698 l 781 974 l 930 975 l 831 698 l 1019 699 l 970 564 l 783 563 l 725 403 l 920 403 l 873 271 l 678 271 l 579 -5 l 432 -5 l 530 271 l 367 271 l 270 -5 l 121 -5 l 220 270 l 30 271 l 79 403 l 268 403 l 326 563 l 127 564 l 174 699 l 374 698 l 472 975 l 619 974 m 414 402 l 582 402 l 639 563 l 470 563 l 414 402";

// 1

data = "m 276 616 q 273 680 276 637 q 271 747 271 723 q 197 713 223 726 q 112 666 172 700 l 55 754 q 471 940 291 848 l 498 927 l 492 454 l 493 465 l 493 202 l 493 216 q 497 102 493 178 q 502 0 502 26 l 383 6 q 314 3 362 6 q 264 0 266 0 q 270 359 264 127 q 276 616 276 591";

// 2
// data = "m 33 75 q 236 249 152 168 q 379 431 321 330 q 438 652 438 533 q 413 772 438 723 q 325 822 389 822 q 220 767 251 822 q 170 616 189 712 l 155 616 q 44 743 107 691 q 189 867 105 823 q 373 911 273 911 q 586 847 500 911 q 673 658 673 783 q 619 480 673 548 q 304 196 566 411 l 430 195 l 553 195 l 706 201 q 689 94 689 148 q 696 38 689 66 q 706 0 703 11 q 514 3 630 0 q 380 7 399 7 q 181 3 302 7 q 44 0 60 0 l 33 75";

// G
// data = "m 552 -15 q 183 110 324 -15 q 43 461 43 236 q 195 823 43 693 q 583 954 347 954 q 763 932 679 954 q 929 865 848 911 q 879 697 895 784 l 862 697 q 749 816 818 772 q 595 860 680 860 q 390 769 471 860 q 300 608 309 679 q 289 513 291 536 q 287 469 287 490 q 289 404 287 426 q 294 375 292 382 q 389 167 310 250 q 590 84 468 84 q 713 100 651 84 q 699 430 713 272 q 824 423 768 423 q 948 431 886 423 q 942 323 948 395 q 937 214 937 251 q 939 118 937 185 q 942 47 942 51 q 746 1 839 17 q 552 -15 652 -15 ";

// 4
data = "m 706 383 l 701 299 q 704 248 701 271 q 708 211 706 225 q 592 221 650 221 l 592 176 q 594 83 592 127 q 606 0 597 40 q 540 3 579 0 q 497 6 501 6 q 433 3 473 6 q 384 0 393 0 q 393 104 390 44 q 396 219 396 165 l 309 221 q 169 216 262 221 q 43 212 76 212 l 44 296 l 44 379 q 174 568 113 477 q 287 738 235 658 q 396 909 338 818 q 503 902 444 902 q 553 902 527 902 q 606 909 589 907 q 599 720 606 843 q 592 534 592 596 l 592 370 q 650 375 614 370 q 706 383 686 380 m 396 370 l 396 752 l 141 370 l 396 370 ";

// 8
data = "m 511 492 q 654 412 598 471 q 710 266 710 352 q 607 53 710 128 q 360 -21 504 -21 q 131 50 229 -21 q 34 248 34 122 q 88 406 34 341 q 235 492 143 471 l 235 502 q 117 568 164 516 q 71 689 71 620 q 165 855 71 802 q 382 908 259 908 q 584 857 498 908 q 671 696 671 806 q 628 574 671 621 q 511 502 586 526 l 511 492 m 373 528 q 456 573 432 528 q 481 684 481 618 q 458 792 481 748 q 376 836 435 836 q 290 791 316 836 q 264 683 264 747 q 291 575 264 622 q 373 528 318 528 m 369 55 q 464 117 439 55 q 489 259 489 180 q 465 396 489 335 q 379 457 441 457 q 285 393 314 457 q 256 256 256 329 q 278 114 256 174 q 369 55 301 55 ";

// test
// data = "m 0 0 l 0 1000 l 1000 1000 l 1000 0 l 0 0 m 200 200 l 800 200 l 800 800 l 200 200";

// test 
// data = "m 0 0 l 0 1000 l 1000 1000 l 1000 800 l 200 800 l 200 200 l 1000 200 l 1000 0 l 0 0";

const PathParser = {

    parse: function (data) {

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
                        const points = Quadratic(x0, y0, x1, y1, x2, y2);
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

    parseToLine: function () {

        const { vertices, lines } = this.parse(data);

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

    parseToTriangles: function () {

        const { vertices, lines } = this.parse(data);

        const { polygons, holes } = distinguish(lines);

        console.log('vertices');
        console.log(vertices);
        console.log('polygons');
        console.log(JSON.stringify(polygons));

        const indices = earcut(polygons, holes, []);

        const vertices3d = [];
        for (let i = 0; i < vertices.length; i += 2) {
            vertices3d.push(vertices[i], vertices[i + 1], 0);
        }

        return { vertices: vertices3d, indices };


        function earcut(polygons, holes, triangles) {

            if (holes.length > 0) {

                const res = removeHoles(polygons, holes);
                polygons = res.polygons;
                holes = res.holes;

                console.log('ssss');
                console.log(polygons.join(','));
                console.log(holes.join(','));
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

                    console.log('-- 1. target hole vertex', hvx, hvy);

                    for (let pi = 0; pi < polygons.length; pi++) {
                        let polygon = polygons[pi];

                        for (let pvi = 0; pvi < polygon.length; pvi++) {
                            const pv = polygon[pvi];

                            const [pvx, pvy] = pt(pv);

                            console.log('-- 2. target polygon vertex', pvx, pvy);

                            if (visible(hvx, hvy, pvx, pvy)) {
                                console.log('--- visible', hvx, hvy, pvx, pvy);
                                console.log('--- visible', hv, pv, hole, polygon);

                                polygons.splice(pi, 1);
                                holes.splice(hi, 1);

                                hole.pop();
                                hole = hole.splice(hvi).concat(hole);
                                hole.push(hv);
                                // hole.reverse();

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
    }
}








export default PathParser;