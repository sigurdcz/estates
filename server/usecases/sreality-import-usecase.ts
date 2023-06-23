import {SrealityApiService} from "../services/sreality-api-service";
import {DatabaseService} from "../services/database-service";

export class SrealityImportUsecase {
    public static async importAndUpdate(limit: number = 500) {
        await new DatabaseService().insertEstates(
            await SrealityApiService.getRows(limit)
        );
    }
}