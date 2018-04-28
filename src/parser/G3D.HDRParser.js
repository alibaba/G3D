import parseHDR from './parse-hdr';

const parser = {

    parse: function(buffer){

        return parseHDR(buffer);

    }

}

export default parser;