const axios = require('axios')

const server_url = 'http://localhost:3001/user';

async function GetUser(uid){
    let user = await axios.get(`${server_url}/${uid}`);
    console.log(user)
    return user;
}

module.exports = {GetUser};