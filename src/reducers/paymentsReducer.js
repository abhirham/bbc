export default (state=[],action) => {
    switch(action.type){
        case 'ADD_PAYMENT': 
            return [...state,action.payload];
        case 'GET_PAYMENTS': 
            return action.payload||[];
        default:
            return state;
    }
}