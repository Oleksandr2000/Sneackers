import './appHeader.scss'
import { Link } from 'react-router-dom';

const AppHeader = ({total, onOpenCart}) => {
    
    return (

        <>
            <div className='header'>
                <div className='header-left'>
                    <Link to='/'>
                        <img src='/img/logo.png' alt='logo'/>
                    </Link>
                    <div className='headerInfo'>
                        <h3>REACT SNEAKERS</h3>
                        <span>Магазин лучших кроссовок</span>
                    </div>
                </div>
                <div className="header-right">
                    <ul>
                        <li onClick={onOpenCart}>
                            <i className="bi bi-cart3"></i>
                            <span>{total}</span>
                        </li>
                        <Link to='/favorites' >
                            <li><i className="bi bi-heart"></i></li>
                        </Link>
                        <li><i className="bi bi-person-circle" width={20} height={20}></i></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AppHeader;