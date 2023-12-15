import './Basket.css';
import BasketProduct from '../BasketProduct/BasketProduct';
import { useCallback, useEffect, useState } from 'react';
import apiMain from '../../http/ApiMain';
import { useSelector, useDispatch } from 'react-redux';
import { setUserBasketProducts, setLoading } from '../../store/redusers/productReduser';
import Loader from '../Loader/Loader';

function Basket() {

    const dispatch = useDispatch()

    const [products, setProducts] = useState([])
    const currentUser = useSelector(state => state.user.currentUser)
    const userBasketProduct = useSelector(state => state.product.userBasketproducts)
    const isLoading = useSelector(state => state.product.loading)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        apiMain.getAllBasketProduct(currentUser.id).then(res => {
            dispatch(setUserBasketProducts(res[0]))
        })

    }, [])

    const changeTotalPrise = (value) => {
        setTotalPrice(value)
    }
    const setTotalPrise = useCallback(() => {

        if (userBasketProduct.length !== 0) {
            let totalPrice = 0
            userBasketProduct.forEach((el) => totalPrice += (el.price * el.count))
            setTotalPrice(totalPrice)
        }
    }, [userBasketProduct])

    useEffect(() => {
        setTotalPrise()
    }, [userBasketProduct])

   

    return (<>
        {isLoading ? <Loader /> :
            <section className='basket__container'>
                <h1 className='basket__title'>Корзина</h1>
                <ul className='basket__list'>
                    {userBasketProduct.map(el =>
                        <li className='basket__list-elem' key={el.id}>
                            <BasketProduct product={el}
                                totalPrice={totalPrice}
                                changeTotalPrise={changeTotalPrise}
                                 />
                        </li>
                    )
                    }
                </ul>
                <div className='basket__total-container'>
                    <p className='basket__total'>Всего товаров на сумму</p>
                    <p className='basket__total-sum'>{totalPrice}</p>
                </div>
            </section>}</>)
}
export default Basket