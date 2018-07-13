"use strict";

function TilemapLayer(gl,map){
    this.arrays = {
        position: { numComponents: 3, data: [] },
        indices: { numComponents: 3, data: [] },
        vcoord: { numComponents: 2, data: [] }
    };

    var initialX = -(map.size * map.width) / 2;
    var initialY = -.3 - (map.size * map.height) / 2;

    var totalTiles = map.width * map.height;

    var sizeTile = 1 / map.tilesPerRow;

    var offset = sizeTile*0.016;

    for (var x = 0, realIndex = 0, y = 0, currentTile = 0; currentTile < totalTiles; currentTile++) {
        
        if (map.data[currentTile] > 0) {
            x = currentTile % map.width;
            y = map.height - Math.floor(currentTile / map.width);

            this.arrays.position.data.push(
                initialX + x * map.size, initialY + map.size * (y + 1), 0.0,
                initialX + x * map.size, initialY + map.size * y, 0.0,
                initialX + (x + 1) * map.size, initialY + map.size * y, 0.0,
                initialX + (x + 1) * map.size, initialY + map.size * (y + 1), 0.0);

            this.arrays.indices.data.push(realIndex + 3, realIndex + 2, realIndex + 1, realIndex + 3, realIndex + 1, realIndex);

            x = (map.data[currentTile] - 1) % map.tilesPerRow;
            y = Math.floor(map.data[currentTile] / map.tilesPerRow);

            this.arrays.vcoord.data.push(
                (x * sizeTile) + offset, (y * sizeTile) + offset,
                (x * sizeTile) + offset, ((y + 1) * sizeTile) - offset,
                ((x + 1) * sizeTile) - offset, ((y + 1) * sizeTile) - offset,
                ((x + 1) * sizeTile) - offset, (y * sizeTile) + offset);
            realIndex += 4;
        }
    }

    this.bufferInfo = twgl.createBufferInfoFromArrays(gl, this.arrays);
}

TilemapLayer.prototype.draw= function(gl,shader){
    twgl.setBuffersAndAttributes(gl, shader, this.bufferInfo);
    twgl.drawBufferInfo(gl, this.bufferInfo);
}