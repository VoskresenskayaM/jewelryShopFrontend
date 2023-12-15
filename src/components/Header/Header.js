import './Header.css';
import Logo from '../Logo/Logo';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import basket from '../../images/basket.svg';
import account from '../../images/account.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setIsAuth, getAllLikes } from '../../store/redusers/userReduser';

function Header() {
    const currentUser = useSelector(state => state.user.currentUser)
    const isAuth = useSelector(state => state.user.isAuth)

    const dispatch = useDispatch()
    const hendleUserExit = () => {
        dispatch(setIsAuth(false))
        dispatch(setCurrentUser({ email: '', role: '' }))
        dispatch(getAllLikes([]))
        localStorage.removeItem('token')
        localStorage.removeItem('isSaved')
    }
    return (
        <header className="header">
            <Logo />
            <div className="header__menu-contaner">
                <nav className="header__menu">
                    {currentUser.role === 'Admin' ?
                        <ul className="header__menu-list">
                            <li><Link className='header__menu-elem' to="/admin">Админ панель</Link></li>
                            <li><Link className="header__menu-elem" to="/shop">Магазин</Link></li>
                            <li><Link className="header__menu-elem" to="/about">О нас</Link></li>
                        </ul> :
                        <ul className="header__menu-list">
                            <li><Link className="header__menu-elem" to="/shop">Магазин</Link></li>
                            <li><Link className="header__menu-elem" to="/about">О нас</Link></li>

                        </ul>}
                </nav>
                <div className="header__account-block">
                    <Link to="/basket"><img className="header__basket-elem" src={basket} alt="корзина" /></Link>
                    {!isAuth ? <Link to="/login"><img className="header__account-elem" src={account} alt="аккаунт" /></Link> :
                        <Link className='header__menu-elem  header__menu-elem_exit' to="/shop" onClick={hendleUserExit}>Выйти</Link>}
                </div>
            </div>
        </header>
    );
}

export default Header;
