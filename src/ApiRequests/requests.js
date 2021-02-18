import $ from 'jquery';
import React from "react";
import * as actions from '../reduxStore/actions'
import {store} from '../reduxStore/store'
import * as cache from "../reduxStore/cachedData/cachedData";

export const BASE_URL = "https://api.cuki.ir/";
export const BASE_URL_upload = "https://dl.cuki.ir/";

export const signin = (username, password, callbackFunction)=>{
    $.post(BASE_URL+'signinRestaurant.fetch.php',{username, password}).then(res =>{
        if(res.statusCode === 200){
            cache.setCacheUserPass([username,password])
            actions.setUserInfo(res.data.token, res.data.position, res.data.username, res.data.englishName, res.data.persianName)
        }else{
            cache.removeCacheUserPass()
        }
        callbackFunction(res)
    })
}


export const getOrders = (startDate, endDate, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token
    let englishName = store.getState().reducerRestaurantUser.englishName
    $.post(BASE_URL+'getOrdersList.fetch.php',{token, startDate, endDate, englishName}).then(res =>{
        if(res.statusCode === 200){
            actions.setOrdersList(res.data)
        }
        callbackFunction(res)
    })
}


export const getFoods = (callbackFunction)=>{
    let englishName = store.getState().reducerRestaurantUser.englishName
    $.post(BASE_URL+'getAllRestaurantData.fetch.php',{english_name: englishName}).then(res =>{
        if(res.statusCode === 200){
            actions.setFoodsList(res.data.foods)
        }
        callbackFunction(res)
    })
}


export const getRestaurantInfo = (callbackFunction)=>{
    let englishName = store.getState().reducerRestaurantUser.englishName
    $.post(BASE_URL+'getAllRestaurantData.fetch.php',{english_name: englishName}).then(res =>{
        if(res.statusCode === 200){
            actions.setRestaurantInfo(res.data.restaurantInfo)
        }
        callbackFunction(res)
    })
}


export const getTables = (callbackFunction)=>{
    let englishName = store.getState().reducerRestaurantUser.englishName
    $.post(BASE_URL+'getAllRestaurantData.fetch.php',{english_name: englishName}).then(res =>{
        if(res.statusCode === 200){
            actions.setTables(res.data.allTableList)
        }
        callbackFunction(res)
    })
}


export const changeFoodStatus = (foodId, foodStatus, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeFoodInfo.modify.php',{token: token, englishName, foodId, statusChange:'true',status:foodStatus}).then(res =>{
        callbackFunction(res)
    })
}



export const changeFoodPrice = (foodId, foodPrice, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeFoodInfo.modify.php',{token: token, englishName, foodId, priceChange:'true',price:foodPrice}).then(res =>{
        callbackFunction(res)
    })
}


export const changeFoodName = (foodId, foodName, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeFoodInfo.modify.php',{token: token, englishName, foodId, persianNameChange:'true',persianName:foodName}).then(res =>{
        callbackFunction(res)
    })
}



export const changeFoodDetails = (foodId, foodDetails, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeFoodInfo.modify.php',{token: token, englishName, foodId, detailsChange:'true',details:foodDetails}).then(res =>{
        callbackFunction(res)
    })
}


export const changeFoodDeliveryTime = (foodId, foodDeliveryTime, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeFoodInfo.modify.php',{token: token, englishName, foodId, deliveryTimeChange:'true',deliveryTime:foodDeliveryTime}).then(res =>{
        callbackFunction(res)
    })
}


export const changeFoodGroup = (foodId, newGroup, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeFoodInfo.modify.php',{token: token, englishName, foodId, groupChange:'true',group:newGroup}).then(res =>{
        callbackFunction(res)
    })
}


export const changeOrderStatus = (trackingId, orderStatus, deleteReason, callbackFunction)=>{
    console.log('request created')
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeOrderStatus.modify.php',{token,trackingId, orderStatus, deleteReason: deleteReason}).then(res =>{
        console.log('sent')
        callbackFunction(res)
    }, (e)=>{
        console.log(e)
    })
}



export const changeRestaurantName = (persianName, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeRestaurantInfo.modify.php',{token, englishName, persianNameChange:'true',persianName}).then(res =>{
        callbackFunction(res)
    })
}


export const changeRestaurantPhone = (phones, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeRestaurantInfo.modify.php',{token, englishName, phoneChange:'true',phone:JSON.stringify(phones)}).then(res =>{
        callbackFunction(res)
    })
}


export const changeRestaurantAddress = (address, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeRestaurantInfo.modify.php',{token, englishName, addressChange:'true',address}).then(res =>{
        callbackFunction(res)
    })
}


export const changeRestaurantOpenHours = (openHours, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    let openTimeBaseWeekDay = {0:openHours, 1:openHours, 2:openHours, 3:openHours, 4:openHours, 5:openHours, 6:openHours}
    $.post(BASE_URL+'changeRestaurantInfo.modify.php',{token, englishName, openTimeChange:'true',openTime:JSON.stringify(openTimeBaseWeekDay)}).then(res =>{
        callbackFunction(res)
    })
}


export const changeRestaurantType = (type, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeRestaurantInfo.modify.php',{token, englishName, typeChange:'true',type:JSON.stringify(type)}).then(res =>{
        callbackFunction(res)
    })
}




export const createTable = (tableName, tableCapacity, tableStatus, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'createTable.add.php',{token, englishName, tableName, tableCapacity, tableStatus}).then(res =>{
        callbackFunction(res)
    })
}


export const editTable = (tableId, tableName = null, tableCapacity=null, tableStatus=null, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;
    $.post(BASE_URL+'changeTable.modify.php',{token, tableId, englishName, tableName, tableCapacity, tableStatus}).then(res =>{
        callbackFunction(res)
    })
}


export const uploadFoodThumbnail = (formData, foodId, callbackFunction)=>{
    let token = store.getState().reducerRestaurantUser.token;
    let englishName = store.getState().reducerRestaurantUser.englishName;

    formData.append("token", token);
    formData.append("englishName", englishName);
    formData.append("foodId", foodId);
    $.ajax({
        url: BASE_URL_upload+'api/uploadfoodthumbnail.modify.php',
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            if(Number.isInteger(res.statusCode))
                callbackFunction(res)
            else
                callbackFunction(JSON.parse(res))

        }
    });
}





