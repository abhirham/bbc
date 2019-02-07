export default (state=[],action) => {
    switch(action.type){
        case 'FETCH_ACHIEVEMENTS':
            return action.payload;
        default: 
            return state;
    }
}