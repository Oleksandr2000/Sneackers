import Form from '../Form'
import './Drawer.scss'

const Drawer = ({onCloseCart, items=[], onRemove, PostOrderData, orderOk, onCloseOrder, total, registry, onRegistry, orderError}) => {

    const PriceList = () => {
        return (
            <ul className='priceList'>
                    <li className='price'>
                    <span>Итого</span>
                    <div className=""></div>
                    <b>{total} грн.</b>
                    </li>
                    <li className='tax'>
                    <span>ПДВ 18%</span>
                    <div className=""></div>
                    <b>{Math.floor(total/100*18)} грн.</b>
                    </li>
                    <button onClick={onRegistry}>Оформить заказ</button>
                </ul>
        )
    }

    const CartProduct = () => {
        return (
                items.map((obj, index) => (
                    <div className="cartItem" key={index}>
                        <img src={obj.logo}
                            alt="logo"
                            width={70}
                            height={70}
                        />
                        <div className="">
                            <p>{obj.title}</p>
                            <b>{obj.price}</b>
                        </div>
                        <img  src="/img/btn-remove.svg"
                            alt="remove"
                            className='removeBtn'
                            width={32}
                            height={32} 
                            onClick={() => {
                                onRemove(obj.id)
                                }
                            }/>         
                </div>
            ))
        )
    }

    const CartEmpty = () => {
        return (
            <div className='empty-cart'>
                <img src="/img/emptyBasket.jpg" alt="basket"/>
                <h3>Корзина пустая</h3>
                <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                <button onClick={onCloseCart}>Вернуться назад</button>
            </div>
        )
    }

    // const Order = () => {
    //     return(
    //         <div className='order'>
    //             <form name='main'>
    //                 <input type="text" name='Name' placeholder='Введите свое имя'/>
    //                 <input type="text" name='Surame' placeholder='Введите свою фамилию'/>
    //                 <input type="text" name='phone' placeholder='Введите свой номер телефона'/>
    //                 <select name="method">
    //                     <option>Способ доставки</option>
    //                     <option>Нова Пошта</option>
    //                     <option>JUSTIN</option>
    //                     <option>Укрпошта</option>
    //                 </select>
    //                 <input type="text" name='city'  placeholder='Город доставки'/>
    //                 <input type="text" name='adress' placeholder='Номер отделения' />
    //                 <select name="payment">
    //                     <option>Cпособ оплаты</option>
    //                     <option>Оплата на карту</option>
    //                     <option>Наличными при получении</option>
    //                 </select>
                    
    //                 <button onClick={PostOrderData}>Оформить заказ</button>
    //             </form>
    //         </div>
    //     )
    // }

    const OrderIsProcessed = () => {
        return (
            <div className='orderOk'>
                <img src="/img/ok.png" alt="ok" />
                <h3>Заказ оформлен</h3>
                <p>Скоро с вами свяжеться менеджер для внесения предоплаты и подтверждения заказа.</p>
                <button onClick={onCloseOrder}> Вернуться к покупкам </button>
            </div>
        )
    }

    const OrderIsFailure = () => {
        return(
            <div className='orderFailure'>
                <img src="/img/error.png" alt="ok" />
                <h3>Произошла ошибка</h3>
                <p>Попробуйте позже</p>
                <button onClick={onCloseOrder}> Вернуться к покупкам </button>
            </div>
        )
    }

    return (
        <>
            <div className='overlay'>
                <div className="drawer">
                    <div>
                        <h2>
                            Корзина <img  src="/img/btn-remove.svg"
                                        alt="remove"
                                        className='removeBtn'
                                        width={32}
                                        height={32}
                                        onClick={onCloseCart} />
                        </h2>
                    </div>
                    <div className='cartList'>
                        
                         {orderError ? <OrderIsFailure/> : orderOk ? <OrderIsProcessed/> : registry ? <Form PostOrderData={PostOrderData} items={items}/> : items.length > 0 ? <><CartProduct/> <PriceList/></> : <CartEmpty/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Drawer;