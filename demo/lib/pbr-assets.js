import loader from './loader';

var pbrAssets = (function () {
    var assets = {
        'lut': 'http://img.alicdn.com/tfs/TB1yCjuoDtYBeNjy1XdXXXXyVXa-256-256.png',
        'df': {
            'left': 'https://gw.alicdn.com/tfs/TB1W4r0n7voK1RjSZFwXXciCFXa-128-128.jpg',
            'right': 'https://gw.alicdn.com/tfs/TB1Zbb9n4YaK1RjSZFnXXa80pXa-128-128.jpg',
            'top': 'https://gw.alicdn.com/tfs/TB1QV6Sn6TpK1RjSZKPXXa3UpXa-128-128.jpg',
            'bottom': 'https://gw.alicdn.com/tfs/TB16o6YnYrpK1RjSZTEXXcWAVXa-128-128.jpg',
            'front': 'https://gw.alicdn.com/tfs/TB1XUHUn3TqK1RjSZPhXXXfOFXa-128-128.jpg',
            'back': 'https://gw.alicdn.com/tfs/TB1qMzWn9zqK1RjSZFHXXb3CpXa-128-128.jpg',
        },
        'sp': [
            {   // 0
                'left': 'https://gw.alicdn.com/tfs/TB1j1YTn4TpK1RjSZFGXXcHqFXa-512-512.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1e0wjn4jaK1RjSZKzXXXVwXXa-512-512.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB11fzTnY2pK1RjSZFsXXaNlXXa-512-512.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1SdrYn9zqK1RjSZFpXXakSXXa-512-512.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1nfn9n4YaK1RjSZFnXXa80pXa-512-512.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1.F6Yn5rpK1RjSZFhXXXSdXXa-512-512.jpg',
            },
            {   // 1
                'left': 'https://gw.alicdn.com/tfs/TB1KgvQn9zqK1RjSZPxXXc4tVXa-256-256.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1Y.6Yn7voK1RjSZFNXXcxMVXa-256-256.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1BjHUnVzqK1RjSZFoXXbfcXXa-256-256.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB15KTTn4TpK1RjSZFGXXcHqFXa-256-256.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1P_LVnVzqK1RjSZSgXXcpAVXa-256-256.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1YIjUn4TpK1RjSZFKXXa2wXXa-256-256.jpg',
            },
            {   // 2
                'left': 'https://gw.alicdn.com/tfs/TB1x6nWnYvpK1RjSZPiXXbmwXXa-128-128.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1tJv.n4jaK1RjSZFAXXbdLFXa-128-128.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1KjnWnYvpK1RjSZPiXXbmwXXa-128-128.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1NDzWn9zqK1RjSZFHXXb3CpXa-128-128.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1HhHVnYPpK1RjSZFFXXa5PpXa-128-128.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1MAYQn6DpK1RjSZFrXXa78VXa-128-128.jpg',
            },
            {   // 3
                'left': 'https://gw.alicdn.com/tfs/TB1Ev6ZnYrpK1RjSZTEXXcWAVXa-64-64.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB13urZnW6qK1RjSZFmXXX0PFXa-64-64.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1e12Tn8LoK1RjSZFuXXXn0XXa-64-64.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1xxzUnZbpK1RjSZFyXXX_qFXa-64-64.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1D8YZn3HqK1RjSZFkXXX.WFXa-64-64.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1hfj9n4YaK1RjSZFnXXa80pXa-64-64.jpg',
            },
            {   // 4
                'left': 'https://gw.alicdn.com/tfs/TB1zk2Qn6DpK1RjSZFrXXa78VXa-32-32.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1luQjn5LaK1RjSZFxXXamPFXa-32-32.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1.vj9n4YaK1RjSZFnXXa80pXa-32-32.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1rV_Yn5rpK1RjSZFhXXXSdXXa-32-32.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1gf_2n7zoK1RjSZFlXXai4VXa-32-32.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1Q262n7zoK1RjSZFlXXai4VXa-32-32.jpg',
            },
            {   // 5
                'left': 'https://gw.alicdn.com/tfs/TB1RAYZn7voK1RjSZPfXXXPKFXa-16-16.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1sDDWn9zqK1RjSZFHXXb3CpXa-16-16.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1vPf2n3HqK1RjSZFEXXcGMXXa-16-16.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1i.v0n7voK1RjSZFwXXciCFXa-16-16.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1sfrTnY2pK1RjSZFsXXaNlXXa-16-16.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB19Ur0n7voK1RjSZFwXXciCFXa-16-16.jpg',
            },
            {   // 6
                'left': 'https://gw.alicdn.com/tfs/TB1WjfVnVzqK1RjSZFvXXcB7VXa-8-8.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1Zp_Yn5rpK1RjSZFhXXXSdXXa-8-8.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB16O_VnVzqK1RjSZFCXXbbxVXa-8-8.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1_.DWn3HqK1RjSZJnXXbNLpXa-8-8.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1XnLVnVzqK1RjSZSgXXcpAVXa-8-8.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB10U_Tn9zqK1RjSZFLXXcn2XXa-8-8.jpg',
            },
            {   // 7
                'left': 'https://gw.alicdn.com/tfs/TB1rTDWn9zqK1RjSZFHXXb3CpXa-4-4.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1uJwgn4naK1RjSZFBXXcW7VXa-4-4.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1dk2Zn7voK1RjSZPfXXXPKFXa-4-4.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1AqP1n7voK1RjSZFDXXXY3pXa-4-4.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1PjDUnVzqK1RjSZFoXXbfcXXa-4-4.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1W._Tn9zqK1RjSZFLXXcn2XXa-4-4.jpg',
            },
            {   // 8
                'left': 'https://gw.alicdn.com/tfs/TB1SaP1n7voK1RjSZFDXXXY3pXa-2-2.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1EPnWnYvpK1RjSZPiXXbmwXXa-2-2.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1jIfWn9zqK1RjSZFjXXblCFXa-2-2.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1FCPSn3DqK1RjSZSyXXaxEVXa-2-2.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1A2rTnY2pK1RjSZFsXXaNlXXa-2-2.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1utr.n4jaK1RjSZFAXXbdLFXa-2-2.jpg',
            },
            {   // 9
                'left': 'https://gw.alicdn.com/tfs/TB1QF_Yn5rpK1RjSZFhXXXSdXXa-1-1.jpg',
                'right': 'https://gw.alicdn.com/tfs/TB1sF2Wn3HqK1RjSZFPXXcwapXa-1-1.jpg',
                'top': 'https://gw.alicdn.com/tfs/TB1_ZnUn4TpK1RjSZFKXXa2wXXa-1-1.jpg',
                'bottom': 'https://gw.alicdn.com/tfs/TB1_U2Yn7voK1RjSZFNXXcxMVXa-1-1.jpg',
                'front': 'https://gw.alicdn.com/tfs/TB1rk2Qn6DpK1RjSZFrXXa78VXa-1-1.jpg',
                'back': 'https://gw.alicdn.com/tfs/TB1FTzWn9zqK1RjSZFHXXb3CpXa-1-1.jpg',
            },
        ]
    }
    function loadlut(callback) { loader.loadImage(assets.lut, callback) };
    function loadDf(callback) { loader.loadImageQueue(assets.df, callback) };
    function loadSp(callback) {
        var res = null; loadSpMip(0);
        function loadSpMip(i) {
            loader.loadImageQueue(assets.sp[i], function (data) {
                if (i === 0) { res = data; res.mip = []; }
                else { res.mip.push(data); }
                if (i < assets.sp.length - 1) { loadSpMip(i + 1); }
                else { callback(res); }
            });
        }
    }
    return function (callback) {
        loadlut(function (lut) { loadDf(function (df) { loadSp(function (sp) { callback(sp, df, lut); }) }) });
    }
})();

export default pbrAssets;
