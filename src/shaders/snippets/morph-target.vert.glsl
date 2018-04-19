
#include <./morph-target-position.vert.glsl>

attribute vec2 aUV2;
attribute vec3 aNormal2;

void morphTarget(inout vec3 aPosition, inout vec2 aUV, inout vec3 aNormal){
    
    morphTargetPosition(aPosition);

    if(uMorphTargetFlag){
        aUV = mix(aUV, aUV2, uMorphPhase);
        aNormal = mix(aNormal, aNormal2, uMorphPhase);
    }

}