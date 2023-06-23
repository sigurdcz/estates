"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sreality_import_usecase_1 = require("../usecases/sreality-import-usecase");
dotenv_1.default.config();
class ImportController {
    static async update(req, res) {
        console.log(" UPDATE REQUEST ");
        await sreality_import_usecase_1.SrealityImportUsecase.importAndUpdate().then(() => {
            console.log('Database was update');
        }).catch((error) => {
            console.error({ UpdateError: error });
        });
        res.sendStatus(200);
    }
}
exports.ImportController = ImportController;
