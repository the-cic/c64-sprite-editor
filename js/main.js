

function setupEditor(){
	setupSprites();
	
	sprites.sprites[0].visible = true;
	//sprites.sprites[1].visible = true;
	//sprites.sprites[2].visible = true;
	
	//sprites.sprites[1].mc = true;
	//sprites.sprites[2].mc = true;
	//sprites.sprites[2].dy = true;
	
	//sprites.sprites[1].color = 4;
	//sprites.sprites[2].color = 5;

	recreateSprite(0);
	recreateSprite(1);
	recreateSprite(2);
	recreateSprite(3);
	recreateSprite(4);
	recreateSprite(5);
	recreateSprite(6);
	recreateSprite(7);
	
	setupMultiColorControl(1);
	setupMultiColorControl(2);
	
	setupSpritePropertiesControl(0);
	setupSpritePropertiesControl(1);
	setupSpritePropertiesControl(2);
	setupSpritePropertiesControl(3);
	setupSpritePropertiesControl(4);
	setupSpritePropertiesControl(5);
	setupSpritePropertiesControl(6);
	setupSpritePropertiesControl(7);
	
	clickSelectDrawingColor(3);
}

function clickSelectDrawingColor(color){
	drawingPixelBits = color;
	for (var i=0; i < 4; i++) {
		var div = $('select-drawing-color-'+i);
		if (i == color) {
			div.addClassName('selected');
		} else {
			div.removeClassName('selected');
		}
	}
}

function clickTogglePixelLines(){
	var editor = $('editor');
	if (editor.hasClassName('no-border')) {
		editor.removeClassName('no-border');
	} else {
		editor.addClassName('no-border');
	}
}

function clickExport() {
	$('output').show();
	$('output-content').update(Object.toJSON(sprites));
}

function clickImport() {
	var json = prompt('Paste in exported JSON', '');
	var newSprites;
	try {
		newSprites = json.evalJSON(true);
	} catch (err) {
		$('output').show();
		$('output-content').update(err);
	}
	
	if (newSprites.sprites == undefined) {
		$('output').show();
		$('output-content').update('Error importing JSON<br />'+json);
	}
	
	sprites = newSprites;
	
	setupMultiColorControl(1);
	setupMultiColorControl(2);
	
	for (var i=0; i < 8; i++) {
		recreateSprite(i);
		setupSpritePropertiesControl(i);
		positionSprite(i);
	}
}

function clickOutputHex() {
	$('output').show();
	var s = "";
	for (var i = 0; i < 8; i++) {
		var sprite = sprites.sprites[i];
		if (sprite.visible) {
			s += 'Sprite #' + i;
			s += ', color: #' + sprite.color;
			s += sprite.mc ? ', multicolor (#' + sprites.color1 + ' ,#' + sprites.color2 + ')' : '';
			s += sprite.dx ? ', double width' : '';
			s += sprite.dy ? ', double height' : '';
			s += '\n';
			s += getSpriteBytesHex(i);
			s += '\n\n';
		}
	}
	$('output-content').update('<pre>' + s + '</pre>');
}
