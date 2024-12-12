"use strict";

const express = require("express");
const app = express();

require("./database"); // db connection
const router = require("./user").app;

app.get("/hello", (req, res) => {
    res.send("Hi there...\n");
});

app.use(express.json());
app.use("/", router);

// eslint-disable-next-line no-magic-numbers
app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("http://localhost:3000");
});
