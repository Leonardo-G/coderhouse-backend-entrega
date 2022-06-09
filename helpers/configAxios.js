const axios = require("axios").default;

const instanceFunction = (body = {}, token) => {

    const instance = axios.create({
        baseURL: process.env.URL_API,
        headers: {
            "Content-Type": "application/json",
            "auth-token": token ? token : null
        },
        body: JSON.stringify(body)
    })

    return instance;
}

module.exports = instanceFunction;