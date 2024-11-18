import { ICityForecastItem } from "../models/types";

export const createChunks = (formattedData:ICityForecastItem[], size:number) => {
    const chunksArr = [];
    for (let i = 0; i < formattedData.length; i += size) {
        chunksArr.push(formattedData.slice(i, i + size));
    }
    return chunksArr;
}