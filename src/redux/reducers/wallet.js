import {
  REQUEST_API,
  REQUEST_COTACAO,
  REQUEST_ERROR,
  REQUEST_SUCSSES,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case DELETE_EXPENSE:
    return { ...store,
      expenses: store.expenses.filter((expense, index) => index === action.index) };
  case REQUEST_COTACAO:
    return { ...store, expenses: [...store.expenses, action.expense] };
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
