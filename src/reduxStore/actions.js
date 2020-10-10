import * as actionTypes from './actionTypes'
import {store} from './store'

export const setUserInfo = (token, position, username, englishName, persianName) =>{
    store.dispatch({
        type: actionTypes.SET_USER_INFO,
        payload:{
            token,
            position,
            username,
            englishName,
            persianName
        }
    });
}


export const setOrdersList = (orders) =>{
    store.dispatch({
        type: actionTypes.SET_ORDERS_LIST,
        payload:{
            orders
        }
    });
}

export const setFoodsList = (foods) =>{
    store.dispatch({
        type: actionTypes.SET_FOODS_LIST,
        payload:{
            foods
        }
    });
}

export const setRestaurantInfo = (resInfo) =>{
    store.dispatch({
        type: actionTypes.SET_RESTAURANT_INFO,
        payload:{
            resInfo
        }
    });
}


export const setTables = (tables) =>{
    store.dispatch({
        type: actionTypes.SET_TABLES,
        payload:{
            tables
        }
    });
}


export const setShowOrdersDates = (fromToDates) =>{
    store.dispatch({
        type: actionTypes.SET_SHOW_ORDERS_DATES,
        payload:{
            fromToDates
        }
    });
}

