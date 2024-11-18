import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "../styles/styles";
import { useAppDispatch } from "../app/hooks";
import { removeCity } from "../features/favorite.slice";

interface IProps {
    cityData: string;
}

const useStyles = createUseStyles(styles);

const FavoriteCityItem: React.FC<IProps> = ({ cityData }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    return (
        <div className={classes.favoriteCityItem}>
            <Link to={"/" + cityData}>{cityData}</Link>
            <button onClick={() => dispatch(removeCity(cityData))}>Remove from Favorites</button>
        </div>
    );
};
export default FavoriteCityItem;
