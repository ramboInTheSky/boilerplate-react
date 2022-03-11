boilerplate-react
=======================
## Introduction

A React / Redux boilerplate with Jest and Enzyme for testing, AirB&B linting and EsDocs.

## Install & run

Use `yarn` to install dependencies and run scripts. For more information about `yarn` usage, see the [yarn docs](https://yarnpkg.com/docs).

* `yarn`
* `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you have Redux Devtools for [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)/[Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/) installed, it will be enabled when running in development mode.


## Run unit tests

* `yarn test`
* `yarn run coverage` will run your tests and generate a coverage report

## Run e2e tests

**Prerequisites**
* [docker & docker-compose](https://www.docker.com/products/overview#/install_the_platform)

The end to end test runner will run your tests found in `./e2e`. It will run these in both Chrome and Firefox. 

The end-to-end tests will automatically re-run whenever it detects a change in the `./e2e` directory.

**NB**: the default `e2e` test runs against your dev environment, so you will need to have run `yarn start` before running the `e2e` command.

If the `e2e` tests require other libraries, then you will need to install them first. If you're unsure then it's worth running the install command first just in case:

* `yarn run e2e:install`
* `yarn run e2e`

The first time you run this it will download the required browsers and container.

You can then either `ctrl+C` to kill the tests, or in another terminal window run:

* `yarn run e2e:stop`

**NB**: if for some reason the process doesn't properly kill the test processes, run the `yarn e2e:stop` command to ensure the containers are stopped. 

### Adding new e2e tests

The test suite is written with [WebdriverIO](http://webdriver.io/api.html). You should create tests based on the project's Acceptance Criteria. For example, the criteria:

* As a developer of the react boilerplate
* I want the e2e test runner to test my development site
* So that I can ensure my e2e tests work before commiting them

You might consider there could be 2 scenarios to this:

1. There should be a welcome message
2. I shold be able to see my ip address

Taking the first scenario you could create a Gherkin script that's like:

```gherkin
    Given I am on the local dev site
    When the page loads
    Then I should see the welcome message
```

From this you would create a `.feature` file that looks like this:

`testDevSite.feature`
```gherkin
Feature: Testing the boilerplate dev site

  As a developer of the react boilerplate
  I want the e2e test runner to test my development site
  So that I can ensure my e2e tests work before commiting them

  Scenario: There should be a welcome message
  
    Given I am on the local dev site
    When the page loads
    Then I should see the welcome message
```

This should be placed in the `/e2e/features` directory.

Next you'll need step definitions for your gherkin script. In the `/e2e/support/stepDefinitions` directory you'll find 3 files:

* `given.js`
* `then.js`
* `when.js`

In these files you should place your definition for each step. The definitions are a lot like Jasmine's `describe()` / `it()` statements, but are defined with `this.Given()`, `this.Then()` or `this.When()`. The first argument is a matching method; it's generally best to use a regular expression for this. The second is the function to run when it finds a match. For example:

```javascript
  this.Given(/^I am on the local dev site$/, () => {
    browser.url('http://someurl/');
    browser.getTitle().should.equal('Page Title');
  });
```

Using a regular expression allows you to make generic statements and pass data through. For example:

```gherkin
Scenario 1:
  ...
  When I click on the "test" button
  ...

Scenario 2:
  ...
  When I click on the "submit" button
  ...
```

```javascript
  this.When(/^I click on the "(.+)" button$/, (buttonName) => {
    switch(buttonName){
      case 'test':
        return browser.click('button.testButton');
      break;
      case 'submit':
        return browser.click('button.submitButton');
      break;
    }
  });
```

### Testing local dev site
In order to test your local dev site, the docker container needs to know your IP address, so part of the run script is dedicated to discovering it. Using this, you can reference your local machine with the hostname `dev`. For example, if your dev website is running on [//localhost:3000](http://localhost:3000) then you would reference `http://dev:3000` in your tests:

```javascript
  browser.getUrl('http://dev:3000');
```

### Adding libraries from npm to use in the e2e tests
You can add packages to the e2e tests in a similar way to standard `yarn` applications, however you need to use the `run e2e:install` subcommand instead of `add`:

* `yarn run e2e:install [package names]`

For example, you could install `moment`:

* `yarn run e2e:install moment`

Removing the libraries works in a similar manner: 

* `yarn run e2e:uninstall [package names]`

For example: 

* `yarn run e2e:uninstall moment`

### Updating e2e docker container
The e2e system relies on a docker container stored on the Docker Hub called [amidodevelopment/amido-docker-e2e](https://hub.docker.com/r/amidodevelopment/amido-docker-e2e). From time to time this image may be updated (you can see the history at [/tags](https://hub.docker.com/r/amidodevelopment/amido-docker-e2e/tags/) or the [git repository](https://bitbucket.org/amidoltd/amido-docker-e2e)).

To update the docker container images, simply run the following command:

* `yarn run e2e:update`

## Run build

* `yarn run build`

## Create documentation

* `yarn run docs`

## Release process

* Push to master branch
* Tag with latest version number: `git tag -a <version number> -m <annotation>`
* Push tag: `git push origin <version number>`

## Release History

* 0.1.0 Create repo, add contributors
* 0.1.1 AirB&B linting
* 0.1.2 Added Enzyme for testing React components
* 0.1.3 Added EsDocs
* 0.1.4 Added Redux
* 0.1.5 Added [Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) support
* 0.1.6 Added routing with `react-router` and `react-router-redux`
* 0.1.7 Added yarn.lock
* 0.1.8 Fix `scss` in production & tweak in dev

## Roadmap

* Run tests at build
* Git hook for linting / tests
* Test of App for applying store
* Test of action for returning promise
* Jest config out of package.json
* Webpack 2
