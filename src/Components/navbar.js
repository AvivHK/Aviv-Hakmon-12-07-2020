import React, { Component } from 'react';
import Logo from "../propitLogo.jpg"
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';



@inject("storeMission")
@observer
class navbar extends Component {

    call = () => {
        window.open('tel:900300400')
    }
    render() {
        return (
            <div className="headerNav">
                <div className="menu">
                    <img className="logo" alt="PROPiT" src={Logo}></img>
                    <Link className="link" to="/list">חיפוש</Link>
                    <div>מועדפים</div>
                    <div>מחשבון שטחים</div>
                    <div>הוספת נכס</div>
                    <div>תגמול שותפים</div>
                    <div>קבל הצעות אישיות</div>
                    {this.props.storeMission.currentUserLoggedIn.type === "admin" ? <Link className="link" to="/admin">ניהול משתמשים</Link> : null}
                </div>
                <div className="logos">
                    <a href="tel:077-9985042">
                        <i onClick={this.call} className="fas fa-phone"></i></a>
                    <div>077-998501</div>
                    {this.props.storeMission.currentUserLoggedIn.username ? <div onClick={this.props.storeMission.logout} className="sayHello">שלום, {this.props.storeMission.currentUserLoggedIn.name}</div> : null}
                </div>
            </div>
        );
    }
}
export default navbar