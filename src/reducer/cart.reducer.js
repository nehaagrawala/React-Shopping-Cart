import { userConstants } from '../constant/constant';



const initState = {
    addedItems: [],
    total: 0

}

const OrderIntialState = {
    data: {}
}
export function cart(state = initState, action) {
    if (action.type === userConstants.ADD_TO_CART) {

        let addedItem = action.payload;
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.payload.id === item.id)
        if (existed_item) {
            let newTotal = state.total - (existed_item.quantity* existed_item.price);
            state.addedItems.map(item=> {
                if(item.id === addedItem.id) {
                    return item.quantity = addedItem.quantity}
            })
            
            return {
                ...state,
                total: newTotal + (addedItem.quantity* addedItem.price)
            }
        }
        else {
            //calculating the total
            let newTotal = state.total + (addedItem.quantity * addedItem.price);
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }
        }
    }
    if (action.type === userConstants.REMOVE_ITEM) {
        let itemToRemove = action.payload;
        let new_items = state.addedItems.filter(item => action.payload.id !== item.id)
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === userConstants.ADD_QUANTITY) {
        let addedItem = action.payload;
          addedItem.quantity += 1;
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if (action.type === userConstants.SUB_QUANTITY) {
        let addedItem = action.payload;
            if (addedItem.quantity === 1) {
                let new_items = state.addedItems.filter(item => item.id !== action.payload.id)
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
           }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    total: newTotal
                }
            }

    }
    if (action.type === userConstants.EMPTY_CART ) {
        return {
            addedItems: [],
            total: 0
        }
    }
    
    else {
        return state
    }

}
export function order(state = OrderIntialState, action) {
    if(action.type === userConstants.ORDER_DATA) {
        return {
            data : action.payload
        }
    } else {
        return state
    }
}
