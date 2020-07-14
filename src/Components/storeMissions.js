import { observable, action } from "mobx";
import axios from "axios";
import moment from "moment";
import { missionStore } from "./missionStore";
import { createBrowserHistory } from "history";
import { userStore } from "./userStore";
const history = createBrowserHistory();
const userRoute = "http://localhost:4200";
// const userRoute = "";


export class StoreMission {

    @observable missions = []
    @observable users = []
    @observable currentMission = {}
    @observable currentUserLoggedIn = {}
    @observable showLoginErrMsg = false;


    routeChange = this.routeChange.bind(this);

    routeChange() {
        history.push("/list");
    }

    @action updateCurrentMission = mission => {
        this.currentMission = mission
    }

    @action getMissions = async () => {
        let missions;
        if (this.currentUserLoggedIn.type === "admin") {
            missions = await axios.get(`${userRoute}/missions`)
        }
        else {
            missions = await axios.get(`${userRoute}/missions/${this.currentUserLoggedIn.userId}`)
        }
        this.missions = missions.data.map(m => new missionStore(m))
    }

    @action postMission = async (name, phone, email, detail) => {
        let date = moment(Date.now()).format("YYYY-MM-DD")
        await axios.post(`${userRoute}/mission`, {
            name,
            phone,
            email,
            detail,
            date,
            userId: this.currentUserLoggedIn.userId
        });
        this.getMissions();
    }

    @action deleteMission = async (missionId) => {
        const headers = {
            Authorization: "",
        };
        const data = {
            missionId: missionId,
        };
        await axios.delete(`${userRoute}/delMission`, { headers, data });
    }

    @action updateMission = async (name, phone, email, detail, date) => {
        const index = this.missions.findIndex(m => m.missionId === this.currentMission.missionId)
        this.missions[index] = new missionStore({ missionId: this.currentMission.missionId, name, phone, email, detail, date })
        await axios.put(`${userRoute}/changeMission`, {
            name,
            phone,
            email,
            detail,
            date,
            missionId: this.currentMission.missionId
        });
    }

    @action login = async (name, password) => {
        if (name && password) {
            let data = await axios.get(`${userRoute}/user/${name}`)
            data = data.data
            if (data[0] && data[0].password === password) {
                this.routeChange();
                this.currentUserLoggedIn = new userStore(data[0])
            }
            else {
                this.showLoginErrMsg = true;
            }
        }
        else {
            this.showLoginErrMsg = true;
        }
    }

    @action register = async (name, password, username, email, phone) => {
        await axios.post(`${userRoute}/user`, {
            username,
            password,
            name,
            email,
            type: "user",
            phone
        });
        let user = await this.getUserAfterLogin(username)
        this.routeChange();
        this.currentUserLoggedIn = new userStore({ userId: user.userId, username: user.username, password: user.password, name: user.name, email: user.email, type: user.type, phone: user.phone })

    }

    @action logout = () => {
        this.currentUserLoggedIn = ""
    }

    @action getUsers = async () => {
        let users = await axios.get(`${userRoute}/users`)
        this.users = users.data.map(u => new userStore(u))

    }

    @action getUsersByEmail = async email => {
        let users = await axios.get(`${userRoute}/users/${email}`)
        if (users.data[0]) {
            return true;
        }
        else {
            return false;
        }
    }

    @action getUsersByUsername = async username => {
        let users = await axios.get(`${userRoute}/user/${username}`)
        if (users.data[0]) {
            return true;
        }
        else {
            return false;
        }
    }

    @action getUserAfterLogin = async username => {
        let users = await axios.get(`${userRoute}/user/${username}`)
        return users.data[0]

    }

    @action changePermission = async (userId, type) => {
        if (type === "admin") {
            type = "user"
        }
        else {
            type = "admin"
        }
        this.users.find(u => u.userId === userId).type = type
        await axios.put(`${userRoute}/changeUser`, {
            userId,
            type
        });
    }


    @action deleteUser = async userId => {
        const headers = {
            Authorization: "",
        };
        const data = {
            userId,
        };
        this.users.splice(this.users.findIndex(u => u.userId === userId), 1)
        await axios.delete(`${userRoute}/delUser`, { headers, data });
    }

}
