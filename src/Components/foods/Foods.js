import React from "react";
import $ from 'jquery'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import * as requests from '../../ApiRequests/requests'
import {Typography, Switch,Grid, withStyles} from '@material-ui/core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);



class Foods extends React.Component {
    nowTimestamp = Math.floor(Date.now() / 1000)

    componentDidMount() {
        this.getFoods();
    }

    checkFoods= (response) =>{
        if(response.statusCode === 200){
            this.setState({
                uiRender:this.uiComponent()
            });
        }
    }

    getFoods = ()=>{
        requests.getFoods(this.checkFoods)
    }

    handelChangStatus = (foodId, foodStatus) =>{
        requests.changeFoodStatus(foodId,foodStatus,this.checkFoodStatusChanged)
    }
    checkFoodStatusChanged = (res) =>{
        if(res.statusCode === 200){
            this.getFoods();
        }
    }



    handelFoodPrice = (foodId) =>{
        let foodPrice = $(`#itemPrice_${foodId}`).val()
        requests.changeFoodPrice(foodId,foodPrice,this.checkFoodPriceChanged)
    }
    checkFoodPriceChanged = (res) =>{
        if(res.statusCode === 200){
            this.getFoods();
        }
    }
    handleMoreOnClick = ()=>{
        this.props.history.push('/foods')
    }
    render() {
        if (window.location.pathname.toString() === '/dashboard'){
            return(
                <div className="smallBox">
                    {this.state.uiRender}
                    <Link style={{ color: 'blue',width:'100%',display:'block',textAlign:'center' }} to={'/foods'} ><span style={{width:'100$',textAlign:'center',marginTop:'20px'}}>بیشتر...</span></Link>
                </div>
            )
        }else{
            return  <div className="smallBox">
                {this.state.uiRender}
            </div>
        }

    }



    uiComponent = () =>{
        return (
            <div className="container">
                <table className="fixed_header table-hover table-striped table-sm text-center m-auto">
                    <thead>
                        <tr className="bg-light">
                            <th style={{borderTopLeftRadius: "15px"}}>وضعیت</th>
                            <th style={{width: "110px"}}>قیمت</th>
                            <th>نام</th>
                            <th style={{borderTopRightRadius: "15px"}}>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createFoodRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    createFoodRows = () =>{
        let rowCounter = 0;
        let numOfFoodsToShow = 5;
        if (window.location.pathname.toString() === '/dashboard'){
            return this.props.foodsList.slice(0, numOfFoodsToShow + 1).map(eachFood => (
                <tr key={`itemId_${eachFood.foods_id}`} className="bg-white">
                    <td>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>ناموجود</Grid>
                                <Grid item>
                                    <AntSwitch
                                        disabled={!(eachFood.status === "out of stock" || eachFood.status === "in stock")}
                                        checked={((eachFood.status === "out of stock" || eachFood.status === "in stock") && eachFood.status === "in stock")}
                                        onChange={() => {
                                            this.handelChangStatus(eachFood.foods_id, ((eachFood.status === "in stock") ? ("out of stock") : ("in stock")))
                                        }}/>
                                </Grid>
                                <Grid item>موجود</Grid>
                            </Grid>
                        </Typography>
                    </td>
                    <td>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <button value="1" className="btn btn-outline-success" type="button" onClick={() => {
                                    this.handelFoodPrice(eachFood.foods_id)
                                }}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </button>
                            </div>
                            <input id={`itemPrice_${eachFood.foods_id}`} type="text" placeholder={eachFood.price}
                                   defaultValue={eachFood.price} className="form-control" aria-label=""
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </td>
                    <td><Link to={'/foods/' + eachFood.foods_id}>{eachFood.name}</Link></td>
                    <td>{rowCounter++}</td>
                </tr>
            ))
        }else{
            return this.props.foodsList.map(eachFood => (
                <tr key={`itemId_${eachFood.foods_id}`} className="bg-white">
                    <td>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>ناموجود</Grid>
                                <Grid item>
                                    <AntSwitch
                                        disabled={!(eachFood.status === "out of stock" || eachFood.status === "in stock")}
                                        checked={((eachFood.status === "out of stock" || eachFood.status === "in stock") && eachFood.status === "in stock")}
                                        onChange={() => {
                                            this.handelChangStatus(eachFood.foods_id, ((eachFood.status === "in stock") ? ("out of stock") : ("in stock")))
                                        }}/>
                                </Grid>
                                <Grid item>موجود</Grid>
                            </Grid>
                        </Typography>
                    </td>
                    <td>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <button value="1" className="btn btn-outline-success" type="button" onClick={() => {
                                    this.handelFoodPrice(eachFood.foods_id)
                                }}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </button>
                            </div>
                            <input id={`itemPrice_${eachFood.foods_id}`} type="text" placeholder={eachFood.price}
                                   defaultValue={eachFood.price} className="form-control" aria-label=""
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </td>
                    <td><Link to={'/foods/' + eachFood.foods_id}>{eachFood.name}</Link></td>
                    <td>{rowCounter++}</td>
                </tr>
            ))
        }

            }


    uiWaitToFetch = <h3>Loading</h3>;

    state = {
        uiRender : this.uiWaitToFetch,
    }
}







const mapStateToProps = (store) => {
    return {
        foodsList :store.reducerRestaurantInfo.foods
    }
}

const mapDispatchToProps = () => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foods);

