var buttons = require('sdk/ui/button/action');
var dpPref = require("sdk/preferences/service");
var simple_prefs = require("sdk/simple-prefs");
var prefs = simple_prefs.prefs;
var values;

function parseValues() {
  // Migrate from 0.0.3
  if (typeof prefs.value !== "undefined" && prefs.value !== "moved to values") {
    prefs.values = prefs.value;
    prefs.value = "moved to values";
  }
  values = ["-1.0"].concat(prefs.values.trim().split(/\s*,\s*/));
}
parseValues();

function set() {
  parseValues();
  if (prefs.state) { // States other than 0
    dpPref.set("layout.css.devPixelsPerPx", values[Math.min(prefs.state, values.length-1)]);
  } else {
    dpPref.reset("layout.css.devPixelsPerPx");
  }
}
set();
exports.set = () => set();
simple_prefs.on("values", set);

var button = buttons.ActionButton({
  id: "devPixelsPerPx-toggle",
  label: "Cycle Interface Scaling",
  icon: {
    "16": "./icon-32.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleBadge() {
  var state = prefs.state;
  if (state) {
    button.badge = state;
    button.badgeColor = "hsl(" + (state*prefs.col_seed%256) + ",80%,40%)";
  } else {
    button.badge = 'D';
    button.badgeColor = "#a6a6a6";
  }
}
handleBadge();
simple_prefs.on("col_seed", handleBadge);

function handleClick(state) {
  prefs.state++;
  prefs.state %= values.length;
  
  handleBadge();
  set();
}

exports.onUnload = function(reason) {
  // Reset when disabled
  dpPref.reset("layout.css.devPixelsPerPx");
  simple_prefs.removeListener("value");
};
