import { DatabaseService } from '../services/database-service';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export class ApiController {
    static async get(req: Request, res: Response) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await new DatabaseService().getEstates(limit, offset);
            res.setHeader('Content-Type', 'application/json');
            res.json(result.rows);
        } catch (error: any) { //todo 
            console.error('Error:', error.message);
            res.sendStatus(500);
        }
    }
}
