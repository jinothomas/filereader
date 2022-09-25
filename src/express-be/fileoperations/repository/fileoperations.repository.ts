import { Record } from "src/express-be/shared/models/shared.model";
import { collections } from "src/express-be/shared/utils/db.connector";
import { handleResponse, STATUS_CODES } from "src/express-be/shared/utils/response-handler";



export class FileOperationsRepository {
    saveFileContent = (input: Record) => {
        return new Promise((resolve, reject) => { 
               collections.records?.insertOne(input)
               .then((data)=> {
                    if(data.acknowledged) {
                        const response : any =  {
                            body : `file_id: ${input.file_id} , file_name: ${input.file_name}, record_id:${data.insertedId}`,
                            status: STATUS_CODES.CREATED  
                        }
                        resolve(handleResponse(response));
                    } 
               }).catch((error)=>{
                    console.log(error);
                    reject(error);
               })
        });
    }
}