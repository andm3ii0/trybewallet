import { REQUEST_API, REQUEST_ERROR, REQUEST_SUCSSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...store, loading: true };
  case REQUEST_SUCSSES:
    return { ...store,
      currencies: Object.keys(action.currencies).filter((moeda) => moeda !== 'USDT'),
      loading: false };
  case REQUEST_ERROR:
    return { ...store, loading: false };
  default:
    return store;
  }
};

export default wallet;
