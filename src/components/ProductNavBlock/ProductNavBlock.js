import './ProductNavBlock.css';
import { useState } from 'react';
import Reviews from '../Reviews/Reviews';
import Description from '../Description/Description';

function ProductNavBlock({description}) {
    const [isDescription, setIsDescription] = useState(true)
    const desc = isDescription ? 'productnavblock__list-item  productnavblock__list-item_activ' : 'productnavblock__list-item';
    const rew = !isDescription ? 'productnavblock__list-item  productnavblock__list-item_activ' : 'productnavblock__list-item';
    return (
        <div className='productnavblock'>
            <ul className='productnavblock__list'>
                <li className={desc}  onClick={() => setIsDescription(true)}>Описание</li>
                <li className={rew} onClick={() => setIsDescription(false)}>Отзывы</li>
            </ul>
            {isDescription ? <Description description={description}/> : <Reviews />}
        </div>)
}

export default ProductNavBlock