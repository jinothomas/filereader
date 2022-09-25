import express from 'express';
import os from 'os';
import multer  from 'multer';
import { FileOperationsService } from '../service/fileoperations.service';
import { handleHttpError,  } from '../../shared/utils/response-handler';
import { STATUS_CODES } from '../../shared/models/shared.enums';



const fileopsService = new FileOperationsService();
const upload = multer({ dest: os.tmpdir() });
const fileoperations = express.Router();

fileoperations.get('/files', (request, response, next) => {
    response.send("get filepaths");
});


fileoperations.post('/uploadfile', upload.single('file'),(request: any, response: any)=> {
    try {
      if (request.file == undefined) {
        return response.send({
          status: STATUS_CODES.NOT_FOUND,
          message: "[ERROR] File not found",
        });
      }
      return response.send(fileopsService.parseCSVFile(request.file));
    } catch (error) {
        handleHttpError(error);
    }
});

export default fileoperations;