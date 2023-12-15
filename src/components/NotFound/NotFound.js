import './NotFound.css';
import { useNavigate } from 'react-router-dom';


function NotFound() {
    const navigate = useNavigate()
    return (
        <section className='notfound__container'>
            <h1 className='notfound__title'>404 Страница не найдена</h1>
            <p className='notfound__message'>Эта страница не найдена.
                Вернитесь на домашнюю станицу и попробуйте еще раз.</p>
            <button className='notfound__back' onClick={()=>navigate('/')}>НА ГЛАВНУЮ</button>
        </section>
    )
}
export default NotFound