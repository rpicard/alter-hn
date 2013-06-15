/*
 * Alter HN
 *
 * (c) 2013 Robert Picard
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

// Import the page-mod API from the add-on SDK
var pageMod = require("sdk/page-mod");

// Import the self API from the add-on SDK
var self = require("sdk/self");

// import the simple prefences API from the add-on SDK
var sp = require("sdk/simple-prefs");

// Create a page mod that loads jQuery and the alter.js script on Hacker News
pageMod.PageMod({
    include: "https://news.ycombinator.com*",
    contentScriptFile: [self.data.url("jquery-2.0.2.min.js"),
                        self.data.url("alter.js")],
    onAttach: function(worker) {
        worker.port.emit("gotPrefs", sp.prefs);
    }
});

