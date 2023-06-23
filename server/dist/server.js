"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const api_controller_1 = require("./controllers/api-controller");
const import_controller_1 = require("./controllers/import-controller");
const sreality_import_usecase_1 = require("./usecases/sreality-import-usecase");
const database_service_1 = require("./services/database-service");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/api/estate', api_controller_1.ApiController.get);
app.post('/api/internal/update', import_controller_1.ImportController.update); // manual update
app.listen(process.env.SERVER_PORT, async () => {
    console.log(`Server has been started http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    await new database_service_1.DatabaseService().waitForDatabase();
    // auto import on start
    sreality_import_usecase_1.SrealityImportUsecase.importAndUpdate().then(() => {
        console.log('Database was update');
    }).catch((error) => {
        console.error({ ManualUpdateError: error });
    });
});
