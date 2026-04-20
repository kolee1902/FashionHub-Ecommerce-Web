const DEFAULT_STATE = {
    cartList: [],
    size: 0
};

export const addToCartReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let newState = { ...state };
            // clone the current cartList
            const currentCart = JSON.parse(JSON.stringify(state.cartList));
            // check if the product is already in the cart or not ?
            const index = currentCart.findIndex((element) => element.id === action.payload.id);
            if (index !== -1) {
                currentCart[index].quantity++;
            } else {
                const newProduct = { ...action.payload, quantity: 1 };
                currentCart.push(newProduct);
            }
            state.cartList = currentCart;
            state.size = newState.size + 1;
            // console.log(state);
            break;
        case "CLEAR_CART":
            return {
                ...state,
                cartList: [],
                size: 0,
            }
        case "REMOVE_PRODUCT":
            let newState_2 = { ...state };
            const id = action.payload.product_id;
            const currentCart_2 = JSON.parse(JSON.stringify(state.cartList));
            const foundProduct = state.cartList.findIndex(product => product.id === id);
            if (foundProduct !== -1) {
                if (currentCart_2[foundProduct].quantity > 1) {
                    currentCart_2[foundProduct].quantity--;
                } else {
                    currentCart_2.splice(foundProduct, 1);
                }
            }
            state.cartList = currentCart_2;
            state.size = newState_2.size - 1;
            break;
        default:
            break;
    }
    return { ...state };
};  