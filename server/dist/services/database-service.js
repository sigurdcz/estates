"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseService {
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });
    }
    async waitForDatabase() {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                this.pool.query('SELECT NOW()', (err) => {
                    if (!err) {
                        clearInterval(interval);
                        resolve();
                    }
                });
            }, 1000); // Interval kontroly dostupnosti databáze (1 sekunda)
        });
    }
    async insertEstate(estateData) {
        const query = `
      INSERT INTO estates (id, name, image_link)
      SELECT $1, $2, $3 WHERE NOT EXISTS (
        SELECT 1 FROM estates WHERE id = $1
      ) RETURNING *
    `;
        const values = [
            estateData.hash_id,
            estateData.name,
            estateData.image_link,
        ];
        await this.pool.query(query, values);
    }
    async insertEstates(estates) {
        for (const estate of estates) {
            await this.insertEstate(estate);
        }
    }
    async getEstates(limit, offset) {
        const query = `SELECT *
                   FROM estates
                   ORDER BY id LIMIT ${limit}
                   OFFSET ${offset}`;
        return await this.pool.query(query);
    }
    async migrateEstateTable() {
        const query = `CREATE TABLE IF NOT EXISTS estates (
        id BIGINT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_link VARCHAR(255) NOT NULL
      );`;
        return await this.pool.query(query);
    }
}
exports.DatabaseService = DatabaseService;
