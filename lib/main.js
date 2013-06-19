/*
 * Alter HN
 *
 * (c) 2013 Robert Picard
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

// -- Import APIs -------------------------------------------------------------

// Import the page-mod API from the add-on SDK
var pageMod = require("sdk/page-mod");

// Import the self API from the add-on SDK
var self = require("sdk/self");

// import the simple prefences API from the add-on SDK
var sp = require("sdk/simple-prefs");

// Import the tabs API
var tabs = require("sdk/tabs");

// -- Modify the page ---------------------------------------------------------

// Create a page mod that loads jQuery and the alter.js script on Hacker News
pageMod.PageMod({
    include: "https://news.ycombinator.com*",
    contentScriptFile: [self.data.url("jquery-2.0.2.min.js"),
                        self.data.url("alter.js")],
    onAttach: function(worker) {
        // Send the user preferences to alter.js
        worker.port.emit("gotPrefs", sp.prefs);

        // This lets alter.js open new tabs
        worker.port.on("openTab", function(url) {
            tabs.open(url);
        });
    }
});
