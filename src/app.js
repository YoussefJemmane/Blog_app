const express = require("express");
const app = express();
const requestLogger = require("./middleware/request-logger");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  console.log("Hello");
});
app.use(notFound);
app.use(errorHandler);
module.exports = app;
