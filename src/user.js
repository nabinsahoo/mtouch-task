"use strict";

const express = require("express");
const uuid = require("uuid");
const app = express();

const Student = require("./db-function").StudentModel;
const logger = require("pino")({
    "name": "crud-app"
});

function createStudentValidation(req, res, next) {
    const input = {};

    if (req.body.name && req.body.roll && req.body.age && req.body.class && req.body.section && req.body.photo) {
        Object.assign(input, req.body, {
            "id": uuid.v4(),
            "crtAt": Date.now().toString(),
            "updAt": Date.now().toString()
        });
        req.input = input;
        next();
    } else {
        logger.error({
            "msg": "bad input for create an user",
            "status": 400
        }); // eslint-disable-next-line no-magic-numbers
        res.sendStatus(400);
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
            logger.error({
                "msg": "unable to create an user",
                err
            });
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
            logger.error({
                "msg": "unable to get the user",
                err
            });
            res.sendStatus(err);
        }
    }
);

function updateStudentValidation(req, res, next) {
    const input = {};

    if (req.body.name && req.body.roll && req.body.age && req.body.class && req.body.section && req.body.photo) {
        Object.assign(input, req.body, {
            "updAt": Date.now().toString()
        });
        req.input = input;

        next();
    } else {
        logger.error({
            "msg": "bad input for update an user",
            "status": 400
        }); // eslint-disable-next-line no-magic-numbers
        res.sendStatus(400);
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
            logger.error({
                "msg": "unable to update the user",
                err
            });
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
            logger.error({
                "msg": "unable to delete the user",
                err
            });
            res.sendStatus(err);
        }
    }
);

exports.app = app;
