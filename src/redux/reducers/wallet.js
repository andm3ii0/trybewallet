const INITIAL_STATE = {
  despesa: '',
};

const wallet = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_DESPESA':
    return ({ ...store, despesa: action.despesa });
  default:
    return store;
  }
};

export default wallet;
