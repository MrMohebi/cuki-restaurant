import React from "react";
import Orders from "../orders/Orders";
import Foods from "../foods/Foods";
import * as actions from '../../reduxStore/actions'
import * as requests from '../../ApiRequests/requests'
import {store} from '../../reduxStore/store'


class Dashboard extends React.Component{
    componentDidMount() {
        if(store.getState().reducerRestaurantUser.token.length < 20){
            this.props.history.push("/")
        }else{
            requests.getRestaurantInfo();
            requests.getTables()
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={{height: "30px", width: "100%"}}/>
                <Orders/>
                <Foods/>
            </React.Fragment>
        )
    }
}

export default Dashboard;