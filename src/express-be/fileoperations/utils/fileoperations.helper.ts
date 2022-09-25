import { ACCESS_MODIFIERS } from "../../shared/models/shared.enums";
import { Metadata, Record } from "../../shared/models/shared.model";


export const idGenerator = (input: string) : string => {
    const prefix = input ? input : '';
    const length = 6;
    const timestamp = new Date().getTime();

    let _getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let ts = timestamp.toString();
    let parts = ts.split('').reverse();
    let id = '';

    for (let i = 0; i < length; ++i) {
      let index = _getRandomInt(0, parts.length - 1);
      id += parts[index];
    }

    return prefix + id;
}

export const mapFileInput = (file_name: string, content : any) => {
    const record: Record = {
      file_id: idGenerator('FR'),
      file_name,
      content,
    };
    return record;
}

export const mapMetaData = (input: Record) => {
   const metadata: Metadata = {
      file_id : input.file_id,
      file_name : input.file_name,
      file_size: input.content.length,
      accessmodifier: ACCESS_MODIFIERS.PUBLIC,
      created_by: 'Jino Thomas',
      created_on: new Date(),
      owner_id: 'AU122343',
   }
   return metadata;
}