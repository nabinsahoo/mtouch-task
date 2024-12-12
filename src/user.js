"use strict";

const express = require("express");
const uuid = require("uuid");
const app = express();

const Student = require("./db-function").StudentModel;

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
