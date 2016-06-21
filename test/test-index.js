var main = require("../index");

var simple_prefs = require("sdk/simple-prefs");
var prefs = simple_prefs.prefs;
var dpPref = require("sdk/preferences/service");

exports["test set"] = function(assert, done) {
  dpPref.set("layout.css.devPixelsPerPx", "1.23");
  prefs.values = "  1.43  	, 	1.56  ";
  prefs.state = 2;
  main.set();
  assert.ok(dpPref.get("layout.css.devPixelsPerPx") === "1.56", "Set works correctly when enabled.");
  prefs.state = 0;
  main.set();
  assert.ok(dpPref.get("layout.css.devPixelsPerPx") === "-1.0", "Set works correctly when disabled.");
  done();
}

require("sdk/test").run(exports);
