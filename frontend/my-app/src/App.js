import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Register from "./components/Register.components/register.component";
import Login from "./components/Login.components/login.component";
import Navbar from "./components/navbar.component"


function App() {

    return (
        <Router>
         <div className="container">
         <Navbar/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
         </div>
    </Router>
  );
}

export default App;
