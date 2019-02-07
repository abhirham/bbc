import api from '../api';

export const addPayment = formValues => async dispatch => {
    const response = await api.post('/payments',formValues);
    dispatch({type: 'ADD_PAYMENT', payload: response.data});
}

export const getPayments = id => async dispatch => {
    const response = await api.get(`/payments/${id}`);
    dispatch({type:'GET_PAYMENTS',payload:response.data});
}