import { Route, Routes } from "react-router-dom";
import SearchBar from "./pages/Searchbar";
import WeatherCard from "./pages/WeatherCard";
import Forecast from "./pages/Forecast/index";
import WeatherMap from "./pages/Map/index";
import FavoriteCities from "./pages/Favorite/index";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
    return (
        <>
            <Provider store={store}>
                <SearchBar />
                <Routes>
                    <Route>
                        <Route path="/:cityName" element={<WeatherCard />} />
                        <Route path="/:cityName/week" element={<Forecast />} />
                        <Route path="/:cityName/map" element={<WeatherMap />} />
                        <Route path="/favorites" element={<FavoriteCities />} />
                    </Route>
                </Routes>
            </Provider>
        </>
    );
}

export default App;
