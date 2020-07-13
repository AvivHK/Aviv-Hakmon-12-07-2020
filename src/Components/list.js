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
        this.setState({ search: e.target.value })
        this.search()
    }

    search =  () => {
        let filtered = [];
        this.props.storeMission.missions.map(m => {
            return m.userName.includes(this.state.search) ? filtered.push(m) : null
        })
        console.log(this.props.storeMission.missions[3].userName.includes(this.state.search))
        this.setState({filtered: [...filtered]})
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
                    {(this.state.filtered.length !== 0) ?  this.state.filtered.map((m, key) => <Item mission={m} key={key} />) : this.props.storeMission.missions.map((m, key) => <Item mission={m} key={key} />)}
                </table>
            </div>
        );
    }
}
export default navbar