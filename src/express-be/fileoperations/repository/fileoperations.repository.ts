import { FindOptions } from "mongodb";
import { STATUS_CODES } from "../../shared/models/shared.enums";
import { ContentResponse, MetadataResponse, Record, UploadFileResponse } from "../../shared/models/shared.model";
import { collections } from "../../shared/utils/db.connector";
import { handleHttpError } from "../../shared/utils/response-handler";
import { mapMetaData } from "../utils/fileoperations.helper";

export class FileOperationsRepository {
  saveFileContent = (input: Record) => {
    return new Promise((resolve, reject) => {
      collections.records?.insertOne(input).catch((error) => {
        reject(handleHttpError(error));
      });
      collections.metadata?.insertOne(mapMetaData(input))
        .then((data) => {
          if (data.acknowledged) {
            const response: UploadFileResponse = {
              body: `file_id: ${input.file_id} , file_name: ${input.file_name}, record_id:${data.insertedId}`,
              status: STATUS_CODES.CREATED,
              status_text: "CREATED",
              message: "File Uploaded Successfully",
            };
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getMetaData = (page_no: number, page_size: number) => {
    let query: FindOptions = { skip: page_size * page_no, limit: page_size };

    return new Promise((resolve, reject) => {
      collections.metadata
        ?.find({}, query)
        .toArray()
        .then((data) => {
          const response: MetadataResponse = {
            records: data,
            status: STATUS_CODES.OK,
            status_text: "OK",
            no_of_records: data ? data.length : 0,
          };
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getContent = (file_id: string) => {
 
     return new Promise((resolve, reject) => {
      collections.records
        ?.find({file_id}, {})
        .toArray()
        .then((data) => {
          const response: ContentResponse = {
            records: data,
            status: STATUS_CODES.OK,
            status_text: "OK",
            no_of_records: data ? data.length : 0,
          };
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
