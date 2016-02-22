const {Cc,Ci} = require("chrome");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var dpPref = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
var simple_prefs = require("sdk/simple-prefs");
var prefs = simple_prefs.prefs;
var enabled = prefs.enabled;

function set() {
  if (enabled) {
    dpPref.setCharPref("layout.css.devPixelsPerPx", prefs.value);
  } else {
    dpPref.clearUserPref("layout.css.devPixelsPerPx");
  }
}
set();

simple_prefs.on("value", set);

var button = buttons.ActionButton({
  id: "devPixelsPerPx-toggle",
  label: "Toggle Interface Scaling",
  icon: {
    "16": "./icon-32.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  enabled = !enabled;
  prefs.enabled = enabled;
  set();
}

exports.onUnload = function(reason) {
  // Reset when disabled
  dpPref.clearUserPref("layout.css.devPixelsPerPx");
  simple_prefs.removeListener("value");
};
