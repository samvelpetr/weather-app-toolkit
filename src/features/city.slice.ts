import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ICity, ICod } from "../models/types"
import axios from "axios"
import { API_KEY } from "../data/apiInfo"

interface state {
    city:ICity,
    loading: boolean,
    errorMessage:string
}

const initialState:state = {
    city:{} as ICity,
    loading:false,
    errorMessage: ""
}


export const getCityWeather = createAsyncThunk("city/getCityWeather", async (cityName: string):Promise<ICity> => {
    const localData = sessionStorage.getItem("currentCity");
    if (localData) {
        const localCity: ICity = JSON.parse(localData);
        if (localCity && localCity.name === cityName) {
            return localCity;
        }
    }
    const data = await axios.get("https://api.openweathermap.org/data/2.5/weather" as string, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric',
        },
    });
    
    const cityData: ICity = {
        id: data.data.id as number,
        name: data.data.name as string,
        wind: data.data.wind.speed as number,
        temp: data.data.main.temp as number,
        feelTemp: data.data.main.feels_like as number,
        pressure: data.data.main.pressure as number,
        humidity: data.data.main.humidity as number,
        sunrise: data.data.sys.sunrise as number,
        sunset: data.data.sys.sunset as number,
        coord: data.data.coord as ICod,
        weatherType: {
          main: data.data.weather[0].main as string,
          icon: data.data.weather[0].icon as string,
        },
      };      
    return cityData;
});
  



const CityClice = createSlice({
    name: "city",
    initialState,
    reducers: {},   
    extraReducers: builder => {
        builder.addCase(getCityWeather.fulfilled, (state, action) => {
            state.loading = false;
            state.city = action.payload;
            state.errorMessage = "";
        })
        .addCase(getCityWeather.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCityWeather.rejected, (state, action) => {            
            state.loading = false;
            if(action.error.message) {
               state.errorMessage =  action.error.message
            }
        }
    )
    }
})

export const cityReducer = CityClice.reducer;