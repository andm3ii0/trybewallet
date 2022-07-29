import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...store, email: action.email };
  default:
    return store;
  }
};

export default user;
