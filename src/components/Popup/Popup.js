import React from 'react';
import './Popup.css';
import cross from '../../images/close.svg';
import { useDispatch, useSelector } from 'react-redux'; 
import {setIsOpen, setMessage} from '../../store/redusers/popupReduser'

function Popup() {
    const dispatch = useDispatch()
    const isPopupOpen = useSelector(state=>state.popup.isOpen)
    const hendlePopupClose=()=>{
        dispatch(setIsOpen(false))
        dispatch(setMessage(''))
    }
    const message= useSelector(state=>state.popup.message)

    const popupClass = `popup ${isPopupOpen ? 'popup__opened' : ''}`
    return (

        <div className={popupClass}>
            <div className='popup__container' >
                <div className='popup__cross'>
                    <img src={cross} alt='закрыть' onClick={hendlePopupClose} />
                </div>
                <p className='popup__message'>{message}</p>
            </div >
        </div >
    )
}

export default Popup;