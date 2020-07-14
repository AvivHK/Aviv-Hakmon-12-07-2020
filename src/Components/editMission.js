import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';
var validator = require("email-validator");


@inject("storeMission")
@observer
class editMission extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            phone: "",
            email: "",
            detail: "",
            date: "",
            ableToChangeName: false,
            ableToChangePhone: false,
            ableToChangeEmail: false,
            ableToChangeDetail: false,
        }
    }
    componentDidMount = () => {
        this.setState({
            name: this.props.storeMission.currentMission.userName,
            phone: this.props.storeMission.currentMission.phoneNumber,
            email: this.props.storeMission.currentMission.mailAddress,
            detail: this.props.storeMission.currentMission.details,
            date: this.props.storeMission.currentMission.creationDate
        })
    }

    change = e => {
        this.setState({
            [e.target.id === "detail" ? "detail" : e.target.id === "name" ? "name" : e.target.id === "email" ? "email" : e.target.id === "phone" ? "phone" : "date"]: e.target.value
        })
    }

    updateMission = () => {
        if (validator.validate(this.state.email))
            this.props.storeMission.updateMission(this.state.name, this.state.phone, this.state.email, this.state.detail, this.state.date);
    }


    render() {
        return (
            <div className="addMissionContainer">
                <div></div>
                <div>
                    <div className="titleAddMission">עריכת המשימה</div>
                    <div className="tableAddMessage">
                        <div className="rowName">
                            <div>שם:</div>
                            {this.props.storeMission.currentUserLoggedIn.type === "admin" ?
                                <input id="name" value={this.state.name} onChange={this.change}></input> :
                                <input id="name" value={this.state.name} readOnly={true}></input>}
                        </div>
                        <div className="rowPhone">
                            <div>טלפון:</div>
                            {this.props.storeMission.currentUserLoggedIn.type === "admin" ?
                                <input id="phone" value={this.state.phone} onChange={this.change}></input> :
                                <input id="phone" value={this.state.phone} readOnly={true}></input>}
                        </div>
                        <div className="rowEmail">
                            <div>כתובת מייל:</div>
                            {this.props.storeMission.currentUserLoggedIn.type === "admin" ?
                                <input id="email" value={this.state.email} onChange={this.change}></input> :
                                <input id="email" value={this.state.email} readOnly={true}></input>}
                        </div>
                        <div className="rowDate">
                            <div>תאריך:</div>
                            {this.props.storeMission.currentUserLoggedIn.type === "admin" ?
                            <input type="date" id="date" value={this.state.date} onChange={this.change}></input>:
                            <input type="date" id="date" value={this.state.date} readOnly={true}></input>}
                        </div>
                        <div className="rowDetail">
                            <div>מידע נוסף:</div>
                            <textarea id="detail" value={this.state.detail} onChange={this.change}></textarea>
                        </div>
                    </div>
                </div>
                <div></div>
                <div></div>
                <Link to="/list" onClick={this.updateMission} className="link addMissionButton" ><button className="newMissionButton">עדכון משימה</button></Link>
            </div>
        );
    }
}
export default editMission