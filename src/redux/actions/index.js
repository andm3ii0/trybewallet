export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_MOEDAS = 'ADD_MOEDAS';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCSSES = 'REQUEST_SUCSSES';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_COTACAO = 'REQUEST_COTACAO';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (index) => ({
  type: DELETE_EXPENSE,
  index,
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

const requestAPI = () => ({
  type: REQUEST_API,
});

const requestSuccess = (moedas) => ({
  type: REQUEST_SUCSSES,
  currencies: moedas,
});

const requestCotacao = (data, obj) => ({
  type: REQUEST_COTACAO,
  expense: { ...obj, exchangeRates: data },
});

const requestError = () => ({
  type: REQUEST_SUCSSES,
});

export const addMoedas = (endPoint) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const resolve = await fetch(endPoint);
    const data = await resolve.json();
    dispatch(requestSuccess(data));
  } catch (error) {
    dispatch(requestError());
  }
};

export const addDespesa = (endPoint, obj) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const resolve = await fetch(endPoint);
    const data = await resolve.json();
    dispatch(requestCotacao(data, obj));
  } catch (error) {
    dispatch(requestError());
  }
};
