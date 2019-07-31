const express = require("express");
const axios = require('axios');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

require('dotenv').config()

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST, GET, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));


const port = process.env.PORT || 3001

const repoRouter = require("./routes/repos")	

app.use(repoRouter)

app.listen(port, () => {
	console.log("Node Version: ", process.version)
	console.log(`Express Server listening on ${port}`)
})