import { observable } from "mobx";


export class missionStore {
    @observable missionId;
    @observable userName;
    @observable phoneNumber;
    @observable mailAddress;
    @observable creationDate;
    @observable details;

    constructor(mission) {
        this.missionId = mission.missionId;
        this.userName = mission.name;
        this.phoneNumber = mission.phone;
        this.mailAddress = mission.email;
        this.creationDate = mission.date;
        this.details = mission.detail;
    }
}