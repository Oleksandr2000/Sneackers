import React from "react";
import ProductCard from "../components/productCard/productCard";

function Home({searchValue,
               setSearchValue, 
               product,
               onChangeSearchInput,
               onAddToFavorite,
               onAddToCart,
               cartItems,
               isLoading}) {

    return (
        <div>
            <div className='search'>
                <h1>{searchValue ? `Поиск: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className='serchPanel'>
                    <input onChange={onChangeSearchInput} type="text" value={searchValue} placeholder='Search...'/>
                    <i class="bi bi-search"></i>
                    {searchValue && <img  src="/img/btn-remove.svg"
                                    alt="clear"
                                    className='clear-input'
                                    width={22}
                                    height={22}
                                    onClick={() => setSearchValue('')}/>}
                </div>
            </div>
            <div className='listItem'>
                {(isLoading ? [...Array(8)] :  product.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())))  
                        .map((item, index) => (
                          <ProductCard 
                                        key = {index}
                                        onFavorite = {(obj ) => onAddToFavorite(item)}
                                        onPlus = {(obj) => onAddToCart(item)}
                                        loading = {isLoading}
                                        {...item}/>
                        ))}
            </div>
      </div>
    )
}

export default Home;