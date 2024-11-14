import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUseStyles } from "react-jss";
import styles from "../styles";
import React from "react";
import { addCity, removeCity } from "../redux/favorite.slice";

const useStyles = createUseStyles(styles);

export const Links: React.FC = React.memo(() => {
    const classes = useStyles();

    const city = useAppSelector((state) => state.city);
    const favorites = useAppSelector((state) => state.favorite);
    const dispatch = useAppDispatch();

    return (
        <>
            {favorites.cities.includes(city.city.name as string) ? (
                <button
                    className={classes.removeFromFavorites}
                    onClick={() => dispatch(removeCity(city.city.name))}
                >
                    Remove from Favorites
                </button>
            ) : (
                <button
                    className={classes.addToFavorites}
                    onClick={() => dispatch(addCity(city.city.name))}
                >
                    Add to Favorites
                </button>
            )}
            <Link to={`/${city.city.name}/week`} className="forecast-link">
                5 Day Forecast
            </Link>
            <Link to={`/${city.city.name}/map`}>Map</Link>
        </>
    );
});
export default Links;
