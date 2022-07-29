export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_MOEDAS = 'ADD_MOEDAS';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCSSES = 'REQUEST_SUCSSES';
export const REQUEST_ERROR = 'REQUEST_ERROR';

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

const requestError = () => ({
  type: REQUEST_SUCSSES,
});

export const addMoedas = (endPoint) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const resolve = await fetch(endPoint);
    const data = await resolve.json();
    console.log(data);
    dispatch(requestSuccess(data));
  } catch (error) {
    dispatch(requestError());
  }
};
