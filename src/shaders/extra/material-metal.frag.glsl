#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;

uniform mat3 uViewTSR;
uniform sampler2D uEnv;


vec2 re ( vec3 qr ) { 
    return vec2 ( qr . xy * 0.5 + vec2 ( 0.5 , 0.5 ) ) ; 
}

vec3 MAGIC_MAT3_VEC3 ( mat3 m , vec3 v ) {
    vec3 ke = v * m [ 1 ] [ 0 ] ; 

    vec4 q = vec4 ( m [ 1 ] [ 1 ] , m [ 1 ] [ 2 ] , m [ 2 ] [ 0 ] , m [ 2 ] [ 1 ] ) ; 

    return ke + 2.0 * cross ( q . xyz , cross ( q . xyz , ke ) + q . w * ke ) ; 
}

void main() {

    vec3 THE_NORMAL = MAGIC_MAT3_VEC3 ( uViewTSR , vNormal ) ;
    THE_NORMAL = normalize ( THE_NORMAL ) ;

    vec3 color = texture2D(uEnv, re(THE_NORMAL)).xyz;

    gl_FragColor = vec4(color, 1.0);
}
