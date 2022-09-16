import express from 'express';

const fileops = express.Router();

fileops.get('/', (request, response, next) => {

    response.send("get filepaths");
});

export default fileops;