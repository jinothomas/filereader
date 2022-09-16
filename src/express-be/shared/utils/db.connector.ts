import * as mongoDB  from 'mongodb';
import * as dotenv from "dotenv";
import { handleHttpError } from './error-handler';

const connectionString =  'mongodb://localhost:27017/filereader';
const databasename =  'filereader';

const records = 'records';
const filepaths = 'filepaths';

export const collections: { filepaths?: mongoDB.Collection, records?: mongoDB.Collection } = {}

export async function mongodbConnection () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
          
  await client.connect().catch((error: any)=> {
    handleHttpError(error); 
  })
      
  const db: mongoDB.Db = client.db(databasename);
 
  const recordscollection: mongoDB.Collection = db.collection(records);
  const filepathscollection: mongoDB.Collection = db.collection(filepaths);

  collections.filepaths = filepathscollection;
  collections.records = recordscollection;
     
  console.log(`Successfully connected to database: ${db.databaseName}`);
}