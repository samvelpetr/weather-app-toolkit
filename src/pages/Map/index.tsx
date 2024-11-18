import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCityWeather } from "../../features/city.slice";
import { API_KEY } from "../../data/apiInfo";

const WeatherMap: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const [cityCoordinates, setCityCoordinates] = useState<number[] | null>(null);
    const city = useAppSelector((state) => state.city);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (cityName !== city.city.name) {
            dispatch(getCityWeather(cityName as string));
        } else if (city.city.coord) {
            setCityCoordinates([city.city.coord.lat, city.city.coord.lon]);
        }
    }, [city, cityName]);

    return cityCoordinates ? (
        <MapContainer center={cityCoordinates} zoom={12} style={{ height: "800px", width: "100%" }}>
            <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />
        </MapContainer>
    ) : (
        <p>Loading map...</p>
    );
};

export default WeatherMap;
