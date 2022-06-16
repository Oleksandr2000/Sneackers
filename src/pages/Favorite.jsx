import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/productCard/productCard";
import { AppContext } from "../App";

function Favorite({onAddToFavorite, onPlus}) {

    const {favorites} = React.useContext(AppContext)

    const FavoriteList = () => {
        return (
            <div>
                <h1>Мои закладки:</h1>
                <div className="listItem">
                        {favorites.map((item, index) => ( <ProductCard 
                                                                    key = {index}
                                                                    isFavorite = {true}
                                                                    onFavorite = {onAddToFavorite}
                                                                    onPlus = {onPlus}
                                                                    {...item}
                                                                    />
                        ))}
                </div>
            </div>
        )
    }

    const EmptyFavorite = () => {
        return (
            <div className="empty-favoriteList">
                <img src="/img/smile.jpg" alt="smile" />
                <h2>У вас нет закладок</h2>
                <p>Нажмите на лайк для добавления товара в закладки</p>
                <Link to='/'>
                    <button>Вернуться назад</button>
                </Link>
            </div>
        )
    }

    return (
        <div className="favoriteBlock">
            {favorites.length > 0 ? <FavoriteList/> : <EmptyFavorite/>}
        </div>
    )
}

export default Favorite;