export const searchAction = (product) => {
    return {
        type: "RECEIVED_SEARCH_DATA",
        payload: product,
    }
};