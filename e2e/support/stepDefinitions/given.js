/*
 * Given Steps
 */

module.exports = function(){
  this.Given(/^I am on the local dev site$/, () => {
    browser.url(devPage.url);
    browser.getTitle().should.equal(devPage.pageTitle);
  });
};
