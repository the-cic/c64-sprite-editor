
var sprites = {
    color1 : 2,
    color2 : 3,
    sprites : []
};

var drawingPixelBits = 3;

function setupSprites(){
    for (var i=0; i < 8; i++) {
        sprites.sprites[i] = {
			index : i,
			visible : false,
			x : 0,
			y : 0,
            color : 0,
            mc : false,
            dx : false,
            dy : false,
            bytes : [
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
            ]
        }
    }
}

function getSpriteBytesHex(spriteInd){
    var bytes = sprites.sprites[spriteInd].bytes;
    var res = '';
    for (var i=0; i < bytes.length; i++){
		var hex = bytes[i].toString(16);
		if (hex.length < 2) {
			hex = '0' + hex;
		}
        res += hex + ' ';
		if (i % 8 == 7) {
			res += '\n';
		}
    }
    return res;
}

function changeSpritePixel(spriteInd, byteIndex, pixelIndex) {
    var sprite = sprites.sprites[spriteInd];
    var bits = sprite.bytes[byteIndex];

    if (sprite.mc) {
        var shift = pixelIndex * 2;
        var mask = 3 << shift;
        var bitPair = bits & mask;
        bitPair = bitPair >> shift;
		bitPair = (bitPair != drawingPixelBits) ? drawingPixelBits : 0;
        bitPair = bitPair << shift;
        var clearMask = 0xff - mask;
        bits = (bits & clearMask) | bitPair;
    } else {
        var mask = 1 << pixelIndex;
		var clearMask = 0xff - mask;
        var bit = bits & mask;
		bit = bit ? 0 : (drawingPixelBits == 0 ? 0 : 1) ;
		bits = bit ? bits | mask : bits & clearMask;
    }

    sprite.bytes[byteIndex] = bits;
}

function setSpriteColor(spriteInd, color){
	sprites.sprites[spriteInd].color = color;
}

function toggleSpriteMulticolor(spriteInd){
	sprites.sprites[spriteInd].mc = !sprites.sprites[spriteInd].mc;
}

function toggleSpriteDoubleX(spriteInd){
	sprites.sprites[spriteInd].dx = !sprites.sprites[spriteInd].dx;
}

function toggleSpriteDoubleY(spriteInd){
	sprites.sprites[spriteInd].dy = !sprites.sprites[spriteInd].dy;
}

function toggleSpriteVisible(spriteInd){
	sprites.sprites[spriteInd].visible = !sprites.sprites[spriteInd].visible;
	console.log(sprites.sprites[spriteInd].visible);
}

function setMultiColor(colorId, color){
	if (colorId == 1) {
		sprites.color1 = color;
	} else {
		sprites.color2 = color;
	}
}

function rollSpritePixelsUp(spriteInd){
	var sprite = sprites.sprites[spriteInd];
	var bytes = sprite.bytes;
	var rollLine = [bytes[0], bytes[21], bytes[42]];
	for (var i=0; i < 20; i++) {
		for (var j=0; j < 3; j++) {
			bytes[i + j*21] = bytes[i+1 + j*21];
		}
	}
	for (var j=0; j < 3; j++) {
		bytes[20 + j*21] = rollLine[j];
	}
}

function rollSpritePixelsDown(spriteInd){
	var sprite = sprites.sprites[spriteInd];
	var bytes = sprite.bytes;
	var rollLine = [bytes[20], bytes[20 + 21], bytes[20 + 42]];
	for (var i=20; i > 0; i--) {
		for (var j=0; j < 3; j++) {
			bytes[i + j*21] = bytes[i-1 + j*21];
		}
	}
	for (var j=0; j < 3; j++) {
		bytes[j*21] = rollLine[j];
	}
}

function rollSpritePixelsLeft(spriteInd){
	var sprite = sprites.sprites[spriteInd];
	var bytes = sprite.bytes;
	for (var i=0; i < 21; i++) {
		var carry = (bytes[i] & 0x80) != 0;
		for (var j=2; j >= 0; j--) {
			var bits = bytes[i + j*21];
			var ncarry = (bits & 0x80) != 0;
			bits = ((bits << 1) | (carry ? 1 : 0)) & 0xff;
			carry = ncarry;
			bytes[i + j*21] = bits;
		}
	}
}

function rollSpritePixelsRight(spriteInd){
	var sprite = sprites.sprites[spriteInd];
	var bytes = sprite.bytes;
	for (var i=0; i < 21; i++) {
		var carry = (bytes[i + 2*21] & 0x01) != 0;
		for (var j=0; j < 3; j++) {
			var bits = bytes[i + j*21];
			var ncarry = (bits & 0x01) != 0;
			bits = ((bits >> 1) | (carry ? 0x80 : 0)) & 0xff;
			carry = ncarry;
			bytes[i + j*21] = bits;
		}
	}
}

function clearSpriteBytes(spriteInd){
	var sprite = sprites.sprites[spriteInd];
	var bytes = sprite.bytes;
	for (var i=0; i < 63; i++) {
		sprite.bytes[i] = 0;
	}
}

function copySpriteBytes(spriteFromInd, spriteToInd){
	var spriteFrom = sprites.sprites[spriteFromInd];
	var spriteTo = sprites.sprites[spriteToInd];
	var bytesFrom = spriteFrom.bytes;
	var bytesTo = spriteTo.bytes;
	for (var i=0; i < 63; i++) {
		bytesTo[i] = bytesFrom[i];
	}
}

