import { GET_PRODUCT } from './actionTypes'

const defaultValue = {
    productsList:[]
}
export default function aaa(state = defaultValue, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case GET_PRODUCT:
            newState.productsList = action.product
            return newState
        default: return state
    }
}