import { observable } from "mobx";


export class userStore {
    @observable userId;
    @observable username;
    @observable password;
    @observable name;
    @observable email;
    @observable type;
    @observable phone;

    constructor(user) {
        this.userId = user.userId;
        this.username = user.username;
        this.password = user.password;
        this.name = user.name;
        this.email = user.email;
        this.type = user.type;
        this.phone = user.phone;
    }
}