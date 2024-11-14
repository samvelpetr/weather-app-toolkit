import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, WEATHER_URL } from "../apiInfo";


interface GetCityParams {
    lat: number;
    lon: number;
}
interface state {
    cityName:string,
    loading:boolean,
    error:string
}
const initialState:state = {
    cityName:"",
    loading: false,
    error:""
}


const getCity = createAsyncThunk<string, GetCityParams>(
    "userCity/getCity",
    async ({ lat, lon }: GetCityParams) => {
        
      const cityInfo = await axios.get(WEATHER_URL, {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          appid: API_KEY,
        },
      });
      
      return cityInfo.data.name; 
    }
);
  


const getGeoLocation = createAsyncThunk<string>(
    "userCity/getGeoLocation",
    async (_, { dispatch, rejectWithValue }) => {
        return new Promise<string>((resolve, reject) => {
            if (!navigator.geolocation) {
                return rejectWithValue("Geolocation is not supported by your browser");
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        
                        const response = await dispatch(getCity({ lat: latitude, lon: longitude }));                        
                        if (getCity.fulfilled.match(response)) {
                            
                            resolve(response.payload); 
                        } else {
                            
                            rejectWithValue("Failed to fetch city name");
                        }
                    } catch (error) {
                        
                        reject("Unable to retrieve location");
                    }
                },
                () => {                    
                    reject("Permission denied or unable to retrieve location");
                }
            );
        });
    }
);

const UserCitySlice = createSlice({
    name: "userCity",
    initialState,
    reducers: {
        setCityName: (state, action) => {
            state.cityName = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getCity.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCity.fulfilled, (state, action) => {
            state.loading = false;
            state.cityName = action.payload;
        })
        .addCase(getCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch city name";
        })
        .addCase(getGeoLocation.pending, (state) => {
            state.loading = true;
        })
        .addCase(getGeoLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.cityName = action.payload;
        })
        .addCase(getGeoLocation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Failed to retrieve geolocation";
        });
    }
})

export const userCityReducer = UserCitySlice.reducer;
export const { setCityName } = UserCitySlice.actions;
export { getCity, getGeoLocation };