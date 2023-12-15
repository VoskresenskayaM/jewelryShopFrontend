
import './App.css';
import Header from '../Header/Header';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Shop from '../Shop/Shop';
import About from '../About/About';
import Product from '../Product/Product';
import Basket from '../Basket/Basket';
import Account from '../Account/Account';
import NotFound from '../NotFound/NotFound';
import Admin from '../Admin/Admin';
import { Provider } from 'react-redux';
import apiAuth from '../../http/ApiAuth';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  Popup  from '../Popup/Popup';
import { setCurrentUser, setIsAuth} from '../../store/redusers/userReduser'
import {setIsOpen,setMessage} from  '../../store/redusers/popupReduser'
function App() {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    if(localStorage.getItem('isSaved')){
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      apiAuth.check(token)
        .then((res) => {
          if (res) {
            localStorage.removeItem('token')
            localStorage.setItem('token', res.token)
            apiAuth.getCurrentUser(localStorage.getItem('token')).then(user => {
              dispatch(setCurrentUser(user))
              dispatch(setIsAuth(true))
              if (location.pathname === '/login' || location.pathname === '/registration') {
                navigate("/shop");
              }
              else navigate(location.pathname)
          })
              .catch(err => {
                  dispatch(setIsOpen(true))
                  dispatch(setMessage('Не удалось авторизоваться'))
              })
          }
        })
        .catch((err) => {
          navigate("/");
        })
    }
  }
  }, [isAuth])

  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/basket"  element={isAuth ? <Navigate to='/basket' replace /> : <Navigate to='/registration' replace />}/>
        <Route path="/basket" element={<Basket />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registration" element={<Account />} />
        <Route path="/login" element={<Account />} />
      </Routes>
      <Footer />
      <Popup />
    </div>
  );
}

export default App;
