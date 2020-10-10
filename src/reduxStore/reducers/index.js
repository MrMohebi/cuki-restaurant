import {combineReducers} from "redux";
import reducerRestaurantInfo from "./reducerRestaurantInfo";
import reducerRestaurantUser from "./reducerRestaurantUser";
import reducerTempStates from "./reducerTempStates";

export const rootReducer = combineReducers({
    reducerRestaurantUser,
    reducerRestaurantInfo,
    reducerTempStates
})