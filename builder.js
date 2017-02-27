var string1 = require("./app/js/main/test.js");
var string2 = require("./app/js/main/test2.js");


document.write(string1 + string2);

var singe = require("./app/js/main/timeline.js");

singe.init();
singe.render();