// Import the page-mod API from the add-on SDK
var pageMod = require("sdk/page-mod");
// Import the self API from the add-on SDK
var self = require("sdk/self");

// Create a page mod that loads the alter.js script on Hacker News
pageMod.PageMod({
    include: "https://news.ycombinator.com*",
    contentScriptFile: [self.data.url("jquery-2.0.2.min.js"),
                        self.data.url("alter.js")]
});
