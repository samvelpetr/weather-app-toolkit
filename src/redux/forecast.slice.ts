import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ICityForecastItem } from "../models/types"
import axios from "axios"
import { API_KEY, FORECAST_URL } from "../apiInfo"

interface state {
    cityInfo: ICityForecastItem[][],
    loading: boolean,
    error: string
}

const initialState:state = {
    cityInfo: [],
    loading: false,
    error: ""
}

export const getForecastData = createAsyncThunk("forecast/getForecastData", async (cityName:string) => {
    const data = await axios.get(FORECAST_URL, {
        params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric',
        },
    });
    const formattedData: ICityForecastItem[] = data.data.list.map(
        (item: unknown, index: number) => {
            const elm = item as {
                main: { temp: number };
                dt_txt: string;
                weather: [{ main: string; icon: string }];
                wind: { speed: number };
            };
            return {
                id: index,
                temp: elm.main.temp,
                date: elm.dt_txt,
                weather: {
                    main: elm.weather[0].main,
                    icon: elm.weather[0].icon,
                },
                windSpeed: elm.wind.speed,
            };
        }
    );
    const chunksArr = [];
    for (let i = 0; i < formattedData.length; i += 8) {
        chunksArr.push(formattedData.slice(i, i + 8));
    }
    return chunksArr;

})

const ForecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getForecastData.fulfilled, (state, action) => {
            state.loading = false;
            state.cityInfo = action.payload;
            
        })
        .addCase(getForecastData.pending, (state) => {
            state.loading = true;
        })
        .addCase(getForecastData.rejected, (state, action) => {
            state.loading = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        })
    }
})

export const forecastReducer = ForecastSlice.reducer;