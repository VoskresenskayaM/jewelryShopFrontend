import './Card.css'
import basket from '../../images/basket.svg';
import eye from '../../images/eye.svg';
import heart from '../../images/heart.svg';
import goldHeart from '../../images/goldHeart.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiMain from '../../http/ApiMain';
import { useSelector, useDispatch } from 'react-redux';
import { setLikeInStore, deleteLikesInStore } from '../../store/redusers/userReduser';
import { setIsOpen, setMessage } from '../../store/redusers/popupReduser';
import { setCurrentProductId } from '../../store/redusers/productReduser';
import { baseUrl } from '../../utils/constatns';

function Card({ card, isShop, isLike }) {

    const currentUser = useSelector(state => state.user.currentUser)
    const allLikes = useSelector(state => state.user.likes)
    const productId = useSelector(state => state.product.currentProductId)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const imgLink = `${baseUrl}/static/${card.img}`;

    const [isSale, setIsSale] = useState(false)
    const [isSold, setIsSold] = useState(true)

    const hendleAddInBasket = () => {
        if (!currentUser.id) {
            dispatch(setIsOpen(true))
            dispatch(setMessage('Авторизуйтесь, что бы добавлять товар в корзину'))
        }
        else {
            const formData = new FormData()
            formData.append('userId', currentUser.id)
            formData.append('productId', productId)
            formData.append('count', 1)
            apiMain.createBasketProduct(formData).then(res => {
                if (res) {
                    dispatch(setIsOpen(true))
                    dispatch(setMessage('Товар успешно добавлен в корзину'))
                }
            }).catch((err) => {
                dispatch(setIsOpen(true))
                dispatch(setMessage('Не удалось добавить товар в корзину'))
            })
        }
    }

    const hendleShowProduct = () => {
        navigate('/product')
        dispatch(setCurrentProductId(card.id))
    }

    const hendleLike = () => {
        if (!currentUser.id) {
            dispatch(setIsOpen(true))
            dispatch(setMessage('Авторизуйтесь, что бы отмечать понравившийся товар'))
        }
        else {
            const params = new URLSearchParams()
            params.append('userId', currentUser.id)
            params.append('productId', card.id)
            if (isLike) {
                apiMain.deleteLike(params).then(res => {
                    dispatch(deleteLikesInStore(card.id))
                }).catch(err => console.log(err))
            }
            else {
                apiMain.setLike(params).then(res => dispatch(setLikeInStore(res))).catch(err => console.log(err))
            }
        }
    }

    const islikeClass = isLike ? 'card__islike' : 'card__islike  card__islike_inactiv';
    const isSaleClass = isShop && isSale ? 'card__isSale' : 'card__isSale  card__isSale_inactiv';
    const isSoldClass = isShop && isSold ? 'card__isSold' : 'card__isSold  card__isSold_inactiv';
    const container = isShop ? 'card__container  card__shop-container' : 'card__container';
    const list = isShop ? 'card__img-list   card__shop-img-list' : 'card__img-list ';
    const img = isShop ? 'card__img  card__shop-img' : 'card__img';

    return (
        <div className={container}>
            <img className={islikeClass} src={goldHeart} alt='like' />
            <p className={isSaleClass}>-21%</p> {/*получать с сервера скидки*/}
            {/*<div className={isSoldClass}>Sold out</div>{/*получать с сервера скидки количество товара*/}
            {isShop ? <ul className={list}>
                <li className='card__img-list-item'><img className='card__basket' src={basket} alt='корзина' onClick={hendleAddInBasket} /></li>
                <li className='card__img-list-item'><img className='card__popup' src={eye} alt='глаз' onClick={hendleShowProduct} /></li>
                <li className='card__img-list-item'><img className='card__like' src={heart} alt='сердце' onClick={hendleLike} /></li>
            </ul> : <div></div>}
            <img className={img} crossOrigin="anonymous" src={imgLink} alt='украшение' />
            <h3 className='card__title'>{card.name}</h3>
            <p className='card__price'>{card.price}</p>
        </div>
    )
}

export default Card