export default (state=[],action) => {
    switch(action.type){
        case 'ADD_PAYMENT': 
            return [action.payload,...state];
        case 'GET_PAYMENTS': 
            return action.payload||[];
        default:
            return state;
    }
}