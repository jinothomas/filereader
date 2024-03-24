import * as mongoDB  from 'mongodb';
import * as dotenv from "dotenv";
import { handleHttpError } from './response-handler';


const connectionString =  'mongodb://localhost:27017/filereader';
const databasename =  'filereader';

const records = 'records';
const metadata = 'metadata';
const users = 'users';
const roles = 'role';

export const collections: { metadata?: mongoDB.Collection, records?: mongoDB.Collection, users?: mongoDB.Collection, roles?: mongoDB.Collection } = {}

export async function mongodbConnection () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
          
  await client.connect().catch((error: any)=> {
    handleHttpError(error); 
  });
      
  const db: mongoDB.Db = client.db(databasename);

  const metadatacollection: mongoDB.Collection = db.collection(metadata);
  const recordscollection: mongoDB.Collection = db.collection(records);
  const userscollection: mongoDB.Collection = db.collection(users);
  const rolescollection: mongoDB.Collection = db.collection(roles);

  collections.metadata = metadatacollection;
  collections.records = recordscollection;
  collections.users = userscollection;
  collections.roles = rolescollection;
     
  console.log(`Successfully connected to database: ${db.databaseName}`);
}