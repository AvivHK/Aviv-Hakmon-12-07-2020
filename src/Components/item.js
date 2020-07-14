import React, { Component } from 'react';
import moment from "moment";
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject("storeMission")
@observer
class item extends Component {
    constructor() {
        super();
        this.state = {
            bigger: false
        }
    }

    delItem = () => {
        this.props.storeMission.missions.splice(this.props.storeMission.missions.findIndex(m => m.missionId === this.props.mission.missionId), 1)
        this.props.storeMission.deleteMission(this.props.mission.missionId)
    }

    bigger = () => {
        this.setState({
            bigger: !this.state.bigger
        })
    }

    updateCurrent = () => {
        this.props.storeMission.updateCurrentMission(this.props.mission)
    }
    render() {
        return (
            <tbody>
                <tr>
                    <td className="tableRow userNameCol">{this.props.mission.userName}</td>
                    <td className="tableRow phoneNumberCol">{this.props.mission.phoneNumber}</td>
                    <td className="tableRow mailCol">{this.props.mission.mailAddress}</td>
                    <td className="tableRow dateCol hideInPhoneMode">{moment(this.props.mission.creationDate).format('DD/MM/YYYY')}</td>
                    <td className="tableRow actionCol">
                        <div className="actions">
                            <div onClick={this.bigger} >
                                <i className="fas fa-eye iconActions"></i>
                            </div>
                            <Link onClick={this.updateCurrent} to="/editMission" className="link action">
                                <i className="fas fa-pencil-alt iconActions"></i>
                            </Link>
                            <div onClick={this.delItem}>
                                <i className="far fa-trash-alt iconActions"></i>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className={this.state.bigger ? "rowBigger" : "hide"} >
                    <td className="details"> פרטי המשימה:</td>
                    <td className="details"></td>
                    <td>{this.props.mission.details}</td>
                    <td className="details hideInPhoneMode"></td>
                    <td className="details">{moment(this.props.mission.creationDate).format('DD/MM/YYYY')}</td>
                </tr>
            </tbody>
        );
    }
}
export default item