import {EstateInterface} from "../interfaces/estate-interface";
import axios from 'axios';

export class SrealityApiService {
    static async getRows(limit: number){
        const url = `https://www.sreality.cz/api/en/v2/estates?per_page=${limit}&page=1`;
        const response = await axios.get(url);
        const responseData = response.data;
        const estates = responseData._embedded.estates.slice(0, 500);
        const itemsToInsert = [];
        for (const estate of estates) {
            const estateData: EstateInterface = {
                hash_id: estate.hash_id,
                name: estate.name,
                image_link: estate._links.images[0].href // todo inputDto class
            };
            itemsToInsert.push(estateData);
        }
        return itemsToInsert;
    }
}