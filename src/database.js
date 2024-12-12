"use strict";

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user");

mongoose.connection.on("error", (err) => { // eslint-disable-next-line no-console
    console.error(`database connection error -> ${err.message}`);
});
