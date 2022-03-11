import axios from 'axios';

import { ENDPOINT } from '../constants';
import { RECEIVED_DATA } from './actionTypes';

export const setData = action => ({ type: RECEIVED_DATA, payload: action.data });

export const getData = () => dispatch => (
  axios.get(ENDPOINT)
    .then(resp => dispatch(setData(resp)))
);
