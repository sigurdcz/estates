import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApiController } from './controllers/api-controller';
import { ImportController } from './controllers/import-controller';
import {SrealityImportUsecase} from "./usecases/sreality-import-usecase";
import { DatabaseService } from './services/database-service';
dotenv.config();

const app = express();
app.use(cors());

app.get('/api/estate', ApiController.get);
app.post('/api/internal/update', ImportController.update); // manual update

app.listen(process.env.SERVER_PORT, async () => {
    console.log(
        `Server has been started http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    );

    await new DatabaseService().waitForDatabase();
    
    // auto import on start
    SrealityImportUsecase.importAndUpdate().then(()=>{
        console.log('Database was update');
    }).catch((error: any)=>{
        console.error({ManualUpdateError: error});
    });
});