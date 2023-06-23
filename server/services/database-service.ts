import { Pool, QueryResult } from 'pg';
import { EstateInterface } from '../interfaces/estate-interface';
import dotenv from 'dotenv';
dotenv.config();

export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  }

  public async waitForDatabase() {
    return new Promise<void>((resolve, reject) => {  // Add the type argument 'void' to the Promise constructor
      const interval = setInterval(() => {
        this.pool.query('SELECT NOW()', (err: any) => {
          if (!err) {
            clearInterval(interval);
            resolve();
          }
        });
      }, 1000); // Interval kontroly dostupnosti databáze (1 sekunda)
    });
  }
  
  public async insertEstate(estateData: EstateInterface) {
    const query = `
      INSERT INTO estates (id, name, image_link)
      SELECT $1, $2, $3 WHERE NOT EXISTS (
        SELECT 1 FROM estates WHERE id = $1
      ) RETURNING *
    `;
    const values: [string, string, string] = [
      estateData.hash_id,
      estateData.name,
      estateData.image_link,
    ];
    await this.pool.query(query, values);
  }

  public async insertEstates(estates: EstateInterface[]) {
    for (const estate of estates) {
      await this.insertEstate(estate);
    }
  }

  public async getEstates(
    limit: number,
    offset: number
  ): Promise<QueryResult> {
    const query = `SELECT *
                   FROM estates
                   ORDER BY id LIMIT ${limit}
                   OFFSET ${offset}`;
    return await this.pool.query(query);
  }

  public async migrateEstateTable(): Promise<QueryResult> {
    const query = `CREATE TABLE IF NOT EXISTS estates (
        id BIGINT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_link VARCHAR(255) NOT NULL
      );`;
    return await this.pool.query(query);
  }
}
