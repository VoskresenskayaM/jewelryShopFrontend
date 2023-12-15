import './Footer.css';
import te from '../../images/telegram.svg';
import vk from '../../images/vk.svg';
import whatsapp from '../../images/whatsapp.svg'

function Footer() {
    return (
        <footer className='footer'>
             <div className='footer__block'> 
            <p className='footer__project'>2023 pet project.</p>
            <a href='https://policies.google.com/privacy' className='footer__privatpolicy' target="_blank" rel="noopener noreferrer">
                Политика конфиденциальности
            </a>
            </div>
            <div className='footer__contacts'>
                <img className='footer__contacts-item' src={te} alt='телеграмм' />
                <img className='footer__contacts-item' src={vk} alt='вк' />
                <img className='footer__contacts-item' src={whatsapp} alt='вк' />
            </div>
        </footer>
    )
}

export default Footer