import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './components/Index/Index'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'


const App = () => {
  return (
    <Router>
      <div>
        <Route exact={true} path="/" component={Index as any} />
        <Route path="/Login" component={Login as any} />
        <Route path="/signUp" component={SignUp as any} />
      </div>

    </Router >
  )
}


export default App

