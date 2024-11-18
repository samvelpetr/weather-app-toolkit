import React, { useEffect, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "../styles/styles";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getGeoLocation, setCityName } from "../features/userCity.slice";
import { getCityWeather } from "../features/city.slice";

const useStyles = createUseStyles(styles);

const UserLocation: React.FC = memo(() => {
    const { cityName } = useParams<{ cityName: string }>();
    const navigate = useNavigate();

    const userCity = useAppSelector((state) => state.userCity);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    useEffect(() => {
        const data = sessionStorage.getItem("UserCity");
        if (data) dispatch(setCityName(data));
    }, []);

    useEffect(() => {
        if (userCity.cityName) {
            sessionStorage.setItem("UserCity", userCity.cityName);
        }
    }, [userCity.cityName]);

    const changeShowingCity = (name: string) => {
        if (name !== cityName) {
            dispatch(getCityWeather(name));
            navigate(`/${name}`);
        }
    };

    return (
        <div className={classes.trackLocation}>
            {userCity.loading ? (
                <div className={classes.loadingSpinner}></div>
            ) : (
                <button type="button" onClick={() => dispatch(getGeoLocation())}>
                    Detect My City
                </button>
            )}

            {userCity.error && <p style={{ color: "red" }}>{userCity.error}</p>}

            {userCity.cityName ? (
                <button
                    className={classes.greenButton}
                    type="button"
                    onClick={() => changeShowingCity(userCity.cityName as string)}
                >
                    {userCity.cityName}
                </button>
            ) : (
                <p>Location not available</p>
            )}
        </div>
    );
});

export default UserLocation;
