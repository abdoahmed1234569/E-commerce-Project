/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";

let headers = {
    token: localStorage.getItem('userToken')
}

// eslint-disable-next-line react-refresh/only-export-components
export let cartContext = createContext()

export const CartContextProvider = ({children}) => {

    const [cartNumber, setCartNumber] = useState(0)

    const AddToCart = (productId) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            {productId: productId}, {headers: headers}
        ).then((res) => 
            {
                setCartNumber(res.data.numOfCartItems)
                return res
            })
        .catch((err) => err)
    }
    const getProductsFromCart = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
            {headers: headers}
        ).then((res) => {
            setCartNumber(res.data.numOfCartItems)
            return res
        })
        .catch((err) => err)
    }
    const updateProductInCart = (productId, count) => {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
            {count: count}  ,{headers: headers}
        ).then((res) => res)
        .catch((err) => err)
    }
    const removeProductFromCart = (productId) => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
            {headers: headers}
        ).then((res) => {
            setCartNumber(res.data.numOfCartItems)
            return res
        })
        .catch((err) => err);
    };
    const addProductToWishList = (productId) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {productId: productId} , {headers: headers}
        ).then((res) => {
            return res
        }).catch((err) => err)
    }
    const getProductsFromWishList = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {headers: headers}
        ).then((res) => {
            return res
        }).catch((err) => err)
    }
    const removeProductsFromWishList = (productId) => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {headers: headers}
        ).then((res) => {
            return res
        }).catch((err) => err)
    }
    return <cartContext.Provider value={{AddToCart, getProductsFromCart, updateProductInCart, removeProductFromCart, cartNumber, addProductToWishList, getProductsFromWishList, removeProductsFromWishList}}>
        {children}
    </cartContext.Provider>
}