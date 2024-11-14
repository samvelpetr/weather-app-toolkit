import { createUseStyles } from "react-jss";
import { ICityForecastItem } from "../models/types";
import styles from "../styles";
import { IMAGE_URL, IMAGE_URL_END } from "../apiInfo";

interface IProps {
    items: ICityForecastItem[];
}

const useStyles = createUseStyles(styles);

const ForecastItem: React.FC<IProps> = ({ items }) => {
    const classes = useStyles();

    return (
        <div className={classes.forecastItem}>
            <h3>{items[0].date.substring(5, 10)}</h3>
            {items.map((elm) => (
                <div key={elm.id} className={classes.timeEntry}>
                    <p>
                        <span>Time:</span> {elm.date.substring(11, 16)}
                    </p>
                    <p>
                        <span className={classes.forecastTemp}>Temp:</span> {elm.temp}°C
                    </p>
                    <p>
                        <span>Wind:</span> {elm.windSpeed} meter/sec
                    </p>
                    <p className="weather-type">
                        <span>Weather Type:</span> {elm.weather.main}
                        <img
                            src={IMAGE_URL + elm.weather.icon + IMAGE_URL_END}
                            alt={elm.weather.main}
                        />
                    </p>
                </div>
            ))}
        </div>
    );
};
export default ForecastItem;
