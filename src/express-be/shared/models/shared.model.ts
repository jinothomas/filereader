import { STATUS_CODES } from "../utils/response-handler";


export interface FileReaderResponse {
  status: STATUS_CODES,
  body?: any,
  status_message?: string,
  no_of_records?: string,
  start_index?: number,
  api_name?: string,
  app_version?: string
}


export interface Record {
   file_id: string,
   file_name: string,
   content: any
}