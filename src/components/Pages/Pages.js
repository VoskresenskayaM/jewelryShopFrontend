import './Pages.css';
import { setCurrentPage } from '../../store/redusers/productReduser';
import { useSelector, useDispatch } from 'react-redux';
function Pages() {
    const dispatch = useDispatch()
    const totalCount = useSelector(state => state.product.totalCount)
    const perPage = useSelector(state => state.product.perPage)
    const currentPage = useSelector(state => state.product.currentPage)
    const count = Math.ceil(totalCount/perPage)
    const pages=[]

    for (let i = 0; i < count; i++) {
        pages.push(i + 1)
    }

    return (
        <div className='gallery__pages'>
            {pages.map((el, index) => <span
                key={index}
                className={currentPage === el ? 'gallery__page gallery__page_activ' : 'gallery__page'}
                onClick={() => dispatch(setCurrentPage(index + 1))}
            >{el}</span>)}
        </div>


    )
}

export default Pages



