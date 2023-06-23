"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SrealityApiService = void 0;
const axios_1 = __importDefault(require("axios"));
class SrealityApiService {
    static async getRows(limit) {
        const url = `https://www.sreality.cz/api/cs/v2/estates?per_page=${limit}&page=1`;
        const response = await axios_1.default.get(url);
        const responseData = response.data;
        const estates = responseData._embedded.estates.slice(0, 500);
        const itemsToInsert = [];
        for (const estate of estates) {
            const estateData = {
                hash_id: estate.hash_id,
                name: estate.name,
                image_link: estate._links.images[0].href // todo inputDto class
            };
            itemsToInsert.push(estateData);
        }
        return itemsToInsert;
    }
}
exports.SrealityApiService = SrealityApiService;
