import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "../../styles/styles";
import ForecastItem from "../../components/ForecastItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getForecastData } from "../../features/forecast.slice";

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
