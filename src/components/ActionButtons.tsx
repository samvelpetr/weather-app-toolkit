import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createUseStyles } from "react-jss";
import styles from "../styles/styles";
import React from "react";
import { addCity, isCityFavoriteSelector, removeCity } from "../features/favorite.slice";

const useStyles = createUseStyles(styles);

export const ActionButtons: React.FC = React.memo(() => {
    const classes = useStyles();

    const city = useAppSelector((state) => state.city);
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector((state) =>
        isCityFavoriteSelector(state.favorite, city.city.name)
    );
    return (
        <>
            {isFavorite ? (
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
export default ActionButtons;
