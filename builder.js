var string1 = require("./app/js/main/test.js");
var string2 = require("./app/js/main/test2.js");
document.write(string1 + string2);


var timeline = require("./app/js/main/timeline.js");
timeline.initGame();
timeline.render();