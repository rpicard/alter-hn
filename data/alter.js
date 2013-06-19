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

// Add [l+c] link to submissions
function showLinkPlusComments() {
    // Grab a list of the comments links to insert our HTML after
    commentsLinks = $("td.subtext a[href^='item?id=']");

    // The markup for the basic link
    HTML = "<a href='#' class='alterhn-lpc'>[l+c]</a>";

    // Add the [l+c] link to each submission
    commentsLinks.each(function(i) {

        // Do some tree traversal to grab the URL of the submitted link.
        //
        // They aren't connected with a span or anything, so it's kind of
        // hackish. There's probably a better way, but this works for now.
        linkURL = $(this) // a
            .parent() // td
            .parent() // tr
            .prev() // tr
            .find("td.title a[href^='http']") // a
            .attr("href"); // link URL

        // We already have the comments anchor element, so we just need to grab
        // the href element and concatenate it with the hostname and a forward
        // slash.
        commentsURL = window.location.host + "/" + $(this).attr("href");

        // Create a jQuery object to make adding the data attributes easier
        tmpLink = $(HTML);

        // Store the links in data attributes for the click function
        tmpLink.attr("data-alterhn-linkurl", linkURL);
        tmpLink.attr("data-alterhn-commentsurl", commentsURL);

        // Insert a space followed by the [l+c] link after the comments link
        $(this).after(" ", tmpLink);
    });

    // This is the function that opens the tabs when the [l+c] link is clicked.
    //
    // We can't just use plain old JS because there's no way to open tabs like
    // that. So, we send an event to the listener in main.js and let that open
    // the tabs for us. Hooray for addons!
    $(".alterhn-lpc").click(function() {
        self.port.emit("openTab", $(this).attr("data-alterhn-commentsurl"));
        self.port.emit("openTab", $(this).attr("data-alterhn-linkurl"));
    });
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

    if (prefs.showLinkPlusComments) {
        showLinkPlusComments();
    }
});

