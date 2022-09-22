import express, { Express } from 'express';
import dotenv from 'dotenv';
import { mongodbConnection } from './shared/utils/db.connector';
import { handleHttpError } from './shared/utils/error-handler';
import bodyParser from 'body-parser';
import fileoperations from './fileoperations/routes/fileops.routes';


const application: Express = express();
const port : number  = 8080;
const prefix: string = '/filereader';
dotenv.config();

const start = () => {
    mongodbConnection().then(()=>{
        application.listen(port,()=>{
            console.log(`[INFO] Express Backend server is up [port: ${port}]`);
            addroutes(application);
        });
    }).catch((error)=>{
        handleHttpError(error);
        console.error("[ERROR] Unable to connect to Database ---Terminating Express server!---");
        process.exit();
    })
}


const addroutes = (application: Express) => {
    application.use(bodyParser.json());
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(`${prefix}/fileoperations`, fileoperations);
}


start();