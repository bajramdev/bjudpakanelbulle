import React, { Component } from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }


    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
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
        e.preventDefault();

        const userInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:3007/register' , userInfo)
            .then(res => console.log(res.data));

    }

    render() {

        return(
            <div>

                <form className="Information" noValidate autoComplete="off">
                          <TextField className="diva"  value={this.state.name} onChange={this.onChangeName}  label="Name" />
                    <br/> <TextField className="diva"  value={this.state.email} onChange={this.onChangeEmail} label="Email" />
                    <br/> <TextField className="diva"  type="password" value={this.state.password} onChange={this.onChangePassword}  label="Password" />
                </form>
                <Button className="button" onClick={this.onSubmit} variant="contained" color="primary">
                    Submit
                </Button>
            </div>

        )

    }


}
