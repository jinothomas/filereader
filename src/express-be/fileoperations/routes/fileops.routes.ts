import express from 'express';
import os from 'os';
import multer  from 'multer';

const upload = multer({ dest: os.tmpdir() });

const fileoperations = express.Router();

fileoperations.get('/files', (request, response, next) => {

    response.send("get filepaths");
});


fileoperations.post('/uploadfile', upload.single('file'),(request: any, response: any)=> {
    try {
        if(request.file == undefined) {
            return response.send({
                message: '[ERROR] File not found'
            })
        }
        return response.send({
            message: '[INFO] File uploaded successfully'
        });

    }catch(error: any) {
        const message = `Error occured file uploading: ${error}`; 
        console.error(message);
        response.send({
            message
        });
    }
});

export default fileoperations;