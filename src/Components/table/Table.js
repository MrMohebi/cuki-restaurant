import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormControl, InputLabel, MenuItem, Select, TextField,IconButton,Button } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import * as requests from '../../ApiRequests/requests'
import {store} from "../../reduxStore/store";
// import {latest} from "immer/dist/utils/common";

const ReactSwal = withReactContent(Swal)

class Table extends Component {
    componentDidMount() {
        if(store.getState().reducerRestaurantUser.token.length < 20){
            this.props.history.push("/")
        }else{
            requests.getTables()
        }
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
                requests.getTables()
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

    handleInputNumberChanged=(element)=>{
        if (isNaN(element.target.value)){
            element.target.value = 1
            alert('لطفا فقظ از عدد استفاده کنید')
        }

    }
    handleFormSubmit = (event) =>{
        console.log(this.props.tables)
        event.preventDefault();
        let tableName = event.target.tableName.value.length > 0? event.target.tableName.value : false;
        let tableCapacity = event.target.tableCapacity.value.length > 0 ? event.target.tableCapacity.value : false;
        let tableStatus = event.target.tableStatus.value;
        if(tableName && tableCapacity && tableStatus){
            this.swalSureToChange(()=>requests.createTable(tableName, tableCapacity ,tableStatus, this.checkInfoChanged));
        }else {
            ReactSwal.fire({
                title: <h2>تغییرات ثبت نشد!</h2>,
                text:"ورودی نامعتبر لطفا تمام فیلد ها ها پر کنید",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            })
        }
    }


    handleEditName = (event) =>{
        event.preventDefault()
        let tableId = event.target.name.split("_")[1];
        let tableName = event.target.value;
        this.swalSureToChange(()=>requests.editTable(tableId, tableName, null, null ,this.checkInfoChanged));
    }
    handleEditCapacity = (event) =>{
        event.preventDefault()
        let tableId = event.target.name.split("_")[1];
        let tableCapacity = event.target.value;
        this.swalSureToChange(()=>requests.editTable(tableId, null, tableCapacity, null ,this.checkInfoChanged));
    }
    handleEditStatus = (event) =>{
        event.preventDefault()
        let tableId = event.target.name.split("_")[1];
        let tableStatus = event.target.value;
        this.swalSureToChange(requests.editTable(tableId, null, null, tableStatus ,this.checkInfoChanged));
    }
    handleDeleteTable = (event, tableId) =>{
        let status = "deleted";
        this.swalSureToChange(requests.editTable(tableId, null, null, status ,this.checkInfoChanged));
    }

    render() {
        return (
            <React.Fragment>
                <div className='justForGap '></div>

                <div className='smallBox  d-flex justify-content-center align-items-center flex-column'>
                    <form onSubmit={this.handleFormSubmit} style={{textAlign:'center',margin:'0 0 20px 0'}}>
                        <TextField style={{marginRight:'50px'}} label='اسم میز' type="text" name="tableName"/>
                        <TextField onChange={this.handleInputNumberChanged} style={{marginLeft:'50px'}} label='ظرفیت میز'  type="text" name="tableCapacity"/>
                        <InputLabel style={{margin:'20px 0 20px 0'}} id="selectorLabel">دسته بندی</InputLabel>
                        <Select style={{margin:'0 0 20px 0'}} labelId="selectorLabel" name="tableStatus" defaultValue='activate'>
                            <MenuItem value='activate'>قابل رزور</MenuItem>
                            <MenuItem value='deactivate'>غیر قابل رزرو</MenuItem>
                        </Select>
                        <button style={{width:'100px',margin:'0 0 0 30px'}} type="submit" className='btn btn-outline-warning'>ثبت</button>
                    </form>


                    <table>
                        <thead>
                        <tr>
                            <th>اسم میز</th>
                            <th>ظرفیت</th>
                            <th>وضعیت</th>
                            <th>حذف</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.tables.map(eachTable=>{
                            let tableId = eachTable.all_tables_id;
                            let tableName = eachTable.table_name;
                            let tableCapacity = eachTable.capacity;
                            return(
                                <tr key={tableId}>
                                    <td>
                                        <TextField onBlur={this.handleEditName} defaultValue={tableName} type='text' name={"inpTableName_"+tableId}/>
                                    </td>
                                    <td>
                                        <TextField onChange={this.handleInputNumberChanged} onBlur={this.handleEditCapacity} defaultValue={tableCapacity} type='text' name={"inpTableCapacity_"+tableId}/>
                                    </td>
                                    <td>
                                        <Select onChange={this.handleEditStatus} labelId="selectorLabel" name={"selectTableStatus_"+tableId} defaultValue={eachTable.status}>
                                            <MenuItem value='activate'>قابل رزور</MenuItem>
                                            <MenuItem value='deactivate'>غیر قابل رزرو</MenuItem>
                                        </Select>
                                    </td>
                                    <td>
                                        <Button onClick={(e)=>{this.handleDeleteTable(e, tableId)}} variant="contained" color="secondary">
                                            حذف
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        tables : state.reducerRestaurantInfo.tables,
    };
}

export default connect(
    mapStateToProps,
)(Table);
