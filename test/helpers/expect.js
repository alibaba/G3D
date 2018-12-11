import expect from 'expect';

expect.extend({
    toEqualFloat(received, value, eps) {
        if (typeof eps === 'undefined') {
            eps = 0.000001;
        }

        const pass = received >= value - eps && received <= value + eps;

        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be equal with ${value}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be equal with ${value}`,
                pass: false,
            };
        }
    },
});

export default expect;