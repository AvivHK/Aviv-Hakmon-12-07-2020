import React, { Component } from 'react';
import Logo from "../icon.svg"
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';



@inject("storeMission")
@observer
class navbar extends Component {
    render() {
        return (
            <div className="headerNav">
                <div className="menu">
                    <div>LOGO</div>
                    <Link className="link" to="/list">חיפוש</Link>
                    <div>מועדפים</div>
                    <div>מחשבון שטחים</div>
                    <div>הוספת נכס</div>
                    <div>תגמול שותפים</div>
                    <div>קבל הצעות אישיות</div>
                    {this.props.storeMission.currentUserLoggedIn.type === "admin" ? <Link className="link" to="/admin">ניהול משתמשים</Link> : null}
                </div>
                <div className="logos">
                    <div>ICON</div>
                    <div>077998501</div>
                    <img src={Logo}></img>
                    <div className="loginAndLogout">
                        {this.props.storeMission.currentUserLoggedIn.username ? <div className="sayHello">שלום, {this.props.storeMission.currentUserLoggedIn.name}</div> : null}
                        {this.props.storeMission.currentUserLoggedIn.username ? <button className="disconnectButton" onClick={this.props.storeMission.logout}>התנתק</button> : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default navbar