function getSpriteContainer(id){
    return $('sprite-'+id);
}

function clearSpritePixels(id){
    getSpriteContainer(id).update('');
}

function createPixel(u, v, spriteDiv, color, pixelInd, byteInd, sprite){
    var y = v * 10;
    var x = u * 10;
	
    //if (spriteDiv.hasClassName('multicolor')) {
	if (sprite.mc) {
        x = x * 2;
    }
    //if (spriteDiv.hasClassName('double-x')) {
	if (sprite.dx) {
        x = x * 2;
    }
    //if (spriteDiv.hasClassName('double-y')) {
	if (sprite.dy) {
        y = y * 2;
    }

    var colorClass = 'vic-'+color;
    if (color < 0) {
        colorClass = '';
    }

    var div =
    '<div ' +
	'id="' + sprite.index + ':' + byteInd + ':' + pixelInd + '"' + 
    'class="pixel ' + colorClass + '" ' +
    'style="left: ' + x + 'px; top: ' + y + 'px;" ' +
    'onclick="clickPixel(this);" ' +
    'sprite="' + sprite.index + '" ' +
    'pixel="' + pixelInd + '" ' +
    'byte="'+ byteInd + '" ' +
    '></div>';

    spriteDiv.insert(div);
}

function createBytePixels(bits, ind, spriteDiv, sprite){
    var y = (ind % 21);
    var x = Math.floor(ind / 21) * 8;

    if (sprite.mc) {
        x /= 2;
        var maskH = 0x80;
        var maskL = 0x40;
        for (var i = 0; i < 4; i++) {
            var bitH = bits & maskH;
            var bitL = bits & maskL;

            var color = !bitH && !bitL ? -1 : (bitH && bitL ? sprite.color : (bitH ? sprites.color2 : sprites.color1));

            createPixel(x + i, y, spriteDiv, color, 3-i, ind, sprite);

            maskH = maskH >> 2;
            maskL = maskL >> 2;
        }
    } else {
        var mask = 0x80;
        for (var i = 0; i < 8; i++) {
            var bit = bits & mask;
            var color = bit != 0 ? sprite.color : -1;
            createPixel(x + i, y, spriteDiv, color, 7-i, ind, sprite);
            mask = mask >> 1;
        }
    }
}

function createSpritePixels(sprite){
    clearSpritePixels(sprite.index);
	
    var spriteDiv = getSpriteContainer(sprite.index);
	var bytes = sprite.bytes;
	var c = sprite.color;

    for (var i=0; i < bytes.length; i++) {
		createBytePixels(bytes[i], i, spriteDiv, sprite);
    }
}

function recreateSprite(spriteInd){
	var spriteDiv = getSpriteContainer(spriteInd);
	var sprite = sprites.sprites[spriteInd];
	
	if (!sprite.visible) {
		spriteDiv.hide();
		return;
	}
	spriteDiv.show();

	if (sprite.mc) {
		spriteDiv.addClassName('multicolor');
	} else {
		spriteDiv.removeClassName('multicolor');
	}

	if (sprite.dx) {
		spriteDiv.addClassName('double-x');
	} else {
		spriteDiv.removeClassName('double-x');
	}
	
	if (sprite.dy) {
		spriteDiv.addClassName('double-y');
	} else {
		spriteDiv.removeClassName('double-y');
	}

	createSpritePixels(sprite);
}

function positionSprite(spriteInd){
	var spriteDiv = getSpriteContainer(spriteInd);
	var sprite = sprites.sprites[spriteInd];
	spriteDiv.setStyle({left : (sprite.x * 10) + 'px', top : (sprite.y * 10) + 'px'});
}

// click functions

function clickPixel(pixel){
	var id = pixel.readAttribute('id');
    var spriteInd = pixel.readAttribute('sprite');
    var byteIndex = pixel.readAttribute('byte');
    var pixelIndex = pixel.readAttribute('pixel');

    changeSpritePixel(spriteInd, byteIndex, pixelIndex);
	recreateSprite(spriteInd);
}

