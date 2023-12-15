import './BasketProduct.css';
import AddCount from '../AddCount/AddCount';
import close from '../../images/close.svg';
import { baseUrl } from '../../utils/constatns';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiMain from '../../http/ApiMain';
import { setUserBasketProducts, setLoading } from '../../store/redusers/productReduser';

function BasketProduct({ product, totalPrice, changeTotalPrise }) {

    const imgLink = `${baseUrl}/static/${product.img}`;

    const currentUser = useSelector(state => state.user.currentUser)
    const userBasketProduct = useSelector(state => state.product.userBasketproducts)
    const dispatch = useDispatch()

    const hendleCountPlus = () => {
        const count = ++product.count
        const params = new URLSearchParams()
        params.append('userId', currentUser.id)
        params.append('productId', product.id)
        params.append('count', count)
        apiMain.changeCountBasketProduct(params).then(res => {
            changeTotalPrise(totalPrice + product.price)
        })
    }

    const hendleCountMinus = () => {
        if (product.count > 1) {
            const count = --product.count
            const params = new URLSearchParams()
            params.append('userId', currentUser.id)
            params.append('productId', product.id)
            params.append('count', count)
            apiMain.changeCountBasketProduct(params).then(res => {
                changeTotalPrise(totalPrice - product.price)
            })
        }
    }

    const hendleDelete = () => {
        const params = new URLSearchParams()
        params.append('userId', currentUser.id)
        params.append('productId', product.id)
        apiMain.deleteBasketProduct(params).then(res =>{
            if(res)dispatch(setUserBasketProducts(userBasketProduct.filter(el => el.id !== product.id)))})
    }

    return (<div className="basketproduct__container">
        <img className="basketproduct__img" crossOrigin="anonymous" src={imgLink} alt={product.name} />
        <div className="basketproduct__title-container">
            <h3 className="basketproduct__title">{product.name}</h3>
            <p className="basketproduct__price">{product.price}</p>
        </div>
        <AddCount count={product.count}
            hendleCountPlus={hendleCountPlus}
            hendleCountMinus={hendleCountMinus} />
        <img onClick={hendleDelete} className="basketproduct__delete" src={close} alt="удалить" />
    </div>)
}

export default BasketProduct