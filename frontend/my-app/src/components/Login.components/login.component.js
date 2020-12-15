import React, { Component } from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.OnUserAuthenticated = this.OnUserAuthenticated.bind(this);

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


    onChangePassword(event) {
        this.setState({
            password: event.target.value
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

    OnUserAuthenticated(event){
        event.preventDefault();

        axios.get("http://localhost:3007/isUserAuth", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }}).then((response) => {
            console.log(response)
        })

    }



    render() {

        return(
            <div>

                <form className="Information" noValidate autoComplete="off">
                    <br/> <TextField className="diva" value={this.state.email} onChange={this.onChangeEmail} label="Email" />
                    <br/> <TextField className="diva" type="password" value={this.state.password} onChange={this.onChangePassword}  label="Password" />
                </form>
                <Button className="button" onClick={this.onSubmit} variant="contained" color="primary">
                    Submit
                </Button>
                <Button className="button" onClick={this.OnUserAuthenticated} variant="contained" color="primary">
                    Authenticate User
                </Button>
            </div>

        )

    }


}
