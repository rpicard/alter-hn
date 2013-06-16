/*
 * Alter HN
 *
 * (c) 2013 Robert Picard
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 */

// -- Define functions --------------------------------------------------------

// Make story links open in a new tab.
function makeStoryLinkNewTab() {
    $("td .title a[href^='http']").attr("target", "_blank");
}

// Make comment links open in new tabs
function makeCommentLinkNewTab() {
    $("td .subtext a[href^='item?id=']").attr("target", "_blank");
}

// -- Make alterations --------------------------------------------------------

self.port.on("gotPrefs", function(prefs) {

    if (prefs.makeStoryLinkNewTab) {
        makeStoryLinkNewTab();
    }

    if (prefs.makeCommentLinkNewTab) {
        makeCommentLinkNewTab();
    }
});

