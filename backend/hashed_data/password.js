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
    console.log(password)

    await bcrypt.compare(password, hash).then((res) => {console.log(res)})
    console.log(res)

} catch (e) {
    console.log(e)
}
}

ab()

