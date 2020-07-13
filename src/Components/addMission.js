import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';

@inject("storeMission")
@observer
class navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.storeMission.currentUserLoggedIn.name,
            phone: props.storeMission.currentUserLoggedIn.phone,
            email: props.storeMission.currentUserLoggedIn.email,
            detail: "",
        }
    }

    change = e => {
        this.setState({
            [e.target.id === "detail" ? "detail" : e.target.id === "name" ? "name" : e.target.id === "email" ? "email" : "phone"]: e.target.value
        })
    }

    addMission = () => {
        this.props.storeMission.postMission(this.state.name, this.state.phone, this.state.email, this.state.detail);
    }


    render() {
        return (
            <div className="addMissionContainer">
                <div></div>
                <div>
                    <div className="titleAddMission">הוספת משימה חדשה</div>
                    <div className="tableAddMessage">
                        <div className="rowName">
                            <div>שם:</div>
                            {this.props.storeMission.currentUserLoggedIn.type === "admin" ?
                                <input id="name" value={this.state.name} onChange={this.change}></input> :
                                <input id="name" value={this.state.name} readOnly={true}></input>
                            }
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
                        <div className="rowDetail">
                            <div>מידע נוסף:</div>
                            <textarea id="detail" value={this.state.detail} onChange={this.change}></textarea>
                        </div>
                    </div>
                </div>
                <div></div>
                <div></div>
                <Link to="/list" onClick={this.addMission} className="link addMissionButton" ><button className="newMissionButton">הוספת משימה חדשה</button></Link>
            </div>
        );
    }
}
export default navbar