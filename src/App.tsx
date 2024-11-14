import { Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import WeatherMap from "./components/WeatherMap";
import FavoriteCities from "./components/FavoriteCities";
import { Provider } from "react-redux";
import { store } from "./redux/store";

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
