import express from 'express';
import os from 'os';
import multer  from 'multer';
import { FileOperationsService } from '../service/fileoperations.service';
import { STATUS_CODES } from 'src/express-be/shared/utils/response-handler';



const fileopsService = new FileOperationsService();
const upload = multer({ dest: os.tmpdir() });
const fileoperations = express.Router();

fileoperations.get('/files', (request, response, next) => {
    response.send("get filepaths");
});


fileoperations.post('/uploadfile', upload.single('file'),(request: any, response: any)=> {
    try {
        if(request.file == undefined) {
            return response.send({
                status : STATUS_CODES.NOT_FOUND,
                message: '[ERROR] File not found'
            })
        }
        fileopsService.parseCSVFile(request.file);
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