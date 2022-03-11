/*
 * When Steps
 */

const devPage = require('../pages/dev.page');

module.exports = function(){
  this.When(/^the page loads$/, () => {
    browser.waitForVisible(devPage.containerSelector);
  });
};
