import express from 'express';
import os from 'os';
import multer  from 'multer';
import { FileOperationsService } from '../service/fileoperations.service';
import { handleHttpError,  } from '../../shared/utils/response-handler';
import { STATUS_CODES } from '../../shared/models/shared.enums';



const fileopsService = new FileOperationsService();
const upload = multer({ dest: os.tmpdir() });
const fileoperations = express.Router();

fileoperations.get('/files', (request : any, response: any) => {
    const page_no = parseInt(request.query.page_no);
    const page_size =  parseInt(request.query.page_size);
    
    fileopsService.getFileMetaData(page_no,page_size).then((data: any)=> {
      response.send(data);
    }).catch((error)=> {
      response.send(error);
    })
    
});


fileoperations.post('/uploadfile', upload.single('file'),(request: any, response: any)=> {
    try {
      if (!request.file) {
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

fileoperations.get('/content/:file_id', (request : any, response: any) => {
  const page_no = parseInt(request.query.page_no);
  const page_size =  parseInt(request.query.page_size);
  
  fileopsService.getContent(request.params.file_id).then((data: any)=> {
    response.send(data);
  }).catch((error)=> {
    response.send(error);
  })
  
});


export default fileoperations;