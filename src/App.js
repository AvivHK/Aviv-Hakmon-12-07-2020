import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Navbar from "./Components/navbar"
import List from "./Components/list"
import AddMission from "./Components/addMission"
import EditMission from "./Components/editMission"
import loginOrRegister from "./Components/loginOrRegister";
import Admin from "./Components/admin";


@inject("storeMission")
@observer
class App extends Component {

  render() {
    return (
      <Router >
        <Navbar></Navbar>
        {this.props.storeMission.currentUserLoggedIn.email ?
          <div>
            <Route path="/list" component={List} />
            <Route path="/addMission" component={AddMission} />
            <Route path="/editMission" component={EditMission} />
            <Route path="/admin" component={Admin} />
          </div>
          :
          <Route path="/" component={loginOrRegister} />
        }
      </Router>
    );
  }
}




export default App;
