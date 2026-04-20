const DEFAULT_STATE = {
    searchData: [],
}

export const searchReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "RECEIVED_SEARCH_DATA": {
            return {
                ...state,
                searchData: action.payload
            }
        }
        default:
            return state;
    }
}