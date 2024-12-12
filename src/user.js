"use strict";

const express = require("express");
const app = express();
const uuid = require("uuid");

const Student = require("./db-function").StudentModel;

// Get Student details by StudentId,Get all Students with pagination
// Create Students with mandatory fields (name,age,class,section,rollNumber and photo as optional)
// Update Student details which should update name,age,class,section,photo and rollNumber)
// Delete Student with specific ID.

function createStudentValidation(req, res, next) {
    const input = {};

    if (!req.body.name || !req.body.age || !req.body.class || !req.body.section || !req.body.roll || !req.body.photo) {
        res.sendStatus(400); // eslint-disable-line no-magic-numbers
    } else {
        Object.assign(input, req.body, {
            "id": uuid.v4(),
            "crtAt": Date.now().toString(),
            "updAt": Date.now().toString()
        });

        req.input = input;

        next();
    }
}

app.post("/student",
    createStudentValidation,
    async (req, res) => {
        try {
            const result = await Student.create(req.input);

            res.send(result);
        } catch (err) {
            err.status = 500;
            res.sendStatus(err);
        }
    }
);

app.get("/student/:id",
    async (req, res) => {
        try {
            const result = await Student.findOne({
                "id": req.params.id
            });

            res.send(result);
        } catch (err) {
            err.status = 500;
            res.sendStatus(err);
        }
    }
);

function updateStudentValidation(req, res, next) {
    const input = {};

    if (!req.body.name || !req.body.age || !req.body.class || !req.body.section || !req.body.roll) {
        res.sendStatus(400); // eslint-disable-line no-magic-numbers
    } else {
        Object.assign(input, req.body, {
            "updAt": Date.now().toString()
        });

        req.input = input;

        next();
    }
}

app.put("/student/:id",
    updateStudentValidation,
    async (req, res) => {
        try {
            const result = await Student.findOneAndUpdate(
                {
                    "id": req.params.id
                },
                {
                    "$set": req.input
                },
                {
                    "new": true
                }
            );

            res.send(result);
        } catch (err) {
            err.status = 500;
            res.sendStatus(err);
        }
    }
);

app.delete("/student/:id",
    async (req, res) => {
        try {
            await Student.deleteOne({
                "id": req.params.id
            });

            res.send({});
        } catch (err) {
            err.status = 500;
            res.sendStatus(err);
        }
    }
);

exports.app = app;
