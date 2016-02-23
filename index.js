var buttons = require('sdk/ui/button/action');
var dpPref = require("sdk/preferences/service");
var simple_prefs = require("sdk/simple-prefs");
var prefs = simple_prefs.prefs;

function set() {
  if (prefs.enabled) {
    dpPref.set("layout.css.devPixelsPerPx", prefs.value);
  } else {
    dpPref.reset("layout.css.devPixelsPerPx");
  }
}
set();

exports.set = () => set();

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
  prefs.enabled = !prefs.enabled;
  set();
}

exports.onUnload = function(reason) {
  // Reset when disabled
  dpPref.reset("layout.css.devPixelsPerPx");
  simple_prefs.removeListener("value");
};
