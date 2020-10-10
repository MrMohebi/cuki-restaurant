import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import $ from 'jquery';
import '@popperjs/core/dist/cjs/popper'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import Signin from "./Components/signin/Signin";
import Sidebar from "./Components/sidebar/Sidebar";
import Dashboard from "./Components/dashboard/Dashboard";
import Foods from "./Components/foods/Foods";
import EachFood from "./Components/eachFood/EachFood";
import RestaurantInfo from "./Components/restaurantInfo/RestaurantInfo";

import Table from "./Components/table/Table";
import SelectHours from "./Components/restaurantInfo/js/selectHours";
import Orders from "./Components/orders/Orders";

$("body").css({backgroundColor: '#b7b1c2'})

function App() {
  return (
    <div>
      <Router>
          <Route  path='/*' render={ ( props ) => ( props.location.pathname !== "/" && props.location.pathname !== "/signin") && <Sidebar /> }/>
          <Route exact path='/' component={Signin}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/foods' component={Foods}/>
          <Route path='/foods/:foodId' component={EachFood}/>
          <Route path='/resInfo' component={RestaurantInfo}/>
          <Route path='/sh' component={SelectHours}/>
          <Route path='/ct' component={Table}/>
          <Route path='/orders' component={Orders}/>


      </Router>

    </div>
  );
}

export default App;
