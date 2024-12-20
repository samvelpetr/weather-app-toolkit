import { createSlice } from "@reduxjs/toolkit";

interface state {
    cities: string[]
}

const initialState:state = {
    cities: []
} 

export const isCityFavoriteSelector = (state:state, city:string) => state.cities.includes(city);


const FavoriteSlice = createSlice({
    name: "favoriteCities",
    initialState,
    reducers: {
        addCity: (state, action) => {
            state.cities.push(action.payload);
        },
        removeCity: (state, action) => {
            state.cities =  state.cities.filter(elm => elm != action.payload);
        }
    },

});
export const favoriteReducer = FavoriteSlice.reducer;
export const {addCity, removeCity} = FavoriteSlice.actions;