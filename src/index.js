import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

import 'bootstrap/dist/css/bootstrap.css';

// Containers
import Full from './containers/Full';

// Register
import Register from './views/Register';

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/register" name="Register" component={Register}/>
      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
