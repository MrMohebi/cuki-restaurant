import Cookies from "js-cookie";

// its completely an UNSAFE WAY !!!!
// fix it later
const cookieNameUserPass = "restaurantCukiToken_00021031"


export const setCacheUserPass = (userPass) =>{
    Cookies.set(cookieNameUserPass, userPass)
}


export const getCacheUserPass = () =>{
    return Cookies.get(cookieNameUserPass)
}


export const removeCacheUserPass = () =>{
    Cookies.remove(cookieNameUserPass)
}