import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Item from "./item";
import { Link } from 'react-router-dom';



@inject("storeMission")
@observer
class navbar extends Component {
    constructor() {
        super();
        this.state = {
            search: "",
            filtered: [],
        }
    }
    componentDidMount = () => {
        this.props.storeMission.getMissions()
    }

    handleChange = async e => {
        await this.setState({ search: e.target.value })
        await this.search()
    }

    search = async () => {
        let filteredUsername = [];
        let filteredDetails = [];
        await this.props.storeMission.missions.map(m => {
            return m.userName.includes(this.state.search) ? filteredUsername.push(m) : null
        })
        await this.props.storeMission.missions.map(m => {
            return m.details.includes(this.state.search) ? filteredDetails.push(m) : null
        })
        filteredDetails.map(m => {
            if (!filteredUsername.find(mm => mm.missionId === m.missionId)) {
                filteredUsername.push(m)
            }
        })
        await this.setState({ filtered: [...filteredUsername] })
    }


    render() {

        return (
            <div className="listContainer">
                <div className="titleMissions">ניהול המשימות</div>
                <input onChange={e => this.handleChange(e)} value={this.state.search} className="rtl search" placeholder="חיפוש משימה..."></input>
                <div className="titleTop">
                    <div className="numOfMission">רשימת המשימות שלך ({this.props.storeMission.missions.length})</div>
                    <Link className="link addMissionButton" to="/addMission"><button className="newMissionButton">משימה חדשה</button></Link>
                </div>
                <div className="holdTable">
                    <div></div>
                    <table dir="rtl" className="missions">
                        <thead className="rtl">
                            <tr className="rtl">
                                <th className="tableHead">שם משתמש</th>
                                <th className="tableHead">טלפון</th>
                                <th className="tableHead">מייל</th>
                                <th className="tableHead">תאריך יצירת הפעולה</th>
                                <th className="tableHead">פעולות</th>
                            </tr>
                        </thead>
                        {(this.state.filtered.length === 0 && this.state.search !== "") ? this.state.filtered.map((m, key) => <Item mission={m} key={key} />) : this.state.filtered.length !== 0 ? this.state.filtered.map((m, key) => <Item mission={m} key={key} />) : this.props.storeMission.missions.map((m, key) => <Item mission={m} key={key} />)}
                    </table>
                </div>
            </div>
        );
    }
}
export default navbar