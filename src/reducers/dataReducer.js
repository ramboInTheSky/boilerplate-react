import { RECEIVED_DATA } from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_DATA:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};
