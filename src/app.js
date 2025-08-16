const express = require("express");

const app = express();

app.use(express.json());
app.get("/", (req,res) => {
	console.log("Hello")
})

module.exports = app;
