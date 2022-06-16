import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import AppHeader from './components/appHeader/appHeader';
import Drawer from './components/drawer/Drawer';
import Home from './pages/Home';
import Favorite from './pages/Favorite';

export const AppContext = React.createContext({});

function App() {

  const [cart, setCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderOk, setOrderOk] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [registry, setRegistry] = useState(false);

  useEffect(() => {

     async function fetchData() {
      
      // const cartItemsRes = await axios.get('https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/cart');
      //const favoriteRes = await axios.get('https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/favorite');
      const itemsRes = await axios.get('https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/items');
      
      setIsLoading(false);
      // setCartItems(cartItemsRes.data);
      // setFavorites(favoriteRes.data);
      setProduct(itemsRes.data);
     }

     fetchData();
  }, [])

  console.log(favorites);
  console.log(product)

  const isItemAded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  const onOpenCart = () => {
    setCart(true);
  }

  const onCloseCart = () => {
    if(orderOk || registry || orderError){
      setOrderOk(false);
      setRegistry(false);
      setCartItems([]);
    }
    setCart(false)
  }

  const onAddToCart = (obj) => {
    try {
      if(cartItems.find(item => item.title === obj.title)) {
        axios.delete(`https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/cart/${obj.title}`);
        setCartItems(prev => [...prev.filter((item) => item.title !== obj.title)])
      } else {
        // axios.post('https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
      }
      
    }
    catch {
      console.log('error in cart');
    }
  }

  const onAddToFavorite =  async (obj) => {
    try {
      if(favorites.find(fawObj => fawObj.title === obj.title )) {
        axios.delete(`https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/favorite/${obj.id}`);
        setFavorites(prev => [...prev.filter((item) => item.title !== obj.title)])
      } else {
        const {data} = await axios.post('https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/favorite', obj);
        setFavorites(prev => [...prev, data])
      }
    }
    catch (error) {
      console.log('не удалось добавить в закладки')
    }
    
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const onRemoveCartItem = (id) => {
    axios.delete(`https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/cart/${id}`);
    setCartItems(prev => [...prev.filter(item => item.id !== id)])
  }

  const total = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onRegistry = () => {
    setRegistry(true);
  }
  const PostOrderData = () => {

    setOrderOk(true)
    setRegistry(false);
    setCartItems([])

  }

  const onCloseOrder = () => {
    onCloseCart();
    setOrderOk(false);
    
}

  return (

   <AppContext.Provider value={{product, cartItems, favorites, isItemAded}}>
      <div className='container'>
      {cart ? <Drawer onCloseCart={onCloseCart} 
                      items={cartItems} 
                      onRemove={onRemoveCartItem}
                      PostOrderData={PostOrderData}
                      orderOk={orderOk}
                      onCloseOrder={onCloseOrder}
                      total={total}
                      registry={registry}
                      onRegistry={onRegistry}
                      orderError={orderError}
                      /> : null}
      
            <AppHeader onOpenCart={onOpenCart}
                       cartItems={cartItems}
                       total={total}/>
            <hr />
          <Routes>
            <Route path='/' element={
              <Home  searchValue={searchValue}
                  cartItems={cartItems}
                  onChangeSearchInput={onChangeSearchInput}
                  setSearchValue={setSearchValue}
                  product={product}
                  onAddToFavorite={onAddToFavorite}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}/>
              }/>
            <Route path='/favorites' element={<Favorite onAddToFavorite={onAddToFavorite}
                                                        onPlus={onAddToCart}/>}/>
          </Routes>
    </div>
   </AppContext.Provider>
  );
}

export default App;
