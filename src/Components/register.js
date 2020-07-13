import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as EmailValidator from "email-validator";
var passwordValidator = require("password-validator");


@inject("storeMission")
@observer
class register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      name: "",
      phone: "",
      password: "",
      emailInUse: false,
      emailNotValid: false,
      usernameInUse: false,
      errorPassword: false
    }
  }

  checkPassword = () => {
    const schema = new passwordValidator();
    schema.is().min(8);
    schema.is().max(40);
    schema.has().not().spaces();
    schema.is().not().oneOf(["Passw0rd", "Password123", 12345678]);
    schema.has().lowercase();
    schema.has().uppercase();
    if (!schema.validate(this.state.password)) {
      this.setState({
        errorPassword: true,
      });
    }
    return !(this.state.errorPassword)
  }

  checkEmail = async () => {
    const valid = EmailValidator.validate(this.state.email);
    let emailInUse;
    if (this.state.email) {
      emailInUse = await this.props.storeMission.getUsersByEmail(this.state.email);
    }
    else {
      emailInUse = true
    }
    await this.setState({
      emailNotValid: !valid,
      emailInUse
    })
    return !(this.state.emailInUse || this.state.emailNotValid)
  }

  checkUsername = async () => {
    let usernameInUse
    if (this.state.username) {
      usernameInUse = await this.props.storeMission.getUsersByUsername(this.state.username);
    }
    else {
      usernameInUse = true
    }
    await this.setState({
      usernameInUse
    })
    return !(this.state.usernameInUse)
  }


  change = e => {
    this.setState({
      [e.target.name === "username" ? "username" : e.target.name === "email" ? "email" : e.target.name === "name" ? "name" : e.target.name === "phone" ? "phone" : "password"]: e.target.value,
      [e.target.name === "username" ? "usernameInUse" : e.target.name === "email" ? "emailNotValid" : e.target.name === "password" ? "errorPassword" : null]: false,
      [e.target.name === "email" ? "emailInUse" : null]: false
    })
  }

  submitRegister = async () => {
    await this.checkEmail()
    await this.checkPassword()
    await this.checkUsername()
    if (!this.state.usernameInUse && !this.state.errorPassword && !this.state.emailInUse && !this.state.emailNotValid) {
      this.props.storeMission.register(this.state.name, this.state.password, this.state.username, this.state.email, this.state.phone)
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">הרשמה</div>
        <div className="content">
          <div className="image">
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">שם משתמש</label>
              <input type="text" onChange={this.change} value={this.state.username} name="username" placeholder="שם משתמש" />
              {this.state.usernameInUse ? <div className="errorMsg">שם המשתמש הזה כבר בשימוש</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">דואר אלקטרוני</label>
              <input type="text" onChange={this.change} value={this.state.email} name="email" placeholder="דואר אלקטרוני" />
              {this.state.emailInUse ? <div className="errorMsg">האיימיל הזה כבר בשימוש</div> : this.state.emailNotValid ? <div className="errorMsg">כתובת מייל לא תקינה</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">סיסמא</label>
              <input type="password" onChange={this.change} value={this.state.password} name="password" placeholder="סיסמא" />
              {this.state.errorPassword ? <div className="errorMsg">הסיסמא צריכה להיות מורכבת מ8 תווים, אותיות גדולות וקטנות</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">שם מלא</label>
              <input type="text" onChange={this.change} value={this.state.name} name="name" placeholder="שם מלא" />
            </div>
            <div className="form-group">
              <label htmlFor="email">מספר טלפון</label>
              <input type="text" onChange={this.change} value={this.state.phone} name="phone" placeholder="מספר טלפון" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.submitRegister}>
            הרשמה
          </button>
        </div>
      </div>
    );
  }
}

export default register