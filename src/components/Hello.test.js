import React from 'react';
import { render } from 'enzyme';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import Hello from './Hello';
import rootReducer from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('Component', () => {
  /** @test {Hello} */
  describe('Hello', () => {
    /** @test {Hello#render()} **/
    describe('#render()', () => {
      it('displays a welcome message', () => {
        const welcome = render(
          <Hello appName="Hell" store={store} />,
        );

        expect(welcome.find('h1').text()).toEqual('Welcome to Hell');
      });
    });
  });
});
