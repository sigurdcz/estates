import { Request, Response } from 'express';
import dotenv from 'dotenv';
import {SrealityImportUsecase} from "../usecases/sreality-import-usecase";
dotenv.config();

export class ImportController {
    static async update(req: Request, res: Response) {
        console.log(" UPDATE REQUEST ");
        await SrealityImportUsecase.importAndUpdate().then(()=>{
            console.log('Database was update');
        }).catch((error: any)=>{
            console.error({UpdateError: error});
        });
        res.sendStatus(200);
    }
}
