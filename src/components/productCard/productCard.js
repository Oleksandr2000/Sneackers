import React from 'react';
import {useState} from 'react';
import { AppContext } from '../../App';
import Skeleton from '../Skeleton/Skeleton';
import './productCard.scss';

const ProductCard  = ({ id,
                        title,
                        price,
                        logo,
                        onFavorite,
                        onPlus,
                        onRemove,
                        isFavorite = false,
                        isChecked = false,
                        loading = false}) => {
    
    
    const {isItemAded} = React.useContext(AppContext);
    const [favorite, setFavorite] = useState(isFavorite); 

    const onClickPlus = () => {
        onPlus({id, title, price, logo});
    }

    const onClickFavorite = () => {
        setFavorite(!favorite);
        onFavorite({id, title, price, logo});
    }


    return (
        <div className="productCard">
            {loading ? <Skeleton/> : <>
                <img src={favorite ? '/img/heart-liked.jpg' : '/img/heart-unliked.svg'} 
                    alt='like'
                    className='like' 
                    onClick={onClickFavorite}/>
                <img src={logo} alt="logo" />
                <h4>{title}</h4>
                <div className='productCard-buy'>
                    <div className="productCard-price">
                        <span>Цена</span>
                        {price}
                    </div>
                    <img className='check-btn' src={isItemAded(id) ? '/img/checked.svg' : '/img/un-checked.svg'} alt="checked" onClick={onClickPlus}/>
                </div>    </>}
                            
        </div>
    )
}

export default ProductCard;