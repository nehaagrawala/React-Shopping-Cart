
import { userConstants } from '../constant/constant';


export const cartActions = {
    addToCart,
    removeItem,
    subtractQuantity,
    addQuantity,
    emptyCart,
    confirmOrder
};

//add cart action
function addToCart(item) {
    return{
        type: userConstants.ADD_TO_CART,
        payload: item
    }
}

//remove item action
function removeItem(item) {
    return{
        type: userConstants.REMOVE_ITEM,
        payload: item
    }
}

//subtract qt action
function subtractQuantity(item) {
    return{
        type: userConstants.SUB_QUANTITY,
        payload: item
    }
}

//add qt action
function addQuantity(item) {
    return{
        type: userConstants.ADD_QUANTITY,
        payload: item
    }
}

function emptyCart() {
    return{
        type: userConstants.EMPTY_CART,
    }
}

function confirmOrder(orderData, totalPrice, addressInfo) {
    return{
        type: userConstants.ORDER_DATA,
        payload: {
            addedItem: orderData,
            addressInfo: addressInfo,
            total: totalPrice
        }
    }
}

