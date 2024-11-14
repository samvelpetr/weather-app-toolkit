import { useEffect, useState } from "react";
import UserLocation from "./TrackLocation";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "../styles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCityWeather } from "../redux/city.slice";

const useStyles = createUseStyles(styles);

const SearchBar: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const classes = useStyles();

    const [inputCity, setInputCity] = useState<string>("");

    const city = useAppSelector((state) => state.city);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (city.city.name) {
            setInputCity(city.city.name);
        } else if (cityName) {
            setInputCity(cityName);
        }
    }, [city, cityName]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCity(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputCity.trim().length === 0) {
            alert("Please enter a city name.");
            return;
        }

        dispatch(getCityWeather(inputCity));
        if (city.city.name) {
            sessionStorage.setItem("currentCity", JSON.stringify(city.city));
            navigate(`/${inputCity}`);
        }
    };

    return (
        <form className={classes.navbar} onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleChange}
                value={inputCity}
                placeholder="Enter City name"
            />
            <button type="submit">Search</button>
            {city.errorMessage && <p>{city.errorMessage}</p>}
            <UserLocation />
            <Link to="/favorites" className={classes.favoritesLink}>
                Favorites
            </Link>
        </form>
    );
};

export default SearchBar;
