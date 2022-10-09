import { ACCESS_MODIFIERS, ROLE_SCOPES, STATUS_CODES } from "./shared.enums"



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

export interface Metadata {
  file_id: string,
  file_name: string,
  file_size?: string,
  created_on: Date,
  created_by: string,
  accessmodifier: ACCESS_MODIFIERS,
  owner_id: string,
  updated_by?: string,
  updated_on?: string
}

export interface User {
  user_id: string,
  first_name: string,
  middle_name?: string,
  official_id: string,
  last_name?: string,
  user_email?: string,
  user_phone?: string,
  is_admin: boolean,
  is_superadmin: boolean
}

export interface Role {
  role_name: string,
  role_id: string,
  role_priority: number,
  role_scopes: [ROLE_SCOPES]
}

export interface MetadataResponse {
  records : any,
  status: STATUS_CODES,
  status_text : string,
  no_of_records: number,
  total_records?: number
}


export interface ContentResponse {
  records : any,
  status: STATUS_CODES,
  status_text : string,
  no_of_records: number,
  total_records?: number
}

export interface UploadFileResponse {
  body: string,
  status: STATUS_CODES,
  status_text : string,
  message: string,
}

export interface RemoveFileResponse {
  body: string,
  status: STATUS_CODES,
  status_text : string,
  message: string,
}