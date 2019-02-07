import api from '../api';

export const fetchAchievements = studentId => async dispatch => {
    const response = await api.get(`/achievements/${studentId}`);
    dispatch({type:'FETCH_ACHIEVEMENTS',payload:response.data});
}

