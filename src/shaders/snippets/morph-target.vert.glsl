if(uMorphTargetFlag){
    position = mix(aPosition, aPosition2, uMorphPhase);
    uv = mix(aUV, aUV2, uMorphPhase);
    normal = mix(aNormal, aNormal2, uMorphPhase);
}