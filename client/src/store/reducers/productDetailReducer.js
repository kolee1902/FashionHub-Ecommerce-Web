import data from "../../data/data.json"

const DEFAULT_STATE = {
    productDetail: data[0],
}

export const productDetailReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_PRODUCT_DETAIL":
            // console.log(action.payload);
            // return state with productDetail updated to be action.payload.
            return {
                ...state,
                productDetail: action.payload
            }
        default:
            break;
    }
    return { ...state };
}