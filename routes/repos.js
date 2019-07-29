const express = require("express");
const router = express.Router()
const axios = require('axios');
const bodyParser = require("body-parser");
const secretToken = process.env.GITHUB_TOKEN

router.get("/repos", (req, res) => {
    const query = req.query.query

    const headers = {
        "Content-Type": "application/json",
        "Authorization": secretToken
    }

    axios.get("https://api.github.com/search/repositories?q=" + query, {
        method: "get",
        headers: headers
    })
    .then(response => {
        return response.data
    })
    .then(data => {
        res.json(data)
    })
    .catch(function (error) {
        console.log(error);
    })

})

module.exports = router;
