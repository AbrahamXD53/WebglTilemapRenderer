"use strict";

function Tilemap(gl,mapData){
    this.map = mapData;
    this.programInfo = twgl.createProgramInfo(gl, ["vs1", "fs1"]);

    this.layers=[];
    this.layers[0] = new TilemapLayer(gl,this.map);
    this.textures = twgl.createTextures(gl, {
        spriteSheet: { src: map.texture, mag: gl.NEAREST, min: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE }
    });
}

Tilemap.prototype.draw=function(gl)
{
    for(var key in this.layers){
        this.layers[key].draw(gl,this.programInfo);
    }
    
}

Tilemap.prototype.initShader=function(gl,shaderParams){
    gl.useProgram(this.programInfo.program);
    shaderParams.u_diffuse= this.textures.spriteSheet;
    twgl.setUniforms(this.programInfo, shaderParams);

}