const express = require("express");
const router = express.Router()
const axios = require('axios');
const bodyParser = require("body-parser");
const secretToken = process.env.GITHUB_TOKEN
const redis = require('redis')


const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on("error", (err) => {
	console.log("Error : ", err)
})


router.get("/repos", (req, res) => {
    const query = req.query.query

    const reposRedisKey = "query:repos";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": secretToken
    }

    return redisClient.get(query, (err, repos) => {
        if (err) throw err;
        if (repos) {
            return res.json({ source: "cache", ...JSON.parse(repos)})
        }
        else {
            axios.get("https://api.github.com/search/repositories?q=" + query, {
                method: "get",
                headers: headers
            })
            .then(response => {
                return response.data
            })
            .then(data => {                
                redisClient.setex(query, 600, JSON.stringify(data))

                res.json({source: 'api',  ...data});
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    })
    

})

module.exports = router;
