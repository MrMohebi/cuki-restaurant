import {__init__RestaurantInfo} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer";



export default function reducerRestaurantInfo (state=__init__RestaurantInfo, action){
    switch (action.type) {
        case actionTypes.SET_ORDERS_LIST :
            return produce(state, stateDraft=>{
                stateDraft.orders = action.payload.orders
            })

        case actionTypes.SET_FOODS_LIST:
            return produce(state, stateDraft=> {
                stateDraft.foods = action.payload.foods
            })
        case actionTypes.SET_RESTAURANT_INFO:
            return produce(state, stateDraft=> {
                stateDraft.info = action.payload.resInfo
            })
        case actionTypes.SET_TABLES:
            return produce(state, stateDraft=> {
                stateDraft.tables = action.payload.tables
            })
        default:
            return state;
    }
}