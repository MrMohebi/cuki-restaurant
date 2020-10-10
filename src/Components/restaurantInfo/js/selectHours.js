import React, {Component} from "react";
import IconButton from '@material-ui/core/IconButton';
import "./css/selectedHoursStylesheet.css"

// pass to this component a function to get hours list


class SelectHours extends Component{

    state ={
        showHoursBlock: false,
        buttonsColor:[
            "default","default","default","default","default","default",
            "default","default","default","default","default","default",
            "default","default","default","default","default","default",
            "default","default","default","default","default","default",
        ],
    }

    getSelectedHoursList = () =>{
        let stepC = 0;
        let finalList = this.state.buttonsColor.map(color=>{
            stepC +=1;
            if(color === "primary"){
                return  stepC-1
            }else {
                return null
            }
        }).filter(elem=> elem !== null)
        if(this.props.setSh){
            this.props.setSh(finalList);
        }
    }

    handleButtonClicked = (event)=> {
        let number = parseInt(event.target.innerText);
        let stepC = 0;
        let buttonsColorNew = this.state.buttonsColor.map(color=>{
            stepC += 1;
            if(number === (stepC-1)) {
                return (color === "primary")? "default" : "primary";
            }else {
                return color;
            }
        })
        this.setState({
            buttonsColor : buttonsColorNew,
        })
        stepC = 0;
    }

    handleOpenButtonClicked = () =>{
        this.setState({showHoursBlock: !this.state.showHoursBlock});
        this.getSelectedHoursList();
        if(this.state.showHoursBlock){
            this.props.onClose();
        }else {
            let defaultSh = JSON.parse(this.props.defaultSh)
            if(defaultSh.length > 0){
                let cpSh = [...this.state.buttonsColor]
                defaultSh.map(hour=>{
                    cpSh[hour] = 'primary'
                })
                this.setState({
                    buttonsColor:cpSh,
                })
            }
        }
    }

    render() {
        return(
            <div>
                <button style={{margin:'30px 0 30px 0'}} className='btn btn-outline-dark'  onClick={this.handleOpenButtonClicked} >ساعات باز رستوران</button>
                <div style={{display: this.state.showHoursBlock? "inline-block": "none"}} className="shMainContainer shadow">
                    <div className="shRow">
                        <IconButton  color={this.state.buttonsColor[0]} onClick={this.handleButtonClicked}   size="small" className="m-1">00</IconButton>
                        <IconButton  color={this.state.buttonsColor[1]} onClick={this.handleButtonClicked}   size="small" className="m-1">01</IconButton>
                        <IconButton  color={this.state.buttonsColor[2]} onClick={this.handleButtonClicked}   size="small" className="m-1">02</IconButton>
                        <IconButton  color={this.state.buttonsColor[3]} onClick={this.handleButtonClicked}   size="small" className="m-1">03</IconButton>
                        <IconButton  color={this.state.buttonsColor[4]} onClick={this.handleButtonClicked}   size="small" className="m-1">04</IconButton>
                        <IconButton  color={this.state.buttonsColor[5]} onClick={this.handleButtonClicked}   size="small" className="m-1">05</IconButton>
                    </div>
                    <div className="shRow">
                        <IconButton  color={this.state.buttonsColor[6]} onClick={this.handleButtonClicked}   size="small" className="m-1">06</IconButton>
                        <IconButton  color={this.state.buttonsColor[7]} onClick={this.handleButtonClicked}   size="small" className="m-1">07</IconButton>
                        <IconButton  color={this.state.buttonsColor[8]} onClick={this.handleButtonClicked}   size="small" className="m-1">08</IconButton>
                        <IconButton  color={this.state.buttonsColor[9]} onClick={this.handleButtonClicked}   size="small" className="m-1">09</IconButton>
                        <IconButton  color={this.state.buttonsColor[10]} onClick={this.handleButtonClicked}   size="small" className="m-1">10</IconButton>
                        <IconButton  color={this.state.buttonsColor[11]} onClick={this.handleButtonClicked}   size="small" className="m-1">11</IconButton>
                    </div>
                    <div className="shRow">
                        <IconButton  color={this.state.buttonsColor[12]} onClick={this.handleButtonClicked}   size="small" className="m-1">12</IconButton>
                        <IconButton  color={this.state.buttonsColor[13]} onClick={this.handleButtonClicked}   size="small" className="m-1">13</IconButton>
                        <IconButton  color={this.state.buttonsColor[14]} onClick={this.handleButtonClicked}   size="small" className="m-1">14</IconButton>
                        <IconButton  color={this.state.buttonsColor[15]} onClick={this.handleButtonClicked}   size="small" className="m-1">15</IconButton>
                        <IconButton  color={this.state.buttonsColor[16]} onClick={this.handleButtonClicked}   size="small" className="m-1">16</IconButton>
                        <IconButton  color={this.state.buttonsColor[17]} onClick={this.handleButtonClicked}   size="small" className="m-1">17</IconButton>
                    </div>
                    <div className="shRow">
                        <IconButton  color={this.state.buttonsColor[18]} onClick={this.handleButtonClicked}   size="small" className="m-1">18</IconButton>
                        <IconButton  color={this.state.buttonsColor[19]} onClick={this.handleButtonClicked}   size="small" className="m-1">19</IconButton>
                        <IconButton  color={this.state.buttonsColor[20]} onClick={this.handleButtonClicked}   size="small" className="m-1">20</IconButton>
                        <IconButton  color={this.state.buttonsColor[21]} onClick={this.handleButtonClicked}   size="small" className="m-1">21</IconButton>
                        <IconButton  color={this.state.buttonsColor[22]} onClick={this.handleButtonClicked}   size="small" className="m-1">22</IconButton>
                        <IconButton  color={this.state.buttonsColor[23]} onClick={this.handleButtonClicked}   size="small" className="m-1">23</IconButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectHours;