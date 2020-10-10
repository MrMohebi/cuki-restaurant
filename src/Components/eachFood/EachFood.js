import React from "react";
import $ from 'jquery'
import { connect } from 'react-redux';
import * as requests from '../../ApiRequests/requests'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck,faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import produce from "immer";
import './css/style.css'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const ReactSwal = withReactContent(Swal)


class EachFood extends React.Component {
    state = {
        selectedFile: null,
    }

    componentDidMount() {
        let foodNotFix = this.props.foodsList.filter(eachFood=> parseInt(eachFood.foods_id) === parseInt(this.props.match.params.foodId))[0];
        // return to main page if redux id empty(food list is not saved)
        if((foodNotFix === undefined)){
            this.props.history.push("/");
        }
    }

    getFoods = ()=>{
        requests.getFoods(this.checkFoods)
    }

    handelChangeFoodName = (foodId) =>{
        let foodName = $(`#inpName_${foodId}`).val()
        requests.changeFoodName(foodId,foodName,this.checkFoodNameChanged)
    }
    checkFoodNameChanged = (res) =>{
        if(res.statusCode === 200){
            this.getFoods()
        }
    }

    handelChangeFoodDetails = (foodId) =>{
        let foodDetails = $(`#inpDetails_${foodId}`).val()
        requests.changeFoodDetails(foodId,foodDetails,this.checkFoodDetailsChanged)
    }
    checkFoodDetailsChanged = (res) =>{
        if(res.statusCode === 200){
            this.getFoods()
        }
    }

    handelChangeFoodDeliveryTime = (foodId) =>{
        let foodDeliveryTime = $(`#inpDeliveryTime_${foodId}`).val()
        requests.changeFoodDeliveryTime(foodId, foodDeliveryTime, this.checkFoodDeliveryTimeChanged)
    }
    checkFoodDeliveryTimeChanged = (res) =>{
        if(res.statusCode === 200){
            this.getFoods()
        }
    }

    handelChangeGroup = (elem) =>{
        let foodId =  elem.target.name.split("_")[1]
        let newGroup = elem.target.value
        if(newGroup.length > 2){
            requests.changeFoodGroup(foodId, newGroup, this.checkFoodGroupChanged)
        }
    }
    checkFoodGroupChanged = (res) =>{
        if(res.statusCode === 200){
            this.getFoods()
        }
    }

    onFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    onFileUpload = (args, foodId) => {
        const formData = new FormData();
        formData.append(
            "foodThumbnail",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        requests.uploadFoodThumbnail(formData,foodId, this.checkFoodThumbnailChanged)
    };
    checkFoodThumbnailChanged = (res) =>{
        if(res.statusCode === 200){
            ReactSwal.fire({
                title: <h1>!نمایه عوض شد</h1>,
                icon: "success",
            })
        }
        console.log(res);
    }



    render() {
        let foodNotFix = this.props.foodsList.filter(eachFood=> parseInt(eachFood.foods_id) === parseInt(this.props.match.params.foodId))[0];

        // if redux is empty dont create dom
        if (foodNotFix !== undefined && foodNotFix.details){
            let food = produce(foodNotFix, (draftFoodNotFix)=>{
                draftFoodNotFix.details = JSON.parse(draftFoodNotFix.details).join("+")
            })
            return (
                <React.Fragment>
                    <div className="justForGap"/>
                <div className="smallBox pt-3">
                    <FontAwesomeIcon className="backIcon" onClick={()=>{this.props.history.push("/foods")}} icon={faChevronCircleLeft}/>
                    <span className='backText' onClick={()=>{this.props.history.push("/foods")}}>بازگشت</span>
                    <h1 className='text-center'>{food.name}</h1>

                    <span className='foodPlaceHolderLabels'>اسم</span>

                    <div className="input-group input-group-sm inputGroups ">
                        <div className="input-group-prepend">
                            <button value="1"  className="btn btn-outline-success" type="button" onClick={()=>{this.handelChangeFoodName(food.foods_id)}}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </button>
                        </div>
                        <input id={`inpName_${food.foods_id}`} type="text" placeholder={food.name} defaultValue={food.name}  className=" rtl form-control" aria-label="" aria-describedby="basic-addon1"/>
                    </div>
                    <span className='foodPlaceHolderLabels'>جزئیات</span>

                    <div className="input-group input-group-sm inputGroups">

                        <div className="input-group-prepend">
                            <button value="1"  className="btn btn-outline-success" type="button" onClick={()=>{this.handelChangeFoodDetails(food.foods_id)}}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </button>
                        </div>
                        <input id={`inpDetails_${food.foods_id}`} type="text" placeholder={food.details} defaultValue={food.details}  className=" rtl form-control" aria-label="" aria-describedby="basic-addon1"/>
                    </div>
                    <span className='foodPlaceHolderLabels'>زمان تحویل</span>

                    <div className="input-group input-group-sm inputGroups" >

                        <div className="input-group-prepend">
                            <button value="1"  className="btn btn-outline-success" type="button" onClick={()=>{this.handelChangeFoodDeliveryTime(food.foods_id)}}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </button>
                        </div>
                        <input id={`inpDeliveryTime_${food.foods_id}`} type="text" placeholder={food.delivery_time} defaultValue={food.delivery_time}  className="form-control rtl" aria-label="" aria-describedby="basic-addon1"/>
                    </div>
                    <span style={{width:'100%',textAlign:'center',marginTop:'10px'}}>دسته بندی</span>
                    <div className="input-group input-group-sm ">
                        <FormControl style={{direction:'rtl',minWidth: "120px",margin:'auto',textAlign:'center'}}>
                            <Select labelId="demo-simple-select-helper-label" name={'selectorGroup_'+food.foods_id} defaultValue={food.group} onChange={this.handelChangeGroup}>
                                <MenuItem value="">
                                    <em>انتخاب نشده</em>
                                </MenuItem>
                                <MenuItem value='appetizer'>پیش غذا</MenuItem>
                                <MenuItem value='burger'>برگر</MenuItem>
                                <MenuItem value='pizza'>پیتزا</MenuItem>
                                <MenuItem value='panini'>پنینی</MenuItem>
                                <MenuItem value='main'>غذای اصلی</MenuItem>
                                <MenuItem value='irani'>ایرانی</MenuItem>
                                <MenuItem value='dessert'>دسر</MenuItem>
                                <MenuItem value='pasta'>پاستا</MenuItem>
                                <MenuItem value='drink'>نوشیدنی</MenuItem>
                                <MenuItem value='mohito'>موهیتو</MenuItem>
                                <MenuItem value='hotDrink'>نوشیدنی های گرم</MenuItem>
                                <MenuItem value='cake'>کیک</MenuItem>
                                <MenuItem value='brewed'>دم کرده</MenuItem>
                                <MenuItem value='shake'>شیک</MenuItem>
                            </Select>
                        </FormControl>
                    </div>


                    <span className='foodPlaceHolderLabels'>نمایه غذا</span>
                    <div className="input-group input-group-sm inputGroups" >
                        <input type="file" onChange={this.onFileChange} />
                        <button onClick={(args)=>{this.onFileUpload(args, food.foods_id)}}>
                            Upload!
                        </button>
                        {this.state.selectedFile? this.state.selectedFile.name : null}
                    </div>



                </div>
                </React.Fragment>
            );
        }else{
            return (<React.Fragment/>)
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(EachFood);

