"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SrealityImportUsecase = void 0;
const sreality_api_service_1 = require("../services/sreality-api-service");
const database_service_1 = require("../services/database-service");
class SrealityImportUsecase {
    static async importAndUpdate(limit = 500) {
        await new database_service_1.DatabaseService().insertEstates(await sreality_api_service_1.SrealityApiService.getRows(limit));
    }
}
exports.SrealityImportUsecase = SrealityImportUsecase;
