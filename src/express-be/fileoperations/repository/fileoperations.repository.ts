import { STATUS_CODES } from "../../shared/models/shared.enums";
import { Record } from "../../shared/models/shared.model";
import { collections } from "../../shared/utils/db.connector";
import { handleHttpError, handleResponse } from "../../shared/utils/response-handler";
import { mapMetaData } from "../utils/fileoperations.helper";



export class FileOperationsRepository {
    saveFileContent = (input: Record) => {
        return new Promise((resolve, reject) => { 
               collections.records?.insertOne(input).catch((error)=>{
                reject(handleHttpError(error));
               });
               collections.metadata?.insertOne(mapMetaData(input)).then((data)=> {
                    if(data.acknowledged) {
                        const response : any =  {
                            body : `file_id: ${input.file_id} , file_name: ${input.file_name}, record_id:${data.insertedId}`,
                            status: STATUS_CODES.CREATED  
                        }
                        resolve(handleResponse(response))
                    } 
               }).catch((error)=>{
                    console.log(error);
                    reject(error);
               })
        });
    }
}