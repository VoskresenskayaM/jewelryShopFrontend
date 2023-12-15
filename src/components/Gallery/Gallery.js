import { useEffect, useState } from 'react'
import './Gallery.css';
import Card from '../Card/Card';
import apiMain from '../../http/ApiMain';
import Loader from '../Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading } from '../../store/redusers/productReduser';

function Gallery() {
    const [isAll, setIsAll] = useState(true)
    const dispatch = useDispatch()
    const [mapForPage, setMapForPage] = useState([])
    useEffect(() => {
        dispatch(setLoading(true))
        apiMain.getProductAll().then(res => {
            dispatch(setProducts(res.rows.sort((a,b)=>a.id-b.id)))
            setMapForPage(res.rows)
            dispatch(setLoading(false))
        })
    }, [])

    const isLoading = useSelector(state => state.product.loading)
    const mainMap = (useSelector(state => state.product.products))
    const allLikes =  (useSelector(state => state.user.likes))
    useEffect(() => {
        if (!isAll)  dispatch(setProducts(mapForPage.slice(0,6)))
        else dispatch(setProducts(mapForPage))
    }, [isAll])

    return (<>
        {isLoading ? <Loader /> :
            <section className='gallery__container'>
                <div className='gallery-title-block'>
                    <h2 className='gallery-title'>Новинки</h2>
                    <button className='gallery-button' onClick={() => setIsAll(!isAll)}>{isAll ? 'Свернуть галлерею' : 'Показать все'}</button>
                </div>
                <ul className='gallery__list'>
                    {mainMap.map((el, index, _) =>
                        <li key={el.id}><Card card={el}
                            isShop={false} /></li>
                    )}
                </ul>
            </section>}
    </>
    )
}
export default Gallery