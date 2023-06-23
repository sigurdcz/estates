"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const database_service_1 = require("../services/database-service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ApiController {
    static async get(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const result = await new database_service_1.DatabaseService().getEstates(limit, offset);
            res.setHeader('Content-Type', 'application/json');
            res.json(result.rows);
        }
        catch (error) { //todo 
            console.error('Error:', error.message);
            res.sendStatus(500);
        }
    }
}
exports.ApiController = ApiController;
