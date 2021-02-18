import React from "react";
import {connect} from 'react-redux';
import {Snackbar, Slide,Button} from '@material-ui/core';
import SkeletonLoader from "tiny-skeleton-loader-react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faCommentAlt,
    faHistory,
    faMapMarkerAlt,
    faPhone,
    faTrash,
    faUser,
    faUtensils
} from "@fortawesome/free-solid-svg-icons";
import './css/stylesheet.css';
import * as actions from "../../reduxStore/actions";
import * as requests from '../../ApiRequests/requests';
import * as func from './js/function';
import {Link} from "react-router-dom";

const ReactSwal = withReactContent(Swal)


class Orders extends React.Component {

    handleClick = (Transition) => () => {
        this.setState({
            snackbarOpen: true,
            snackbarTransiation:this.SlideTransition,
        });
    };


    nowTimestamp = Math.floor(Date.now() / 1000)

    componentDidMount() {
        if(!(this.props.ordersShowDates.from && true)){
            this.props.setShowOrdersDates({
                from: func.todayDateJalali(),
                to: func.todayDateJalali(),
            })
            this.getOrders(this.nowTimestamp - func.todayPassedSeconds(), this.nowTimestamp)
        }else{
            let selectedDate = this.props.ordersShowDates
            let startDate = func.date2timestamp(func.JalaliDate.jalaliToGregorian(selectedDate.from.year, selectedDate.from.month, selectedDate.from.day).join("-")) / 1000;
            let endDate = (func.date2timestamp(func.JalaliDate.jalaliToGregorian(selectedDate.to.year, selectedDate.to.month, selectedDate.to.day).join("-")) / 1000) + 86400;
            this.getOrders(startDate, endDate)
        }

    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    refreshOrderList = () =>{
        console.log("order list updated");
        let selectedDate = this.state.datePikerDate
        if(selectedDate.from && selectedDate.to) {
            let startDate = func.date2timestamp(func.JalaliDate.jalaliToGregorian(selectedDate.from.year, selectedDate.from.month, selectedDate.from.day).join("-")) / 1000;
            let endDate = (func.date2timestamp(func.JalaliDate.jalaliToGregorian(selectedDate.to.year, selectedDate.to.month, selectedDate.to.day).join("-")) / 1000) + 86400;
            this.getOrders(startDate, endDate)
        }
    }
    intervalId = setInterval(this.refreshOrderList, 3000);

    componentWillUpdate(nextProps, nextState, nextContext) {
    }


    checkOrders= (response) =>{
        if(response.statusCode === 200){
            if(this.state.lastNumberOfOrders !== response.data.length)
                this.setState({
                    snackbarOpen:true,
                })

            this.setState({
                uiRender:this.uiComponentBigDevice(),
                lastNumberOfOrders:response.data.length
            });
        }
    }

    getOrders = (startDate, endDate)=>{
        requests.getOrders(startDate, endDate, this.checkOrders)
    }

    onChangeCalender = (selectedDate) =>{
        this.setState({
            datePikerDate : selectedDate
        })
        if(selectedDate.from && selectedDate.to){
            this.props.setShowOrdersDates(selectedDate)
            let startDate = func.date2timestamp(func.JalaliDate.jalaliToGregorian(selectedDate.from.year, selectedDate.from.month, selectedDate.from.day).join("-")) / 1000;
            let endDate = (func.date2timestamp(func.JalaliDate.jalaliToGregorian(selectedDate.to.year, selectedDate.to.month, selectedDate.to.day).join("-")) / 1000) + 86400;
            this.getOrders(startDate, endDate, this.checkOrders)
        }
    }

    callBackChangeOrderStatus = (res) =>{
        console.log(res)
        if((res.statusCode === 200) || (res.statusCode === 400 && res.info !== undefined)){
            this.onChangeCalender(this.state.datePikerDate);
            ReactSwal.fire({
                title: <h2>!با موفقیت انجام شد</h2>,
                icon: "success",
                timer: 2000,
                timerProgressBar: true
            })
        }else {
            console.log("Order status didn't change !!!");
        }
    }

    handelChangeOrderStatus = (trakingId,newStatus,deleteReason) =>{
        console.log(trakingId)
        requests.changeOrderStatus(trakingId,newStatus,deleteReason,this.callBackChangeOrderStatus)
    }

    render() {
        return(
            <React.Fragment>

                {/*new order got*/}
                <Snackbar
                    open={this.state.snackbarOpen}
                    onClose={()=>{this.setState({snackbarOpen:false,})}}
                    autoHideDuration={2000}
                    message="سفارش جدید دریافت شد"
                    TransitionComponent={(props)=>{return <Slide {...props} direction="up"/>}}
                />

                <div className='justForGap'/>
                <div className="smallBox">
                    {this.state.datePikerDate.from && true ? (
                        <DatePicker value={this.state.datePikerDate} onChange={this.onChangeCalender} locale='fa' shouldHighlightWeekends/>
                    ):(
                        <DatePicker value={{
                            from: func.todayDateJalali(),
                            to: func.todayDateJalali()
                        }} onChange={this.onChangeCalender} locale='fa' shouldHighlightWeekends/>
                    )}
                    {this.isThereFood ? null: this.uiComponentNothinFound()}
                    {this.state.uiRender}
                    {(this.isInDash && this.isThereFood) ? <Link style={{ color: 'blue',width:'100%',display:'block',textAlign:'center' }} to={'/orders'} ><span style={{width:'100$',textAlign:'center',marginTop:'20px'}}>
نمایش لیست کامل ...
                    </span></Link>
                        : null}
                </div>
            </React.Fragment>

        )
    }

    isInDash = false
    isThereFood = false

    createRows = () =>{
        if (window.location.pathname.toString() === "/dashboard"){
            this.isInDash = true
            return(
                this.props.ordersList.slice(0,4).map(eachOrder=>{
                    this.isThereFood = true
                    let foodsDetails = JSON.parse(eachOrder.details)
                    let orderList = JSON.parse(eachOrder.order_list)
                    let sum = 0;
                    let payStatus = func.numberWithCommas(eachOrder.paid_amount ? eachOrder.paid_amount : 0);
                    orderList.forEach((item) => {
                        sum += item.number * item.priceAfterDiscount;
                    });
                    sum = func.numberWithCommas(sum);

                    let orderStatusButton = <button>not define</button>
                    // switch (eachOrder.order_status) {
                    //     case "inLine" :
                    //         orderStatusButton =  <button title="تغییر وضعیت به انجام شده" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id, eachOrder.order_status)}} style={{width: "100px"}} className="btn btn-sm btn-outline-success">در صف</button>
                    //         break;
                    //     case "deleted" :
                    //         orderStatusButton =  <button title={eachOrder.delete_reason} onClick={()=>{ReactSwal.fire({title: <h2>{eachOrder.delete_reason}</h2>, icon: "info", timer: 4000, timerProgressBar: true})}} style={{width: "100px"}} className="btn btn-sm btn-outline-danger">حذف شده</button>
                    //         break;
                    //     case "done" :
                    //         orderStatusButton =  <button title="تغییر وضعیت به در صف" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id, eachOrder.order_status)}} style={{width: "100px"}} className="btn btn-sm btn-success">انجام شده</button>
                    //         break;
                    // }
                    let orderStatus = eachOrder.order_status
                    let twoOtherOption = orderStatus === 'inLine' ?[
                        'انجام شده','تحویل شده'
                        ]

                    :orderStatus === 'done'?[
                                'در صف','تحویل شده'
                            ]
                            :[
                            'در صف','انجام شده'
                ]
                    let btnClasses = (eachOrder.order_status === 'done'?'btn-success':(eachOrder.order_status === 'inLine'?'btn-outline-primary':'btn-danger'))
                    return(
                        [
                            <tr className="bg-white" id={"orderRowID_"+eachOrder.orders_id}  key={"orderRowID_" + eachOrder.orders_id}>
                                <td className="in-queue text-primary" href={"#MoreInfoID_"+eachOrder.orders_id} data-toggle="collapse" style={{cursor: "pointer", userSelect: "text "}}><FontAwesomeIcon icon={faChevronDown}/> {eachOrder.tracking_id} </td>
                                <td>
                                    {
                                        orderList.map(eachFood=>{
                                            return(
                                                <div key={Math.floor(Math.random()*10000)}>
                                                    {eachFood.name} => {eachFood.number}
                                                </div>
                                            )
                                        })
                                    }
                                </td>
                                <td className="d-none d-sm-table-cell">{func.days_passed(eachOrder.ordered_date).split("\n").map(eachPart=>{return <p>{eachPart}</p>})}</td>
                                <td className="d-none d-sm-table-cell">{sum} <br/><span style={{color:"#0dec1a"}}>{ payStatus }</span></td>
                                <td className="d-none d-sm-table-cell ltr IranSansMedium">
                                    <div className="btn-group">
                                        <button type="button" className={'btn ' + btnClasses}>{this.state.orderStatusPersian[orderStatus.toString()]}</button>
                                        <button type="button"
                                                className={"btn dropdown-toggle dropdown-toggle-split "+ btnClasses}
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item IranSansMedium" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id,'inLine')}} href="#">{twoOtherOption[0]}</a>
                                            <div className="dropdown-divider"/>
                                            <a className="dropdown-item IranSansMedium" href="#">{twoOtherOption[1]}</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            ,

                            <tr id={"MoreInfoID_"+eachOrder.orders_id}  className="collapse bg-light" style={{lineHeight: "40px"}} key={"MoreInfoID_" + eachOrder.orders_id}>
                                <td className="d-none d-sm-table-cell text-primary"><a title="تماس مستقیم" href={"tel:"+eachOrder.customer_phone}><FontAwesomeIcon icon={faPhone}/> {eachOrder.customer_phone}</a></td>

                                <td className="d-none d-sm-table-cell text-right pr-2 pl-2">
                                    <a className="float-right text-primary"><FontAwesomeIcon icon={faUser}/> {eachOrder.customer_name} </a>
                                    <br/>
                                </td>

                                <td className="d-none d-sm-table-cell text-right pr-2" colSpan="2">
                                    <a  title="میز"><img style={{width: "25px"}} src="https://img.icons8.com/material/50/000000/table.png"/> {eachOrder.order_table?eachOrder.order_table:0} </a>

                                    <FontAwesomeIcon style={{marginRight:'20px'}} icon={faMapMarkerAlt} />  {eachOrder.address?eachOrder.address:'حضوری'}   </td>

                                <td className="d-none d-sm-table-cell">
                                    {/*<button className="btn-sm btn-dark ml-3"><FontAwesomeIcon icon={faHistory}/>درحال اپدیت</button>*/}
                                    {eachOrder.order_status === 'deleted'?
                                        <span className='IranSansMedium orderDeleteReason'>{eachOrder.delete_reason}</span>
                                    :
                                        <button className="IranSansMedium btn-sm btn-danger" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id, 'deleted')}}  title="حذف" style={{cursor: "pointer"}} type="button"><FontAwesomeIcon style={{marginLeft:'10px'}} icon={faTrash} aria-hidden="true"/>{eachOrder.order_status==="deleted"? "لغو حذف" : "حذف"}</button>
                                    }
                                    {/*<button className="btn-sm btn-danger" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id, eachOrder.order_status, (eachOrder.order_status==="deleted")? "inLine" : "deleted")}}  title="حذف" style={{cursor: "pointer"}} type="button"><FontAwesomeIcon icon={faTrash} aria-hidden="true"/>{eachOrder.order_status==="deleted"? "لغو حذف" : "حدف"}</button>*/}
                                </td>
                            </tr>

                            ,

                            <tr id={"MoreInfoID_"+eachOrder.orders_id}  className="collapse bg-light" style={{lineHeight: "40px"}} key={"MoreInfo1ID_" + eachOrder.orders_id}>
                                <td className="d-none d-sm-table-cell text-right pr-2" colSpan="5"><FontAwesomeIcon icon={faCommentAlt}/>{foodsDetails.general}</td>
                            </tr>

                            ,

                            <tr id={"MoreInfoID_"+eachOrder.orders_id} className="collapse bg-light" style={{lineHeight: "40px"}} key={"MoreInfo2ID_" + eachOrder.orders_id}>
                                <td className="d-none d-sm-table-cell text-right pr-2" colSpan="5"><FontAwesomeIcon icon={faUtensils}/>{Object.keys(foodsDetails.eachFood).map(eachFood=>{return eachFood +" ==> " + foodsDetails[eachFood] + "\n"})}</td>
                            </tr>
                        ]

                    )
                })
            )
        }else{
            return(
                this.props.ordersList.map(eachOrder=>{
                    this.isThereFood = true
                    let foodsDetails = JSON.parse(eachOrder.details)
                    let orderList = JSON.parse(eachOrder.order_list)
                    let sum = 0;
                    let payStatus = '';
                    orderList.forEach((item) => {
                        sum += item.number * item.priceAfterDiscount;
                    });
                    sum = func.numberWithCommas(sum);
                    switch (parseInt(eachOrder.payment_status)) {
                        case 85:
                            payStatus = 'نقدی';
                            break;
                        case 8:
                            payStatus = 'در انتظار پرداخت';
                            break;
                        default:
                            payStatus = 'نامشخص';
                            break;
                    }

                    let orderStatusButton = <button>not define</button>
                    // switch (eachOrder.order_status) {
                    //     case "inLine" :
                    //         orderStatusButton =  <button title="تغییر وضعیت به انجام شده" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id, eachOrder.order_status)}} style={{width: "100px"}} className="btn btn-sm btn-outline-success">در صف</button>
                    //         break;
                    //     case "deleted" :
                    //         orderStatusButton =  <button title={eachOrder.delete_reason} onClick={()=>{ReactSwal.fire({title: <h2>{eachOrder.delete_reason}</h2>, icon: "info", timer: 4000, timerProgressBar: true})}} style={{width: "100px"}} className="btn btn-sm btn-outline-danger">حذف شده</button>
                    //         break;
                    //     case "done" :
                    //         orderStatusButton =  <button title="تغییر وضعیت به در صف" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id, eachOrder.order_status)}} style={{width: "100px"}} className="btn btn-sm btn-success">انجام شده</button>
                    //         break;
                    // }

                    return(
                        [
                            <tr className="bg-white" id={"orderRowID_"+eachOrder.orders_id}  key={"orderRowID_" + eachOrder.orders_id}>
                                <td className="in-queue text-primary" href={"#MoreInfoID_"+eachOrder.orders_id} data-toggle="collapse" style={{cursor: "pointer", userSelect: "text "}}><FontAwesomeIcon icon={faChevronDown}/> {eachOrder.tracking_id} </td>
                                <td>
                                    {
                                        orderList.map(eachFood=>{
                                            return(
                                                <div key={Math.floor(Math.random()*10000)}>
                                                    {eachFood.name} => {eachFood.number}
                                                </div>
                                            )
                                        })
                                    }
                                </td>
                                <td className="d-none d-sm-table-cell">{func.days_passed(eachOrder.ordered_date).split("\n").map(eachPart=>{return <p>{eachPart}</p>})}</td>
                                <td className="d-none d-sm-table-cell">{sum} <br/>{ payStatus }</td>
                                <td className="d-none d-sm-table-cell">
                                    {orderStatusButton}
                                </td>
                            </tr>

                            ,

                            <tr id={"MoreInfoID_"+eachOrder.orders_id}  className="collapse bg-light" style={{lineHeight: "40px"}} key={"MoreInfoID_" + eachOrder.orders_id}>
                                <td className="d-none d-sm-table-cell text-primary"><a title="تماس مستقیم" href={"tel:"+eachOrder.customer_phone}><FontAwesomeIcon icon={faPhone}/> {eachOrder.customer_phone}</a></td>

                                <td className="d-none d-sm-table-cell text-right pr-2 pl-2">
                                    <a className="float-right text-primary"><FontAwesomeIcon icon={faUser}/> {eachOrder.customer_name} </a>
                                    <br/>
                                    <a  title="میز"><img style={{width: "25px"}} src="https://img.icons8.com/material/50/000000/table.png"/> {eachOrder.order_table?eachOrder.order_table:0} </a>
                                </td>

                                <td className="d-none d-sm-table-cell text-right pr-2" colSpan="2"><FontAwesomeIcon icon={faMapMarkerAlt} />  {eachOrder.address?eachOrder.address:'حضوری'}   </td>

                                <td className="d-none d-sm-table-cell">
                                    {/*<button className="btn-sm btn-dark ml-3"><FontAwesomeIcon icon={faHistory}/>درحال اپدیت</button>*/}
                                    {/*<button className="btn-sm btn-danger" onClick={()=>{this.handelChangeOrderStatus(eachOrder.tracking_id, eachOrder.order_status, (eachOrder.order_status==="deleted")? "inLine" : "deleted")}}  title="حذف" style={{cursor: "pointer"}} type="button"><FontAwesomeIcon icon={faTrash} aria-hidden="true"/>{eachOrder.order_status==="deleted"? "لغو حذف" : "حدف"}</button>*/}
                                </td>
                            </tr>

                            ,

                            <tr id={"MoreInfoID_"+eachOrder.orders_id}  className="collapse bg-light" style={{lineHeight: "40px"}} key={"MoreInfo1ID_" + eachOrder.orders_id}>
                                <td className="d-none d-sm-table-cell text-right pr-2" colSpan="5"><FontAwesomeIcon icon={faCommentAlt}/>{foodsDetails.general}</td>
                            </tr>

                            ,

                            <tr id={"MoreInfoID_"+eachOrder.orders_id} className="collapse bg-light" style={{lineHeight: "40px"}} key={"MoreInfo2ID_" + eachOrder.orders_id}>
                                <td className="d-none d-sm-table-cell text-right pr-2" colSpan="5"><FontAwesomeIcon icon={faUtensils}/>{Object.keys(foodsDetails.eachFood).map(eachFood=>{return eachFood +" ==> " + foodsDetails[eachFood] + "\n"})}</td>
                            </tr>
                        ]

                    )
                })
            )
        }




    }



    uiComponentBigDevice = () =>{
        return (
            <table dir="rtl" id="searchable_table" className="col-sm-11 col-md-10 col-lg-9 col-xl-8 text-center m-auto" style={{borderCollapse: "collapse"}}>
            <thead className="thead-light">
            <tr className="bg-white">
                <th className="bg-light pt-2 pb-2" style={{borderTopRightRadius: "15px"}}>شماره سفارش</th>
                <th className="bg-light pt-2 pb-2 mobile-radius">سفارش</th>
                <th className="d-none d-sm-table-cell bg-light pt-2 pb-2">تاریخ</th>
                <th className="d-none d-sm-table-cell bg-light pt-2 pb-2">وضعیت پرداخت</th>
                <th className="d-none d-sm-table-cell bg-light pt-2 pb-2" style={{borderTopLeftRadius: "15px"}}>وضعیت</th>
            </tr>
            </thead>
            <tbody>
            {[].concat.apply([], this.createRows())}
            </tbody>
        </table>
        );
    }

    uiComponentSmallDevice = () =>{

    }

    uiComponentNothinFound = () =>{
        return (
            <table dir="rtl" id="searchable_table" className="col-sm-11 col-md-10 col-lg-9 col-xl-8 text-center m-auto" style={{borderCollapse: "collapse"}}>
                <thead className="thead-light">
                <tr className="bg-white">
                    <th className="bg-light pt-2 pb-2" style={{borderTopRightRadius: "15px"}}>شماره سفارش</th>
                    <th className="bg-light pt-2 pb-2 mobile-radius">سفارش</th>
                    <th className="d-none d-sm-table-cell bg-light pt-2 pb-2">تاریخ</th>
                    <th className="d-none d-sm-table-cell bg-light pt-2 pb-2">وضعیت پرداخت</th>
                    <th className="d-none d-sm-table-cell bg-light pt-2 pb-2" style={{borderTopLeftRadius: "15px"}}>وضعیت</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="5" style={{textAlign:"center"}}>چیزا واسه نمایش پیدا نشد!</td>
                    </tr>
                </tbody>
            </table>
        );
    }


    uiWaitToFetch = <div/>;

    state = {
        uiRender : this.uiWaitToFetch,
        datePikerDate: this.props.ordersShowDates,
        lastNumberOfOrders:0,
        useSnackbar: true,
        snackbarOpen:false,
        orderStatusPersian:{
            inLine:'در صف',
            done:'انجام شده',
            delivered:'تحویل شده',
            deleted:'حذف شده'

        }
    }
}

const mapStateToProps = (store) => {
    return {
        ordersList : store.reducerRestaurantInfo.orders,
        ordersShowDates: store.reducerTempStates.ordersShowDates,
    }
}

const mapDispatchToProps = () => {
    return {
        setShowOrdersDates : actions.setShowOrdersDates,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

