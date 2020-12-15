import React, { Component } from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }



    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }


    onSubmit(e){

        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:3007/login' , userInfo)
            .then((response) => {
                console.log(response);
                if (response.data.auth){
                    console.log("Authenticated")
                    localStorage.setItem("token" , response.data.token)
                } else {
                    console.log("Not authenticated")
                }
            });
    }



    render() {

        return(
            <div>

                <form className="Information" noValidate autoComplete="off">
                    <br/> <TextField className="diva" type="password" value={this.state.password} onChange={this.onChangePassword}  label="Password" />
                </form>
                <Button className="button" onClick={this.onSubmit} variant="contained" color="primary">
                    Skapa konto
                </Button>
            </div>

        )

    }
}
