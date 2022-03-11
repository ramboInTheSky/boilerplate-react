/*
 * Then Steps
 */

module.exports = function(){
  this.Then(/^I should see the welcome message$/, () => {
    const welcomeMessage = 'Welcome to the Amido boilerplate';
    return browser.isVisible(`h1=${welcomeMessage}`).should.be.true;
  });

    this.Then(/^I should see the origin ip address$/, () => {
        const ipAddressRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        return browser.waitUntil(
            () => {
                return browser.getText('p*=origin:').then((text) => {
                    const match = text.match(ipAddressRegex);
                    return !!match && match.length === 1;
                });
            },
            5000, 'expected ip to be displayed'
        );
    });
};
