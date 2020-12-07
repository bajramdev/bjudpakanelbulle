const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const bcrypt = require('bcrypt');

let password = "Bajram123!"
const a = "asd"
const saltRounds = 10;


async function ab() {


try {
    const hash = await bcrypt.hash(password , 10)

    console.log(hash)

    const validPass = await bcrypt.compare(password, hash).then((res) => {console.log(res)})


} catch (e) {
    console.log(e)
}
}


async function bbbb(){

    await bcrypt.compare(password, hash)
        .then((res) => {console.log(res)})


}

ab()

bbbb();