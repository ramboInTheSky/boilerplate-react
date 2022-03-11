import axios from 'axios';
import { ENDPOINT } from '../constants';
import { getData } from './';

jest.mock('axios');
axios.get.mockReturnValue(new Promise(resolve => resolve));

describe('Action', () => {
  /** @test {Action#getData()} **/
  describe('#getData()', () => {
    it('makes a GET request to a defined endpoint', () => {
      // Since this action is a thunk, we need to call twice
      // First to return the inner fn, second to execute it
      // thunk middleware handles this in actual app usage
      getData()();
      expect(axios.get).toHaveBeenCalledWith(ENDPOINT);
    });
  });
});
