import './Product.css';
import { useEffect, useState } from 'react'
import add from '../../images/add.svg';
import { useNavigate } from 'react-router-dom';
import ProductNavBlock from '../ProductNavBlock/ProductNavBlock';
import Rating from '../Rating/Rating';
import AddCount from '../AddCount/AddCount';
import { useSelector, useDispatch } from 'react-redux';
import apiMain from '../../http/ApiMain'
import { setCurrentProduct } from '../../store/redusers/productReduser';
import { baseUrl } from '../../utils/constatns';
import apiAdmin from '../../http/ApiAdmin';
import { getBrand } from '../../store/redusers/brandReduser';
import { getType } from '../../store/redusers/typeReduser';
import { getMaterial } from '../../store/redusers/materialReduser';
import { setIsOpen, setMessage } from '../../store/redusers/popupReduser';

function Product() {

    const dispatch = useDispatch()
    const productId = useSelector(state => state.product.currentProductId)
    const product = useSelector(state => state.product.currentProduct)
    const currentUser = useSelector(state => state.user.currentUser)

    const brand = useSelector(state => state.brand.brand)
    const type = useSelector(state => state.type.type)
    const material = useSelector(state => state.material.material)
    useEffect(() => {
        apiMain.getProductById(productId).then(res => {
            dispatch(setCurrentProduct(res))
        })
    }, [])

    useEffect(() => {
        if (product.id !== 0) {

            apiAdmin.getOneBrand(product.brandId).then(res => {
                dispatch(getBrand(res))
            })
            apiAdmin.getOneType(product.typeId).then(res => {

                dispatch(getType(res))
            })
            apiAdmin.getOneMaterial(product.materialId).then(res => {

                dispatch(getMaterial(res))
            })
        }
    }, [product])

    console.log(product.rating)
    const navigate = useNavigate();

    const [isAdd, setIsAdd] = useState(false)
    const imgLink = `${baseUrl}/static/${product.img}`;
    const [count, setCount] = useState(1)

    const hendleCountPlus = () => {
        setCount(count + 1)
    }

    const hendleCountMinus = () => {
        if (count > 1) setCount(count - 1)
        else setCount(1)
    }

    const hendleAddBascet = () => {
        if (!currentUser.id) {
            dispatch(setIsOpen(true))
            dispatch(setMessage('Авторизуйтесь, что бы добавлять товар в корзину'))
        }
        else {
            const formData = new FormData()
            formData.append('userId', currentUser.id)
            formData.append('productId', productId)
            formData.append('count', count)
            apiMain.createBasketProduct(formData).then(res => {if (res) {
                dispatch(setIsOpen(true))
                dispatch(setMessage('Товар успешно добавлен в корзину'))
            }}).catch((err)=>{
                dispatch(setIsOpen(true))
                dispatch(setMessage('Не удалось добавить товар в корзину'))
            })
        }
    }

    const addmessage = isAdd ? 'product__addmessage-container' : 'product__addmessage-container  product__addmessage-container_inactiv'
    return <>
        <div className={addmessage}>
            <div className='product__addmessage-block'>
                <img className='product__addmessage-img' src={add} alt='добавить' />
                <p className='product__addmessage-message'>Товар успешно добавлен в корзину</p>
            </div>
            <button className='product__viewbasket' onClick={() => navigate('/basket')}>Перейти в корзину</button>
        </div>
        <div className='product__container'>
            <div className='product__img-container'>
                <img src={imgLink} className='product__img-container-item' alt={product.name} crossOrigin="anonymous" />
                <img src={imgLink} className='product__img-container-item' alt={product.name} crossOrigin="anonymous" />
                <img src={imgLink} className='product__img-container-item' alt={product.name} crossOrigin="anonymous" />
                <img src={imgLink} className='product__img-container-item' alt={product.name} crossOrigin="anonymous" />
            </div>
            <div className='product__img-main-block'>
                <img src={imgLink} className='product__img-main' alt={product.name} crossOrigin="anonymous" />
            </div>
            <div className='product__description-block'>
                <h2 className='product__title'>{product.name}</h2>
                <p className='product__price'>{product.price}</p>
                <Rating rating={product.rating} />
                <p className='product__description'>{product.description}</p>
                <div className='product__addinbasket-block'>
                    <AddCount count={count}
                        hendleCountPlus={hendleCountPlus}
                        hendleCountMinus={hendleCountMinus}
                    />
                    <button className='product__addbacset-button' onClick={hendleAddBascet}>Добавить а корзину</button>
                </div>
                <p className='product__category' >Категория: {type.name}</p>
                <p className='product__brand' >Производитель: {brand.name}</p>
                <p className='product__brand' >Материал: {material.name}</p>
            </div>
        </div>
        <ProductNavBlock description={product.description} />
    </>
}

export default Product