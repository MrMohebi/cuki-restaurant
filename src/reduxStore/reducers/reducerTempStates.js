import {__init__TempStates} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer";



export default function reducerTempStates (state=__init__TempStates, action){
    switch (action.type) {
        case actionTypes.SET_SHOW_ORDERS_DATES:
            return produce(state, stateDraft=>{
                stateDraft.ordersShowDates = action.payload.fromToDates;
            })
        default:
            return state;
    }
}