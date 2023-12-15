import './Main.css';
import { useEffect, useState } from 'react'
import Promo from '../Promo/Promo';
import Gallery from '../Gallery/Gallery';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading } from '../../store/redusers/productReduser';
import apiMain from '../../http/ApiMain';

function Main() {

    const dispatch = useDispatch()
  
    /*useEffect(() => {
        dispatch(setLoading(true))
        apiMain.getProductAll().then(res => {
            dispatch(setProducts(res.rows))
            dispatch(setLoading(false))
        })
    }, [])*/

    return (

        
        <>
            <Promo />
            <Gallery />
        </>
    )
}

export default Main