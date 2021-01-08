import { GET_PRODUCT } from './actionTypes'


export const getProduct = (product) => ({
    type: GET_PRODUCT,
    product
})