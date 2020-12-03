import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Button, TextField} from '@material-ui/core';

function App() {
  return (
    <div className="App">
     <h1>Logga in</h1>
        <div>
        <form className="classes.root" noValidate autoComplete="off">
            <TextField id="standard-basic" label="Name" />
            <TextField id="standard-basic" label="Email" />
            <TextField id="standard-basic" label="Password" />
        </form>
        <Button variant="contained" color="primary">
            Submit
        </Button>
        </div>
    </div>
  );
}

export default App;
