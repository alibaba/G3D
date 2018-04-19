uniform bool uMorphTargetFlag;
uniform float uMorphPhase;
attribute vec3 aPosition2;

void morphTargetPosition(inout vec3 aPosition){

    if(uMorphTargetFlag){
        aPosition = mix(aPosition, aPosition2, uMorphPhase);
    }

}