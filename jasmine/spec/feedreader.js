/* This is the spec file that Jasmine will read and contains all of the tests that will be run against our application.*/


/* Here,all the tests are within the $() function, since some of these tests may require DOM elements.
We want to ensure they don't run until the DOM is ready. */
/*<====  $() function ====>*/
$(function() {
  /* The following is our first test suite-This suite is all about the RSS
    feeds definitions, the allFeeds variable in our application.*/
  describe('RSS Feeds', function() {
    /* The following is our first test - it tests to make sure that the
       allFeeds variable has been defined and that it is not
       empty.*/
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /*The following is our second test that loops through each feed
      in the allFeeds object and ensures it has a URL defined
      and that the URL is not empty.*/
    it('url defined', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });
    /*The following is our third test that loops through each feed
      in the allFeeds object and ensures it has a name defined
      and that the name is not empty.*/
    it('name defined', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });
  /*The following is our second test suite-this test suite consists of related tests of menu*/
  describe('The menu', function() {
    /*The following is the first test of menu that ensures the menu element is
      hidden by default.*/
    it('menu hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
    /*The following is the second test of menu that ensures the menu changes visibility
      when the menu icon is clicked.This test requires two expectations-does the menu display
      when clicked and does it hide when clicked again*/
    it('menu visibility', function() {
      $(".menu-icon-link").trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $(".menu-icon-link").trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });
  /* The following is our third test suite-it consists of tests related to Initial Entries*/
  describe('Initial Entries', function() {
    /* The following is "beforeEach"-it executes before the test is performed */
    beforeEach(function(done) {
      loadFeed(0, done);
    });
    /* The following is a test that ensures when the loadFeed
      function is called and completes its work, there is at least
      a single .entry element within the .feed container.*/
    it('a single .entry element within the .feed container', function() {
      expect($(".feed .entry").length).toBeGreaterThan(0);
    });
  });
  /* The following is our fourth test suite-it consists of tests related to new feeds*/
  describe('New Feed Selection', function() {
    /* The variable required is declared here*/
    var before;
    /* The following is "beforeEach"-it executes before the test is performed */
    beforeEach(function(done) {
      loadFeed(0, function() {
        before = $(".feed").html();
        loadFeed(1, done);
      });
    });
    /* The following is a test that ensures when a new feed is loaded
       by the loadFeed function,the content actually changes*/
    it('when a new feed is loaded by the loadFeed function,the content actually changes', function() {
      expect($(".feed").html()).not.toBe(before);
    });
  });
}());
