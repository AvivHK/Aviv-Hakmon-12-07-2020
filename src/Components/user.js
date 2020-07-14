import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@inject("storeMission")
@observer
class user extends Component {

    changePermission = () => {
        this.props.storeMission.changePermission(this.props.user.userId, this.props.user.type)
    }

    deleteUser = () => {
        this.props.storeMission.deleteUser(this.props.user.userId)
    }




    render() {
        return (
            <tbody>
                <tr>
                    <td className="tableRow userIdCol hideInPhoneMode">{this.props.user.userId}</td>
                    <td className="tableRow usernameCol hideInPhoneMode">{this.props.user.username}</td>
                    <td className="tableRow nameCol">{this.props.user.name}</td>
                    <td className="tableRow mailCol">{this.props.user.email}</td>
                    <td className="tableRow typeCol hideInPhoneMode">{this.props.user.type}</td>
                    <td className="tableRow phoneNumberCol">{this.props.user.phone}</td>
                    {this.props.storeMission.currentUserLoggedIn.userId === this.props.user.userId ? <td className="tableRow"></td> :
                        <td className="tableRow actionCol">
                            <div className="actions">
                                <div onClick={this.changePermission} >
                                    {this.props.user.type === "admin" ? <i className="fas fa-lock iconActions"></i> : <i className="fas fa-unlock iconActions"></i>}
                                </div>
                                <div onClick={this.deleteUser} >
                                    <i className="far fa-trash-alt iconActions"></i>
                                </div>
                            </div>
                        </td>
                    }
                </tr>
            </tbody>);
    }
}
export default user