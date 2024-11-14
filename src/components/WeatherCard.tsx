import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "../styles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCity, removeCity } from "../redux/favorite.slice";
import { getCityWeather } from "../redux/city.slice";
import { IMAGE_URL, IMAGE_URL_END } from "../apiInfo";
import Links from "./Links";

const useStyles = createUseStyles(styles);

const WeatherCard: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const city = useAppSelector((state) => state.city);
    // const favorites = useAppSelector((state) => state.favorite);

    useEffect(() => {
        dispatch(getCityWeather(cityName as string));
    }, [cityName]);

    return !city.city.name ? (
        <p>loading...</p>
    ) : (
        <>
            <div className={classes.weatherCard}>
                <h1>{city.city.name}</h1>

                <div>
                    <div className="left-side">
                        <h3>{city.city.temp}°C</h3>
                        <h4>Feels like: {city.city.feelTemp}°C</h4>
                        <p>
                            Sunrise - {new Date((city.city.sunrise as number) * 1000).getHours()}:
                            {new Date((city.city.sunrise as number) * 1000).getMinutes()}
                        </p>
                        <p>
                            Sunset - {new Date((city.city.sunset as number) * 1000).getHours()}:
                            {new Date((city.city.sunset as number) * 1000).getMinutes()}
                        </p>
                        <p className="weather-type">
                            Weather Type - {city.city.weatherType.main}
                            <img src={IMAGE_URL + city.city.weatherType.icon + IMAGE_URL_END} />
                        </p>
                        <p>
                            Wind speed - <span>{city.city.wind}</span> meter/sec
                        </p>
                        <p>
                            Humidity - <span>{city.city.humidity}</span>%
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.favoriteActions}>
                <Links />
            </div>
        </>
    );
};
export default WeatherCard;
