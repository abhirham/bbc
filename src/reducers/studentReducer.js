import _ from 'lodash';

export default (state={},action) => {
    switch(action.type){
        case 'ADD_STUDENT':
            return {...state,[action.payload._id]:action.payload};
        case 'FETCH_STUDENTS':
            return _.mapKeys(action.payload,'_id');
        case 'FETCH_STUDENT':
            return {[action.payload._id]:action.payload};
        case 'EDIT_STUDENT':
            return {...state,[action.payload._id]:action.payload};
        default: 
            return state;
    }
}