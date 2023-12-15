import './Carousel.css'
import { useEffect, useState, useRef } from 'react';
import DotNavigation from '../DotNavigationItem/DotNavigatiion';
import { Transition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';

function Carousel({ sliders }) {

    const navigate = useNavigate()
    const [sliderIndex, setSliderIndex] = useState(0)
    const [check, setSheck] = useState(true)

    const goToSlider = (sliderIndex) => {
        setSliderIndex(sliderIndex)
        setSheck(false)
    }
    useEffect(() => {
        setSheck(true)
    }, [sliderIndex])
    const slideStylesWidthBackground = {
        backgroundImage: `url(${sliders[sliderIndex].img})`,
    }

    const slideTitle = sliders[sliderIndex].product;
    const slidePrice = sliders[sliderIndex].price;

    return (
        <Transition in={check} timeout={200} >
            {(state) => <div className={`carousel__container ${state}`} style={slideStylesWidthBackground}>
                <div className='carousel__title-block'>
                    <h1 className='carousel__title'>{slideTitle}</h1>
                    <p className='carousel__price'>{slidePrice}</p>
                    <button className='carousel__button' onClick={()=>{navigate('/shop')}}>Посмотреть</button>
                </div>
                <div className='carousel__dot-list-block'>
                    <ul className='carousel__dot-list'>
                        {sliders.map((el, index, _) =>
                            <li key={index}
                                onClick={() => goToSlider(index)}>
                                <DotNavigation isSelected={index === sliderIndex ? false : true} /></li>
                        )}
                    </ul>
                </div>
            </div>}
        </Transition>
    )
}


export default Carousel