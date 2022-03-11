Feature: Testing the boilerplate dev site

  As a developer of the react boilerplate
  I want the e2e test runner to test my development site
  So that I can ensure my e2e tests work before commiting them

  Scenario: There should be a welcome message
  
    Given I am on the local dev site
    When the page loads
    Then I should see the welcome message

  Scenario: I shold be able to see my ip address

    Given I am on the local dev site
    When the page loads
    Then I should see the origin ip address
