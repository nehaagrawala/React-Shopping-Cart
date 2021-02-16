import axios from "axios";

export const ProductService = {
    getProductList,
    getProductDetailList
};

function getProductList() {
        return axios.get(`https://fakestoreapi.com/products`).then(res => {
           res.data.forEach(item => {
                item['rating'] = Math.floor((Math.random() * 5) + 1);
            })
            return res.data;
        }, err=> {
            return err;
        })
}

function getProductDetailList(id) {
    return axios.get(`https://fakestoreapi.com/products/${id}`).then(res => {
        return res.data;
    }, err=> {
        return err;
    })
}