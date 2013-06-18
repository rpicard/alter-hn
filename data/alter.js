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

// Distinguish submitters in comments
function distinguishSubmitterInComments() {
    // Make sure we're on a comments page
    if (window.location.pathname == "/item") {
        // Find the username of the submitter
        submitter = $("td .subtext a[href^='user?id=']").text();

        // Find all of the submitter's comments
        targetComments = $("span.comhead a[href='user?id="+ submitter +"']");

        // Distinguish them with a marker

        MARKER = " &#134;" // Dagger

        targetComments.append(MARKER);
    }
}

// Add "yours" link to the navigation
function addYoursLinkToNav() {
    // Get the username from the nav
    username = $("span.pagetop a[href^='user?id=']").text();

    username = "rpicard";

    // Only continue if the user is logged in
    if (username) {
        // This is the HTML that will be injected to show the link
        HTML =
            "<span id='alterhn-yours'>" +
            " | <a href='submitted?id=" + username + "'>yours</a>" +
            "</span>";

        // Inject the HTML after the "threads" link
        $("span.pagetop a[href='submit']").after(HTML);
    }

}

// -- Make alterations --------------------------------------------------------

self.port.on("gotPrefs", function(prefs) {

    if (prefs.makeStoryLinkNewTab) {
        makeStoryLinkNewTab();
    }

    if (prefs.makeCommentLinkNewTab) {
        makeCommentLinkNewTab();
    }

    if (prefs.distinguishSubmitterInComments) {
        distinguishSubmitterInComments();
    }

    if (prefs.addYoursLinkToNav) {
        addYoursLinkToNav();
    }
});

