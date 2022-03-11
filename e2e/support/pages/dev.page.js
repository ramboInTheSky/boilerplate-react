/** Example PageObject **/

const Page = require('./page');

const devPage = Object.create(Page, {

    /*
     * Template
     */

    //$name:  { get: function () { return browser.element('$selector'); } },
    //$name:  { value: '$value' },

    pageTitle:          { value: 'React boilerplate app' },
    url:                { value: 'http://dev:3000' },
    containerSelector:  { value: '.amido-boilerplate' },
    
});

module.exports = devPage;
