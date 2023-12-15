import './Rating.css';
import { useEffect, useState } from 'react';
import blackstar from '../../images/blackstar.svg';
import whitestar from '../../images/whitestar.svg';

function Rating({rating}) {
    const [raitingmap, setRitingmap] = useState([])
 
    useEffect(() => {
        const map = []
        for (let i = 0; i < 5; i++) {
            if (i >= rating) {
                map.push(whitestar)
            }
            else map.push(blackstar)
        }
        setRitingmap(map)
    }, [rating])
 
    return (
        <ul className='product__raiting'>{raitingmap.map((el, index, _) => <li key={index}>
            <img src={el} alt='звезда' />
        </li>)}
        </ul>
    )
}
export default Rating