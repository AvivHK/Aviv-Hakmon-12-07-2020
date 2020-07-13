import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@inject("storeMission")
@observer
class login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }

    }



    change = e => {
        this.setState({
            [e.target.name === "username" ? "username" : "password"]: e.target.value
        })
        this.props.storeMission.showLoginErrMsg = false;
    }


    submitLogin = () => {
        this.props.storeMission.login(this.state.username, this.state.password)
    }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">התחברות</div>
                <div className="content">
                    <div className="image">
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">שם משתמש</label>
                            <input type="text" name="username" onChange={this.change} value={this.state.username} placeholder="שם משתמש" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">סיסמא</label>
                            <input type="password" name="password" onChange={this.change} value={this.state.password} placeholder="סיסמא" />
                        </div>
                    </div>
                </div>
                {this.props.storeMission.showLoginErrMsg ? <div className="errorMsg">שם משתמש וסיסמא לא תואמים</div> : null}
                <div className="footer">
                    <button type="button" className="btn" onClick={this.submitLogin}>
                        התחברות
          </button>
                </div>
            </div>
        );
    }
}
export default login
