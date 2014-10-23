
function setupSpritePropertiesControl(spriteInd){
	var div = $('sprite-properties-'+spriteInd);
	var sprite = sprites.sprites[spriteInd];
	var s = 
		'<div class="item selectable ' + (sprite.visible ? 'selected' : '') + '" onclick="clickSpriteVisible(' + sprite.index + ')" >Sprite ' + sprite.index + '</div>' + 
		'<div class="item selectable ' + (sprite.mc ? 'selected' : '') + '" onclick="clickSpriteMulticolor(' + sprite.index + ')">Multicolor</div>' + 
		'<div class="item selectable ' + (sprite.dx ? 'selected' : '') + '" onclick="clickSpriteDoubleX(' + sprite.index + ')">Double X</div>' + 
		'<div class="item selectable ' + (sprite.dy ? 'selected' : '') + '" onclick="clickSpriteDoubleY(' + sprite.index + ')">Double Y</div>' + 
		'<div class="item">&nbsp';
	for (var i=0; i < 16; i++) {
		s +=
			'<div ' +
			'class="swatch left vic-' + i + ' ' + (sprite.color == i ? 'selected' : '') + '"' +
			'onclick="clickSpriteColor(' + sprite.index + ',' + i + ')"' +
			'></div>';
	}
	s +=
		'</div>' + 
		'<div class="item">' +
			'<span class="left selectable" onclick="toggleSpriteJoystick(' + sprite.index + ')">Position</span>' +
			'<span id="sprite-joystick-' + sprite.index + '" style="display: none;">' +
				'<span class="left">&nbsp;:</span>' +
				'<div class="joystick">' +
					'<div class="direction up"    onclick="clickMoveSprite(' + sprite.index + ',  0, -1)"></div>' +
					'<div class="direction down"  onclick="clickMoveSprite(' + sprite.index + ',  0,  1)"></div>' +
					'<div class="direction left"  onclick="clickMoveSprite(' + sprite.index + ', -1,  0)"></div>' +
					'<div class="direction right" onclick="clickMoveSprite(' + sprite.index + ',  1,  0)"></div>' +
				'</div>' +
				'<span class="left"> &nbsp;x 1 : </span>' +
				'<div class="joystick">' +
					'<div class="direction up"    onclick="clickMoveSprite(' + sprite.index + ',  0, -8)"></div>' +
					'<div class="direction down"  onclick="clickMoveSprite(' + sprite.index + ',  0,  8)"></div>' +
					'<div class="direction left"  onclick="clickMoveSprite(' + sprite.index + ', -8,  0)"></div>' +
					'<div class="direction right" onclick="clickMoveSprite(' + sprite.index + ',  8,  0)"></div>' +
				'</div>' +
				'<span class="left">&nbspx 8</span>' +
			'</span>'+
		'</div>' +
		'<div class="item">' +
			'<span class="left selectable" onclick="togglePixelsJoystick(' + sprite.index + ')">Pixels</span>' +
			'<div class="joystick" id="pixels-joystick-' + sprite.index + '" style="display: none;">' +
				'<div class="direction up"    onclick="clickMoveSpritePixels(' + sprite.index + ',  0, -1)"></div>' +
				'<div class="direction down"  onclick="clickMoveSpritePixels(' + sprite.index + ',  0,  1)"></div>' +
				'<div class="direction left"  onclick="clickMoveSpritePixels(' + sprite.index + ', -1,  0)"></div>' +
				'<div class="direction right" onclick="clickMoveSpritePixels(' + sprite.index + ',  1,  0)"></div>' +
			'</div>' +
		'</div>' +
		'<div class="item">' +
			'<span class="selectable" onclick="clickShowClearSprite(' + sprite.index + ');">Clear</span> ' +
			'<span id="clear-show-' + sprite.index + '" style="display: none;"> : ' +
				'<span class="sub-item selectable" onclick="clickClearSprite(' + sprite.index + ');">Confirm</span>' +
				'<span class="sub-item selectable" onclick="clickHideClearSprite(' + sprite.index + ');">Cancel</span>' +
			'</span>' +
		'</div>' +
		'<div class="item">' +
			'<span class="selectable" onclick="clickShowCopySprite(' + sprite.index + ');">Copy</span> ' +
			'<span id="copy-show-' + sprite.index + '" style="display: none;"> : to';
	for (var i=0; i < 8; i++) {
		s +=
				'<span class="sub-item selectable" onclick="clickCopySprite(' + sprite.index + ',' + i + ')">' + i + '</span>';
	}
	s +=
				'<span class="sub-item selectable" onclick="clickHideCopySprite(' + sprite.index + ');">Cancel</span>' +
			'</span>' +
		'</div>' +
		
		'<div class="clear"></div>';
		
	div.update(s);
}

function setupMultiColorControl(colorId){
	var div = $('multi-color-'+colorId);
	var color = colorId == 1 ? sprites.color1 : sprites.color2;
	var s = 
		//'<div class="item">Multi color #' + colorId + '</div>' + 
		'<div class="item">&nbsp';
	for (var i=0; i < 16; i++) {
		s +=
			'<div ' +
			'class="swatch left vic-' + i + ' ' + (color == i ? 'selected' : '') + '"' +
			'onclick="clickMultiColorSelect(' + colorId + ',' + i + ')"' +
			'></div>';
	}
	s +=
		'</div>' + 
		'<div class="clear"></div>';
		
	div.update(s);
}

// click functions 

function clickSpriteVisible(spriteInd){
	toggleSpriteVisible(spriteInd);
	recreateSprite(spriteInd);
	setupSpritePropertiesControl(spriteInd);
}

function clickSpriteMulticolor(spriteInd){
	toggleSpriteMulticolor(spriteInd);
	recreateSprite(spriteInd);
	setupSpritePropertiesControl(spriteInd);
}

function clickSpriteDoubleX(spriteInd){
	toggleSpriteDoubleX(spriteInd);
	recreateSprite(spriteInd);
	setupSpritePropertiesControl(spriteInd);
}

function clickSpriteDoubleY(spriteInd){
	toggleSpriteDoubleY(spriteInd);
	recreateSprite(spriteInd);
	setupSpritePropertiesControl(spriteInd);
}

function clickSpriteColor(spriteInd, color){
	setSpriteColor(spriteInd, color)
	recreateSprite(spriteInd);
	setupSpritePropertiesControl(spriteInd);
}

function toggleSpriteJoystick(spriteInd){
	var div = $('sprite-joystick-'+spriteInd);
	if (div.visible()) {
		div.hide();
	} else {
		div.show();
	}
}

function clickMoveSprite(spriteInd,  dx,  dy){
	var spriteDiv = getSpriteContainer(spriteInd);
	var sprite = sprites.sprites[spriteInd];
	sprite.x += dx;
	sprite.y += dy;
	positionSprite(spriteInd);
}

function togglePixelsJoystick(spriteInd){
	var div = $('pixels-joystick-'+spriteInd);
	if (div.visible()) {
		div.hide();
	} else {
		div.show();
	}
}

function clickMoveSpritePixels(spriteInd,  dx,  dy){
	var sprite = sprites.sprites[spriteInd];
	if (dy == -1) {
		rollSpritePixelsUp(spriteInd);
	} else if (dy == 1) {
		rollSpritePixelsDown(spriteInd);
	}
	if (dx == -1) {
		rollSpritePixelsLeft(spriteInd);
		if (sprite.mc) {
			rollSpritePixelsLeft(spriteInd);
		}
	} else if (dx == 1) {
		rollSpritePixelsRight(spriteInd);
		if (sprite.mc) {
			rollSpritePixelsRight(spriteInd);
		}
	}
	
	recreateSprite(spriteInd);
}

function clickShowClearSprite(spriteInd){
	$('clear-show-' + spriteInd).show();
}

function clickHideClearSprite(spriteInd){
	$('clear-show-' + spriteInd).hide();
}

function clickClearSprite(spriteInd){
	clearSpriteBytes(spriteInd);
	recreateSprite(spriteInd);
	$('clear-show-' + spriteInd).hide();
}

function clickShowCopySprite(spriteInd){
	$('copy-show-' + spriteInd).show();
}

function clickHideCopySprite(spriteInd){
	$('copy-show-' + spriteInd).hide();
}

function clickCopySprite(spriteFromInd, spriteToInd){
	copySpriteBytes(spriteFromInd, spriteToInd);
	recreateSprite(spriteToInd);
	$('copy-show-' + spriteFromInd).hide();
}

function clickMultiColorSelect(colorId, color){
	setMultiColor(colorId, color);
	for (var i=0; i < 8; i++) {
		recreateSprite(i);
	}
	
	setupMultiColorControl(1);
	setupMultiColorControl(2);
}


