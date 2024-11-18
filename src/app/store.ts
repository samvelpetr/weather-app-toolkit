import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { favoriteReducer } from "../features/favorite.slice";
import { cityReducer } from "../features/city.slice";
import { userCityReducer } from "../features/userCity.slice";
import { forecastReducer } from "../features/forecast.slice";



const rootReducer = combineReducers({
  favorite: favoriteReducer,
  city: cityReducer,
  userCity: userCityReducer,
  forecast: forecastReducer
});
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  })
  setupListeners(store.dispatch);
  return store;
}

export const store = makeStore();

export type AppStore = typeof store;

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>