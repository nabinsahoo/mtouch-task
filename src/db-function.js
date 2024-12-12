"use strict";

const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        "id": {
            "type": String,
            "required": [true, "id required"]
        },
        "name": {
            "type": String,
            "minlength": 1,
            "maxLength": 256,
            "required": [true, "Name required"]
        },
        "age": {
            "type": Number,
            "required": [true, "age required"]
        },
        "roll": { // rollNumber
            "type": String,
            "required": [true, "roll required"]
        },
        "class": {
            "type": String,
            "required": [true, "class required"]
        },
        "section": {
            "type": String,
            "required": [true, "class required"]
        },
        "photo": { // blob format
            "type": String,
            "required": [true, "photo required"]
        },
        "crtAt": { // created At
            "type": String,
            "required": [true, "createdAt required"]
        },
        "updAt": { // updated At
            "type": String,
            "required": [true, "updatedAt required"]
        }
    },
    {
        "strict": "throw"
    }
);

const StudentModel = mongoose.model("Strudent", StudentSchema);

exports.StudentModel = StudentModel;
