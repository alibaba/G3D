export function rad2deg(v: number): number {
    return v * 180 / Math.PI;
}

export function deg2rad(v: number): number {
    return v * Math.PI / 180;
}

export function isPowerOf2(v: number): boolean {
    return (v >= 1) && (Math.log2(v) % 1 === 0);
}
