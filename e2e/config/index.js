exports.base = {
  reporters: ['spec'],
  capabilities: [
    {
      browserName: 'chrome',
    },
    {
      browserName: 'firefox',
    },
  ],
};

exports.cucumber = {
  tags: [],
  // ['@only', '@isolate'], // <string[]> (expression) only execute the features or scenarios with tags matching the expression
};