import { useEffect, useState } from 'react'
import './Account.css'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import apiAuth from '../../http/ApiAuth';
import Popup from '../Popup/Popup';
import { setCurrentUser, setIsAuth } from '../../store/redusers/userReduser';
import { setIsOpen, setMessage } from '../../store/redusers/popupReduser';
import { useFormValidate } from '../../hooks/userFormValidate';

function Account() {

    const dispatch = useDispatch()
    const navigate= useNavigate()

    /*const [isRegister, setIsRegister] = useState(false)*/
    const isRegister=useSelector(state=>state.user.isAuth)
    const location = useLocation()
  

    useEffect(() => {
        if (location.pathname === '/registration') dispatch(setIsAuth(true))
        if (location.pathname === '/login') dispatch(setIsAuth(false))
    }, [location.pathname])

    const [isSave, setIsSave] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.pathname === '/registration') {
            apiAuth.registration(formValue.email, formValue.password).then(res => {
                dispatch(setIsOpen(true))
                dispatch(setMessage('Вы успешно зарегистрировались'))
                navigate('/login')
                localStorage.setItem('isSaved', isSave)
            })
            .catch((err) => {
                dispatch(setIsOpen(true))
                dispatch(setMessage('Регистрация не удалась'))
                })
        }
        if(location.pathname === '/login') {
            apiAuth.login(formValue.email, formValue.password).then(res => {
                console.log(res.token)
                    localStorage.setItem('token', res.token)
                    apiAuth.getCurrentUser(localStorage.getItem('token')).then(user => {
                        dispatch(setCurrentUser(user))
                         navigate('/shop')
                         console.log(isSave)
                        localStorage.setItem('isSaved', isSave)
                    })
                        .catch(err => {
                            dispatch(setIsOpen(true))
                            dispatch(setMessage('Не удалось авторизоваться'))
                        })
                    dispatch(setIsAuth(true))
            })
                .catch((err) => {
                    dispatch(setIsOpen(true))
                    dispatch(setMessage('Не удалось авторизоваться'))
                })
            }
        }

        const formFields = ['email', 'password']
        const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)

        const register = !isRegister ? 'account__mode-item  account__mode-item_active' : 'account__mode-item';
        const entrance = isRegister ? 'account__mode-item  account__mode-item_active' : 'account__mode-item';
        const button = !isRegister ? "ВХОД" : "РЕГИСТРАЦИЯ"
        const errorClassNameEmail = `input__error ${isValidInputs.emailIsValid  ? '' : 'input__error-active'}`
        const errorClassNamePassword = `input__error ${isValidInputs.passwordIsValid ? '' : 'input__error-active'}`
        const buttonClass = `${isValidInputs ? '': ''}`
        const buttonDisabled = `account__form-button ${isFormValid ? '': 'account__form-button_inactiv'} `
        return (
                <section className='account__container'>
                    <h1 className='account__title'>Мой профиль</h1>
                    <ul className='account__mode'>
                        <li><NavLink className={register} to='/login'>Вход</NavLink></li>
                        <li><NavLink className={entrance} to='/registration'>Регистрация</NavLink></li>
                    </ul>
                    <form className='account__form'>
                        <input className='account__form-input' type="email" name="email" required placeholder='Почта' onChange={handleChange}/*{(e) => setEmail(e.target.value)}*/ />
                        <span className={errorClassNameEmail}>{errors.emailError || ''}</span>
                        <input className='account__form-input' type="password" name="password" required placeholder='Пароль' onChange={handleChange}/*{(e) => setPassword(e.target.value)}*/ />
                        <span className={errorClassNamePassword}>{errors.passwordError || ''}</span>
                        <div className='account__form-checkbox-block'>
                            <input className='account__form-checkbox' type="checkbox" id="remember" name="remeber" value='true'  onChange={handleChange}/*{(e) => setIsSave(e.target.value)}*//>
                            <label for="remember">Запомнить меня</label>
                        </div>
                        <button type='submit' onClick={handleSubmit} className={buttonDisabled} buttonDisabled>{button}</button>
                    </form>
                </section>
        )
    }

    export default Account