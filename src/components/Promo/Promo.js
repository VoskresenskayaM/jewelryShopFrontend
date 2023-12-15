import './Promo.css';

import Carousel from '../Carousel/Carousel';
import main1 from '../../images/main1.jpg'
import main2 from '../../images/main2.jpg'
import main3 from '../../images/main3.jpg'
import main4 from '../../images/main4.jpg'
import main5 from '../../images/main5.jpg'

function Promo() {
    const mainImageMap = [
        { img: main1, product: 'Золотые серьги', price: 12999 },
        { img: main2, product: 'Серьги с агатом', price: 15750 },
        { img: main3, product: 'Кольцо с фианитами', price: 7650 },
        { img: main4, product: 'Колье с раухтопазом', price: 59900 },
        { img: main5, product:'Серьги с фианитами', price: 11999 }
    ]
    return (
        <section className='promo__container'>
            <Carousel sliders={mainImageMap} />
        </section>
    )
}

export default Promo