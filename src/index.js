"use strict";

const express = require("express");
const app = express();

const port = 3000;

require("./database"); // db connection
const router = require("./user").app;

app.get("/hello", (req, res) => {
    res.send("Hi there...\n");
});

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
    console.log(`Port is running on ${port}`); // eslint-disable-line no-console
});

exports.app = app;
