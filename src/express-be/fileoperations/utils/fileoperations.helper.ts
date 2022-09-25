import { Record } from "src/express-be/shared/models/shared.model";


export const idGenerator = (input: string) : string => {
    const prefix = input ? input : '';
    const length = 8;
    const timestamp = new Date();

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
      file_id: idGenerator("FR"),
      file_name,
      content,
    };
    return record;
}