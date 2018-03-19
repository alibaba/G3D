var stream = weex.requireModule('stream');

const loader = {

    loadText: function (url, callback) {

        stream.fetch({
            method: 'GET',
            url,
            type: 'text'
        }, function (res) {
            if (res.ok) {
                callback(res.data);
            } else {
                throw new Error(`Fetch ${url} failed.`);
            }
        })
    }
}





export default loader;