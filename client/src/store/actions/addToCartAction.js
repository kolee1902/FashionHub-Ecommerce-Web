export const addToCartAction = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product,
    }
}
export const clearCartAction = () => {
    return {
        type: "CLEAR_CART"
    }
}
export const removeProductFromCart = (product_id) => {
    return {
        type: "REMOVE_PRODUCT",
        payload: { product_id },
    }
}