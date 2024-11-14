import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "../styles";
import ForecastItem from "./ForecastItem";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getForecastData } from "../redux/forecast.slice";

const useStyles = createUseStyles(styles);
const Forecast: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const forecastData = useAppSelector((state) => state.forecast);

    useEffect(() => {
        dispatch(getForecastData(cityName as string));
    }, [cityName]);

    return forecastData.error ? (
        <p>{forecastData.error}</p>
    ) : (
        <div className={classes.container}>
            {forecastData.cityInfo.length ? (
                forecastData.cityInfo.map((chunk, index) => (
                    <ForecastItem items={chunk} key={index} />
                ))
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
};

export default Forecast;
