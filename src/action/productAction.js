import { userConstants } from '../constant/constant';
import { ProductService } from '../services/productService';

export const ProductActions = {
    getProductList,
    getProductDetailList,
};

function getProductList() {
    return dispatch => {
        ProductService.getProductList()
            .then(
                list => {
                    dispatch(success(list));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(list) {
        return {
            type: userConstants.PRODUCT_SUCCESS,
            payload: { list: list, message: "Success", isLoading: false }
        }
    }
    function failure(list) {
        return {
            type: userConstants.PRODUCT_FAILURE,
            payload: { list: [], message: list, isLoading: false }
        }
    }
}

function getProductDetailList(id) {
    return dispatch => {
        dispatch(request());
        ProductService.getProductDetailList(id)
            .then(
                list => {
                    dispatch(success(list));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };
    function request() {
        return {
            type: userConstants.PRODUCT_DETAIL_REQUEST,
            payload: {list: [], message: '', isLoading: true}
        }
    }
    function success(list) {
        return {
            type: userConstants.PRODUCT_DETAIL_SUCCESS,
            payload: { list: list, message: "Success", isLoading: false }
        }
    }
    function failure(list) {
        return {
            type: userConstants.PRODUCT_DETAIL_FAILURE,
            payload: { list: [], message: list, isLoading: false }
        }
    }
}

