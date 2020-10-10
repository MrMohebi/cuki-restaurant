import {__init__RestaurantUser} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer";



export default function reducerRestaurantUser (state=__init__RestaurantUser, action){
    switch (action.type) {
        case actionTypes.SET_USER_INFO :
            return(produce(state, stateDraft=>{
                stateDraft.token = action.payload.token;
                stateDraft.position = action.payload.position;
                stateDraft.username = action.payload.username;
                stateDraft.englishName = action.payload.englishName;
                stateDraft.persianName = action.payload.persianName;
            }))
        default:
            return state;
    }
}