import React, {useEffect} from 'react';
import Axios from 'axios'


const submitButton = () => {
    Axios.post('http://localhost:1111/register', {
        name: name,
        email: email,
        password: password
    }).then(() => {
        console.log("Success!")
    })
};