var main = require("../index");

var simple_prefs = require("sdk/simple-prefs");
var prefs = simple_prefs.prefs;
var dpPref = require("sdk/preferences/service");
// exports["test main"] = function(assert) {
//   assert.pass("Unit test running!");
// };
//
// exports["test main async"] = function(assert, done) {
//   assert.pass("async Unit test running!");
//   done();
// };
//
// exports["test dummy"] = function(assert, done) {
//   main.dummy("foo", function(text) {
//     assert.ok((text === "foo"), "Is the text actually 'foo'");
//     done();
//   });
// };
exports["test set"] = function(assert, done) {
  dpPref.set("layout.css.devPixelsPerPx", "1.23");
  prefs.value = "1.43";
  prefs.enabled = true;
  main.set();
  assert.ok(dpPref.get("layout.css.devPixelsPerPx") === "1.43", "Set works correctly when enabled.");
  prefs.enabled = false;
  main.set();
  assert.ok(dpPref.get("layout.css.devPixelsPerPx") === "-1.0", "Set works correctly when disabled.");
  done();
}

require("sdk/test").run(exports);
