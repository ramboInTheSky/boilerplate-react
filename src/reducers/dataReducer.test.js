import { RECEIVED_DATA } from '../actions/actionTypes';
import dataReducer from './dataReducer';

describe('Reducer', () => {
  /** @test {dataReducer} */
  describe('dataReducer', () => {
    /** @test {dataReducer::RECIEVED_DATA} **/
    describe('dataReducer::RECIEVED_DATA', () => {
      it('displays a welcome message', () => {
        const store = dataReducer({}, {
          type: RECEIVED_DATA,
          payload: 'testdata',
        });

        expect(store).toEqual({ data: 'testdata' });
      });
    });
  });
});
