import React from "react";
import {connect} from 'react-redux';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import * as requests from '../../ApiRequests/requests'
import {store} from "../../reduxStore/store";
import SelectHours from "./js/selectHours";

const ReactSwal = withReactContent(Swal)

class RestaurantInfo extends React.Component{
    componentDidMount() {
        if(store.getState().reducerRestaurantUser.token.length < 20){
            this.props.history.push("/")
        }else{
            requests.getRestaurantInfo();
        }
    }

    state={
        selectedHours:this.props.resInfo.open_time ? this.props.resInfo.open_time : [],
    }

    swalSureToChange = (funcOnSubmit = ()=>{}, funcOnCancel = ()=>{}) => {
        ReactSwal.fire({
            titleText: "؟آیا از ایجاد تغیرات اطمینان دارید",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "!آره تغییرش بده",
            showCancelButton: true,
            cancelButtonText: "نه دستم خورد",
        }).then((result) => {
            if (result.isConfirmed) {
                funcOnSubmit()
            } else {
                ReactSwal.fire({
                    title: <h2>تغییرات ثبت نشد!</h2>,
                    icon: "warning",
                    timer: 2000,
                    timerProgressBar: true
                })
                funcOnCancel()
            }
        })
    }


    checkInfoChanged = (res) =>{
        console.log(res)
        if(res.statusCode === 200){
            ReactSwal.fire({
                title: <h2>!با موفقیت انجام شد</h2>,
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            }).then(()=>{
                requests.getRestaurantInfo();
                //this.props.history.go(0);
            })
        }else {
            ReactSwal.fire({
                title: <h2>تغییرات ثبت نشد!</h2>,
                icon: "warning",
                timer: 2000,
                timerProgressBar: true
            })
        }
    }

    handleChangeName = (elem) =>{
        let value = elem.target.value
        this.swalSureToChange(() =>{requests.changeRestaurantName(value, this.checkInfoChanged);})
    }

    handleChangePhone = (elem) =>{
        let value = elem.target.value
        let phoneArr = value.split(/[\s\n\rA-Za-z+.]+/).filter(eachInp=> eachInp.length === 11 && parseInt(eachInp[0]) === 0);
        if(phoneArr.length <4 && phoneArr.length > 0 ){
            console.log("number are correct")
            this.swalSureToChange(() =>{requests.changeRestaurantPhone(phoneArr, this.checkInfoChanged);})
        }else {
            ReactSwal.fire({
                title: <h2>تغییرات ثبت نشد!</h2>,
                text:"ورودی نامعتبر لطفا مجددا اطلاعات را برسی کنید",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            })
        }
        console.log(phoneArr);
    }

    handleChangeAddress = (elem) =>{
        let value = elem.target.value
        this.swalSureToChange(() =>{requests.changeRestaurantAddress(value, this.checkInfoChanged);})
    }

    setSelectedHours = (shList) =>{
        let shListNew = [...shList];
        this.setState({
            selectedHours: shListNew,
        })
    }

    onCloseSelectHours = () =>{
        this.swalSureToChange(() =>{requests.changeRestaurantOpenHours(this.state.selectedHours, this.checkInfoChanged);})
    }

    handelChangeType = (event) =>{
        let typeNew = event.target.value
        this.swalSureToChange(() =>{requests.changeRestaurantType(typeNew, this.checkInfoChanged);})
    }

    render() {

        return (
            <React.Fragment>
                <div className='justForGap'></div>
                <div className='smallBox d-flex flex-column justify-content-center align-items-md-center'>
                    <textField  defaultValue={ this.props.resInfo ? this.props.resInfo.persian_name : ""} style={{width:"150px"}} label="اسم" onBlur={this.handleChangeName} className='mt-2'/>
                    <TextField style={{marginTop:'100px'}} helperText="با + از هم جدا کنید" defaultValue={ this.props.resInfo.phone ? JSON.parse(this.props.resInfo.phone).join(" + ") : ""} style={{width:"150px"}} label="شماره تماس ها" onBlur={this.handleChangePhone}  className='mt-2' />
                    <TextField defaultValue={ this.props.resInfo ? this.props.resInfo.address : ""} style={{width:"150px"}} label="آدرس" onBlur={this.handleChangeAddress}  className='mt-2' />
                    <SelectHours style={{backgroundColor:'red'}} defaultSh={this.state.selectedHours} onClose={this.onCloseSelectHours} setSh={this.setSelectedHours} />
                    <FormControl style={{minWidth: "120px"}}>
                        <InputLabel id="demo-simple-select-helper-label">نوع</InputLabel>
                        <Select labelId="demo-simple-select-helper-label"  defaultValue={this.props.resInfo.type? JSON.parse(this.props.resInfo.type) : ""} onChange={this.handelChangeType}>
                            <MenuItem value="">
                                <em>انتخاب نشده</em>
                            </MenuItem>
                            <MenuItem value={['coffeeshop']}>کافه</MenuItem>
                            <MenuItem value={['restaurant']}>رستوران</MenuItem>
                            <MenuItem value={['coffeeshop','restaurant']}>کافه رستوران</MenuItem>
                        </Select>
                    </FormControl>
                </div>



            </React.Fragment>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        resInfo : store.reducerRestaurantInfo.info,
    }
}

const mapDispatchToProps = () => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantInfo);
