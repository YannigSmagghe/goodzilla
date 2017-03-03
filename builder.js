var completPath = document.location.href;
var repositoryPath  = completPath.substring( 0 ,completPath.lastIndexOf( "/" ) );
var fileName = completPath.substring(completPath.lastIndexOf( "/" )+1 );

if (fileName == 'game.html') {
	console.log('xxxxxxxx - Load game - xxxxxxxx');
	var timeline = require("./app/js/main/timeline.js");
	timeline.initGame();
	timeline.render();
}else if (fileName == '') {
	console.log('xxxxxxxx - Load menu - xxxxxxxx');
	var menu = require("./app/js/main/menu.js");
	menu.initGame();
	menu.render();
}
var surface = require("./app/js/main/movement.js");
surface.demo();

