import csv from 'csv-parser';
import fs from 'fs';
import { handleHttpError } from '../../shared/utils/response-handler';
import { FileOperationsRepository } from '../repository/fileoperations.repository';
import { mapFileInput } from '../utils/fileoperations.helper';

const fileOperationsRepository = new FileOperationsRepository();

export class FileOperationsService {

    parseCSVFile = (file: any) => {
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


}