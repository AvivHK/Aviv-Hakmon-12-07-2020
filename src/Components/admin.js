import React, { Component } from 'react';
import User from "./user";
import { inject, observer } from 'mobx-react';



@inject("storeMission")
@observer
class admin extends Component {
    componentDidMount() {
        this.props.storeMission.getUsers()
    }

    render() {
        return (
            <table dir="rtl" className="users">
                <thead className="rtl">
                    <tr className="rtl">
                        <th className="tableHead">מספר</th>
                        <th className="tableHead">שם משתמש</th>
                        <th className="tableHead">שם</th>
                        <th className="tableHead">מייל</th>
                        <th className="tableHead">סוג חשבון</th>
                        <th className="tableHead">טלפון</th>
                        <th className="tableHead">פעולות</th>
                    </tr>
                </thead>
                {this.props.storeMission.users.map((u, key) => <User user={u} key={key} />)}
            </table>
        );
    }
}
export default admin