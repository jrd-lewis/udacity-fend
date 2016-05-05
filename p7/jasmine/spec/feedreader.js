/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /*
         * Loops through each feed in allFeeds, checking if its url is defined,
         * is not null, and is a string.
         */
        it('have a valid url', function() {
            allFeeds.forEach(function(feed) {
                var url = feed.url;
                expect(url).toBeDefined();
                expect(url).not.toBe(null);
                expect(url).not.toBe('');
                expect(typeof url).toBe('string');
            });
        });

        /*
         * Loops through each feed in allFeeds, checking if its name is defined,
         * is not null, and is a string.
         */
        it('have a valid name', function() {
            allFeeds.forEach(function(feed) {
                var name = feed.name;
                expect(name).toBeDefined();
                expect(name).not.toBe(null);
                expect(name).not.toBe('');
                expect(typeof name).toBe('string');
            });
        });
    });

    describe('The menu', function() {
        /*
         * Checks to see if the initial class of the body tag is menu-hidden
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /*
         * Triggers the click event of the menu icon twice, and checks the
         * class of the body tag after each click to ensure the menu was toggled
         */
        describe('changes when the icon is clicked', function() {
            it(
                "toggles the menu's visibility when clicked",
                function() {
                    $('.menu-icon-link').trigger('click');
                    expect($('body').hasClass('menu-hidden')).toBeFalsy();
                    $('.menu-icon-link').trigger('click');
                    expect($('body').hasClass('menu-hidden')).toBeTruthy();
                });
        });
    });

    describe('Initial Entries', function() {
        /*
         * Loads the first feed asynchonously before testing it
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /*
         * Looks to see if there's at least one tag with the .entry class
         */
        it('load correctly', function() {
            expect($('.feed .entry').length).toBeGreaterThan(1);
        });
    });

    describe('New Feed Selection', function() {
        /*
         * Sets up the initialText and currentText variables for later use.
         */
        var initialText, currentText;
        /*
         * Loads the second feed asynchonously before testing it.
         * Saves the current text of the first entry for later use.
         */
        beforeEach(function(done) {
          loadFeed(1, function() {
            currentText = $('.entry')[0].innerHTML;
            loadFeed(0, function() {
                initialText = $('.entry')[0].innerHTML;
                done();
            });
          });

        });
        /*
         * Compares initialText to currentText to see if they're the same.
         */
        it('changes the content correctly', function(done) {
            expect(initialText).toBeDefined();
            expect(initialText).not.toBe('');
            expect(currentText).toBeDefined();
            expect(currentText).not.toBe('');
            expect(initialText).not.toEqual(currentText);
            done();
        });
    });
}());
