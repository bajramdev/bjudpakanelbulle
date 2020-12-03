import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Button, TextField} from '@material-ui/core';
import Particles from 'react-particles-js';


function App() {
  return (
    <div className="App">
     <h1>Logga in</h1>
        <Particles
            params={{
                "particles": {
                    "line_linked": {
                        "color":"#FFFFFF"
                    },
                    "number": {
                        "value": 150
                    },
                    "size": {
                        "value": 5
                    }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }}
            style={{
                width: '100%',
                background: `rgb(78,255,0)`
            }}
        />

        <div>

        <form className="classes.root" noValidate autoComplete="off">
           <div > <TextField className="diva"   id="standard-basic" label="Name" /> </div>
            <div> <TextField className="diva"   id="standard-basic" label="Email" /> </div>
            <div> <TextField className="diva"   id="standard-basic" label="Password" /> </div>
        </form>
        <Button variant="contained" color="primary">
            Submit
        </Button>
        </div>
    </div>
  );
}

export default App;
