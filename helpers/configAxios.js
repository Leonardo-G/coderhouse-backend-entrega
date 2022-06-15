const axios = require("axios").default;

const instanceFunction = (token) => {

    const instance = axios.create({
        baseURL: process.env.URL_API,
        headers: {
            "Content-Type": "application/json",
            "auth-token": token ? token : null
        }
    })

    return instance;
}

module.exports = instanceFunction;