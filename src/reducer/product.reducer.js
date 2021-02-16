import { userConstants } from '../constant/constant';


const initialState = {
    data: {
      list: [],
      message: '',
      isLoading: true
    }
}
const productDetailState = {
  data: {
    list: [],
    message: '',
    isLoading: true
  }
}

export function getProductList(state = initialState, action) {
  switch (action.type) {
    case userConstants.PRODUCT_SUCCESS:
      return {
        data:action.payload
      };
    case userConstants.PRODUCT_FAILURE:
      return {
        data:action.payload
      };
    default:
      return {data: state.data}
  }
}


export function getProductDetailList(state = productDetailState, action) {
  switch (action.type) {
    case userConstants.PRODUCT_DETAIL_SUCCESS:
      return {
        data:action.payload
      };
    case userConstants.PRODUCT_DETAIL_FAILURE:
      return {
        data:action.payload
      };
    case userConstants.PRODUCT_DETAIL_REQUEST:
      return{
        data:action.payload
      }
    default:
      return {data: state.data}
  }
}