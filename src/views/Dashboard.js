import React, { Component } from 'react';
import {Alert} from 'reactstrap';

class Dashboard extends Component {
	// State is not required as first name is taken from sessionStorage
  render() {
    return (
      <div className="animated fadeIn" style={{marginTop:25}}>
	      <Alert color="primary">
	        Hello {sessionStorage.getItem("firstName")}!
	      </Alert>
      </div>
    )
  }
}

export default Dashboard;
