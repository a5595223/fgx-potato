import * as React from 'react';
import { Router, Route } from "react-router-dom";
import history from './axios/history'
import Index from './components/Index/Index'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'


const App = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact={true} path="/" component={Index as any} />
        <Route path="/Login" component={Login as any} />
        <Route path="/signUp" component={SignUp as any} />
      </div>

    </Router >
  )
}


export default App
