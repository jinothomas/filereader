import csv from 'csv-parser';
import fs from 'fs';
import { handleHttpError } from '../../shared/utils/response-handler';
import { FileOperationsRepository } from '../repository/fileoperations.repository';
import { mapFileInput } from '../utils/fileoperations.helper';

const fileOperationsRepository = new FileOperationsRepository();

export class FileOperationsService {

    parseCSVFile = async (file: any) => {
      const results: any = [];
      try {
        fs.createReadStream(file.path)
          .pipe(csv({}))
          .on("data", (data) => results.push(data))
          .on("end", () => {
            return fileOperationsRepository.saveFileContent(
              mapFileInput(file.originalname, results)
            ); 
          });
      } catch (error) {
        handleHttpError(error);
      } 
    }

    getFileMetaData = (page_no: number, page_size: number) => {
      return fileOperationsRepository.getMetaData(page_no,page_size);
    }

    getContent = (file_id: string) => {
      return fileOperationsRepository.getContent(file_id);
    }
}