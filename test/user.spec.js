"use strict";

const assert = require("assert");
const agent = require("supertest").agent;
const app = require("../src/index").app;
const request = agent(app);

const createInp = {
    "name": "abc xyz",
    "age": 20,
    "class": "X",
    "section": "A",
    "roll": "020AC123",
    "photo": "data:base64/png....."
};
const updInp = {
    "name": "abc pqr",
    "age": 21,
    "class": "X",
    "section": "B",
    "roll": "020AC123",
    "photo": "data:base64/png....."
};

let studentId;

describe("User Game Score Test cases", () => {
    before(() => {
        //
    });
    after(done => {
        done();
    });
    it("POST /student should respond with HTTP-200", (done) => {
        request.post("/student")
            .send(createInp) // eslint-disable-next-line no-magic-numbers
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert(res.body instanceof Object);
                studentId = res.body.id;
                done();
            });
    });
    it("GET /student should respond with HTTP-200", (done) => {
        request.get("/student/" + studentId) // eslint-disable-next-line no-magic-numbers
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert(res.body instanceof Object);
                done();
            });
    });
    it("PUT /student should respond with HTTP-200", (done) => {
        request.put("/student/" + studentId)
            .send(updInp) // eslint-disable-next-line no-magic-numbers
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert(res.body instanceof Object);
                done();
            });
    });
    it("DELETE /student should respond with HTTP-200", (done) => {
        request.delete("/student/" + studentId) // eslint-disable-next-line no-magic-numbers
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert(res.body instanceof Object);
                done();
            });
    });
});
