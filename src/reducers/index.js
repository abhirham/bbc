import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import studentReducer from './studentReducer';
import achievementReducer from './achievementReducer';
import paymentReducer from './paymentsReducer';

export default combineReducers({
    form: formReducer,
    students: studentReducer,
    achievements: achievementReducer,
    payments: paymentReducer
})