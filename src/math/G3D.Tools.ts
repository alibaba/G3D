export default {

    rad2deg: function (v: number): number {
        return v * 180 / Math.PI;
    },

    deg2rad: function (v: number): number {
        return v * Math.PI / 180;
    }
}