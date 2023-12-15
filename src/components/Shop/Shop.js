import './Shop.css';
import { cards } from '../../utils/constatns';
import { useEffect, useState } from 'react'
import Card from '../Card/Card';
import search from '../../images/search.svg';
import select from '../../images/select.svg'
import apiMain from '../../http/ApiMain';
import Loader from '../Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading, setCurrentPage, setTotalCount } from '../../store/redusers/productReduser';
import apiAdmin from '../../http/ApiAdmin';
import { getBrands } from '../../store/redusers/brandReduser';
import { getTypes } from '../../store/redusers/typeReduser';
import { getMaterials } from '../../store/redusers/materialReduser';
import { getAllLikes } from '../../store/redusers/userReduser'
import Pages from '../Pages/Pages'

function Shop() {

    const [brand, setBrand] = useState(undefined)
    const [type, setType] = useState(undefined)
    const [material, setMaterial] = useState(undefined)
    const [maxPrice, setMaxPrice] = useState(1000000)//еределать в константу
    const [withDiscount, setWithDiscount] = useState(false)

    const isLoading = useSelector(state => state.product.loading)
    const mainMap = useSelector(state => state.product.products)
    const allLikes = (useSelector(state => state.user.likes))
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)
    /*const totalCount = useSelector(state => state.product.totalCount)*/
    const perPage = useSelector(state => state.product.perPage)
    const currentPage = useSelector(state => state.product.currentPage)
    const brands = useSelector(state => state.brand.brands)
    const types = useSelector(state => state.type.types)
    const materials = useSelector(state => state.material.materials)
    const dispatch = useDispatch()

    const [brandName, setBrandName] = useState(undefined)
    const [typeName, setTypeName] = useState(undefined)
    const [materialName, setMaterialName] = useState(undefined)

    useEffect(() => {
        if (brand) { setBrandName(brands.find(el => el.id === Number(brand)).name) }
        if (type) { setTypeName(types.find(el => el.id === Number(type)).name) }
        if (material) { setMaterialName(materials.find(el => el.id === Number(material)).name) }
    }, [brand, type, material])

    const heandleGetParams = () => {
        const params = new URLSearchParams()
        if (brand !== undefined) params.append('brandId', brand)
        if (type !== undefined) params.append('typeId', type)
        if (material !== undefined) params.append('materialId', material)
        if (perPage !== undefined) params.append('limit', perPage)
        if (currentPage !== undefined) params.append('page', currentPage)
        return params;
    }

    useEffect(() => {
        dispatch(setLoading(true))
        apiMain.getAllProduct(heandleGetParams()).then(res => {
            dispatch(setProducts(res.rows))
            dispatch(setLoading(false))
            dispatch(setTotalCount(res.count))
        })
        apiAdmin.getAllBrands().then(res => dispatch(getBrands(res)))
        apiAdmin.getAllTypes().then(res => dispatch(getTypes(res)))
        apiAdmin.getAllMaterials().then(res => dispatch(getMaterials(res)))
    }, [])

    useEffect(() => {
        if (isAuth) {
            const params = new URLSearchParams()
            params.append('userId', currentUser.id)
            apiMain.getAllUserLikes(params).then(res => dispatch(getAllLikes(res)))
           
        }
        else dispatch(getAllLikes([]))
    }, [isAuth])

    useEffect(() => {
        dispatch(setLoading(true))
        apiMain.getAllProduct(heandleGetParams()).then(res => {
            dispatch(setLoading(false))
            dispatch(setProducts(res.rows))
            dispatch(setTotalCount(res.count))
        })
    }, [currentPage])

    const hendleAdd = (e) => {
        e.preventDefault()
        dispatch(setCurrentPage(1))
        const params = heandleGetParams()
        dispatch(setLoading(true))
        apiMain.getAllProduct(params).then(res => {
            dispatch(setProducts(res.rows))
            dispatch(setLoading(false))
            dispatch(setTotalCount(res.count))
        })
    }

    const hendleResetParams = () => {
        setBrand(undefined)
        setType(undefined)
        setMaterial(undefined)
        setBrandName(undefined)
        setTypeName(undefined)
        setMaterialName(undefined)
        const params = new URLSearchParams()
        dispatch(setLoading(true))
        apiMain.getAllProduct(params).then(res => {
            dispatch(setLoading(false))
            dispatch(setProducts(res.rows))
            dispatch(setTotalCount(res.count))
            dispatch(setCurrentPage(1))
        })
    }

    return (<>
        {isLoading ? <Loader /> :
            <section className='shop__section'>
                <div className='shop__title'>Новинки</div>
                <div className='shop__container'>
                    <form className='shop__form'>
                        <div className='shop__form-filter-block'>
                            <div className='shop__find-input-block'>
                                <button type='submit' className='shop__find-button' onClick={hendleAdd}>Найти</button>
                                <img className='shop__form-input-search' src={search} alt='найти' />
                            </div>
                            <div className='shop__select-block'>
                                <img className='shop__form-select-img' src={select} alt='найти' />
                                <select className='shop__select-product' name="product" onChange={(e) => setType(e.target.value)}  >
                                    <option selected="false" value={undefined} disabled="disabled" >{typeName || 'Тип изделия'}</option>
                                    {types.map(el => <option key={el.id} value={el.id} >{el.name}</option>)}
                                </select>
                            </div>
                            <div className='shop__select-block'>
                                <img className='shop__form-select-img  shop__form-select-img-mat' src={select} alt='найти' />
                                <select className='shop__select-product  shop__select-product-mat' name="material" onChange={(e) => setMaterial(e.target.value)}>
                                    <option selected="false" disabled="disabled" value={undefined}>{materialName || 'Материал'}</option>
                                    {materials.map(el => <option key={el.id} value={el.id} >{el.name}</option>)}
                                </select>
                            </div>
                            <div className='shop__select-block'>
                                <img className='shop__form-select-img  shop__form-select-img-mat' src={select} alt='найти' />
                                <select className='shop__select-product  shop__select-product-mat' name="material" onChange={(e) => setBrand(e.target.value)} >
                                    <option selected='false' disabled="disabled" value={undefined}>{brandName || 'Бренд'}</option>
                                    {brands.map(el => <option key={el.id} value={el.id} >{el.name}</option>)}
                                </select>
                            </div>
                            <input className='shop__range' type="range" min='200' max='100000' name="range" step='100' onChange={e => setMaxPrice(e.target.value)} />
                            <div className='shop__submit-block'>
                                <p className='shop__price'>₽200 - ₽100000</p>
                                <button className='shop__form-submit' onClick={hendleResetParams}>Сбросить параметры</button>
                            </div>
                        </div>
                        <div className='shop__form-onsale-block'>
                            <p className='shop__sale'>Со скидкой</p>
                            <div className='shop__sale-chekbox'>
                                <label htmlFor='toddle' className='shop__lable'>
                                    <input id='toddle' className='shop__toggle-input' type='checkbox' name='isSale' onChange={e => setWithDiscount(e.target.value)} />
                                    <span className='shop__slider'></span>
                                </label>
                            </div>
                        </div>
                    </form>
                    <div>
                        <ul className='shop__gallery'>
                            {mainMap.map((el, index, _) => {
                                let isLike = false
                                if (isAuth) {
                                    allLikes.forEach(like => {
                                        if (like.productId === el.id) isLike = true
                                    })
                                }
                               return <li key={el.id}><Card card={el}
                                isShop={true}
                                isLike={isLike} /></li>}
                            )}
                        </ul>
                        <Pages />
                    </div>

                </div>
            </section>}</>
    )
}
export default Shop