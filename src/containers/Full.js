import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

import Header from '../components/Header/';
import Sidebar from '../components/Sidebar/';

import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import ProgramList from '../views/ProgramList'
import ProgramRenewal from '../views/ProgramRenewal';
import ProgramNew from '../views/ProgramNew';
import OfferList from '../views/OfferList';
import OfferNew from '../views/OfferNew';
import Reports from '../views/Reports';

import data from '../../data/userInfo.json';
/*
 *  This will load all hardcoded users data from a JSON file. 
 */

/*
 *  According to role there must be different routes (Access Control)
 *  e.g member can only 1: view subsciption programs 2: Can apply for new subscription
 *      sales person can 1: add new subscription programs 2: can add new offers 3: can view subscription programs / offers list
 *      service person can only view reports
 */
const roleWiseRoutes = {
  "member":
    <Switch>
      <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="/subscription/programs" name="ProgramList" component={ProgramList}/>
      <Route path="/subscription/renewal" name="ProgramRenewal" component={ProgramRenewal}/>
      <Redirect from="/" to="/dashboard"/>
    </Switch>,
  "sales":
    <Switch>
      <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="/subscription/programs" name="ProgramList" component={ProgramList}/>
      <Route path="/subscription/new" name="ProgramNew" component={ProgramNew}/>
      <Route path="/offers/list" name="OfferList" component={OfferList}/>
      <Route path="/offers/new" name="OfferNew" component={OfferNew}/>
      <Redirect from="/" to="/dashboard"/>
    </Switch>,
  "service":
    <Switch>
      <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="/reports" name="Reports" component={Reports}/>
      <Redirect from="/" to="/dashboard"/>
    </Switch>,
  "default":
    <Switch>
      <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
      <Redirect from="/" to="/dashboard"/>
    </Switch>
}

class Full extends Component {

  constructor(props){
    super(props);
    // If same page is refreshed userName should be maintained-> using sessionStrorage for it.
    const userName = sessionStorage.getItem("userName");
    if(data[userName])
      this.state = {
        "isLoggedIn": true,
        "userName": data[userName].userName,
        "role": data[userName].role,
        "loginMessage":"",
        "registerMessage":"",
        "firstName":"",
        "routes": roleWiseRoutes[data[userName].role]
      };
    else
      this.state = {
        "isLoggedIn": false,
        "userName": "",
        "role": "member",
        "loginMessage":"",
        "registerMessage":"",
        "routes": roleWiseRoutes.default
      }; 
    //binding these methods to parent object so when they get invoked from child, it stll has the parent context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(userInfo){
    //Login Check -> invoked from child Login
    if(!data[userInfo.username] || data[userInfo.username].password != userInfo.password){
      //Login failed
      this.setState({
        loginMessage:"Invalid credentials!"
      });
    } else {
      //Login Successful
      sessionStorage.setItem("userName", userInfo.username);
      sessionStorage.setItem("firstName", data[userInfo.username].firstName);
      sessionStorage.setItem("subscriptions", data[userInfo.username].subscriptions.toString());        
      this.setState({
        "isLoggedIn": true,
        "username": userInfo.username,
        "role": data[userInfo.username].role,
        "routes": roleWiseRoutes[data[userInfo.username].role]
      });
    }
  }

  logout(){
    //Logout -> invoked from child Header
    //resetting to default state
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("role", "");
    this.setState({
      "isLoggedIn": false,
      "userName": "",
      "role": "member",
      "loginMessage":"",
      "registerMessage":"",
      "routes": roleWiseRoutes.default
    });
  }

  componentWillUnmount(){
    //when component unmounts will clean up sessionStrorage
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("firstName", "");
    sessionStorage.setItem("role", "");
  }

  render() {
    return (
      <div>
      {
      !this.state.isLoggedIn && <Login login={this.login} loginMessage={this.state.loginMessage} />
      }
      {
      this.state.isLoggedIn && <div className="app">
        <Header logout={this.logout}/>
        <div className="app-body">
          <Sidebar {...this.props} role={this.state.role}/>
          <main className="main">
            <Container fluid>
                {this.state.routes}
            </Container>
          </main>
        </div>
        </div>
      }
      </div>
    );
  }
}

export default Full;
