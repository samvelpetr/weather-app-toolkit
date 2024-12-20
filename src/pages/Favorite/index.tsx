import { memo } from "react";
import { createUseStyles } from "react-jss";
import styles from "../../styles/styles";
import { useAppSelector } from "../../app/hooks";
import FavoriteCityItem from "../../components/FavoriteCityItem";

const useStyles = createUseStyles(styles);

const FavoriteCities: React.FC = memo(() => {
    const classes = useStyles();
    const favorites = useAppSelector((state) => state.favorite);

    return (
        <div className={classes.favoriteCities}>
            {favorites.cities.length ? (
                favorites.cities.map((elm) => <FavoriteCityItem key={elm} cityData={elm} />)
            ) : (
                <p className={classes.emptyFavorites}>Favorites is empty...</p>
            )}
        </div>
    );
});
export default FavoriteCities;
