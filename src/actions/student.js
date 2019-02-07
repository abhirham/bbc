import api from '../api';
import history from '../history';

export const addStudent = (formValues,id) => async dispatch => {
    const response = await api.post('/students',{...formValues,id});
    dispatch({type: 'ADD_STUDENT',payload: response.data});
    history.push('/');
}

export const fetchStudents = () => async dispatch => {
    const response = await api.get('/students');
    dispatch({type:'FETCH_STUDENTS', payload:response.data});
}

export const editStudent = (formValues,id) => async dispatch => {
    const response = await api.put(`/students/${id}`,formValues);
    dispatch({type:'EDIT_STUDENT',payload: response.data});
    history.push(`/students/${id}`);
}

export const fetchStudent = id => async dispatch => {
    const response = await api.get(`/students/${id}`);
    dispatch({type:'FETCH_STUDENT',payload:response.data});
}