import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import Particles from 'react-particles-js';
import Typed from 'typed.js';
import Instruction from './components/typed.component'
import Axios from "axios";
import Register from "./components/Register.components/register.component";
import Login from "./components/Login.components/login.component";


function App() {

    return (
<Router>
    <div className="container">
        <Register/>
        <Login/>
    </div>
</Router>
  );
}

export default App;
