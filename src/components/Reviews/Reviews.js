import './Reviews.css';
import Rating from '../Rating/Rating';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import apiMain from '../../http/ApiMain';
import { setIsOpen, setMessage } from '../../store/redusers/popupReduser';


function Reviews() {

    const isAuth = useSelector(state => state.user.isAuth)
    const productId = useSelector(state => state.product.currentProductId)
    console.log(productId)
    const currentUser = useSelector(state => state.user.currentUser)
    const [name, setName] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()

    const hendleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('productId', productId)
        formData.append('userId', currentUser.id)
        formData.append('rate', rating)
        formData.append('description', review)
        apiMain.addRating(formData).then(res => {
            if (res) {
                dispatch(setIsOpen(true))
                dispatch(setMessage('Ваш отзыв успешно добавлен'))
            }
        }).catch((err) => {
            dispatch(setIsOpen(true))
            dispatch(setMessage('Не удалось добавить отзыв'))
        })
        setName('')
        setReview('')
        setRating(0)
    }
    const [reviewMap, setReviewMap] = useState([])

    useEffect(() => {
        if (productId !== 0) {
            apiMain.getUserRating(productId).then(res => {
                setReviewMap(res.rows)
                console.log(res)
            })
        }
    }, [productId])


    /*const map = [
        {
            name: 'Катерина',
            date: '06.06.2023',
            review: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. ',
            rating: 3
        }, {
            name: 'Катерина',
            date: '06.06.2023',
            review: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. ',
            rating: 3
        }
    ]*/


    return (
        <div className='reviews__container'>
            {reviewMap.length === 0 ?
                <div>
                    <h3 className='reviews__reviews-title'>Этот товар еще не оценивали, ваш отзыв будет первым</h3>
                </div> :
                <div className='reviews__reviews'>
                    <h3 className='reviews__reviews-title'>Все отзывы</h3>
                    <ul className='reviews__reviews-list'>
                        {reviewMap.map((el, index, _) =>
                            <li className='reviews__reviews-item' key={index} >
                                <div className='reviews__author-block'>
                                    <p className='reviews__author'>{el.name}</p>
                                    <p className='reviews__date'>{el.updatedAt.slice(0,10)}</p>
                                </div>
                                <Rating rating={el.rate} />
                                <p className='reviews__description'>{el.description}</p>
                            </li>
                        )}
                    </ul>
                </div>}
            {isAuth ?
                <div className='reviews__add-form'>
                    <h3 className='reviews__add-form-title'>Добавить отзыв</h3>
                    <form className='reviews__form'>
                        <label className='reviews__label-review' for="review">Ваш отзыв</label>
                        <input id="review" className='reviews__input-review' type="text" name={review} required onChange={(e) => setReview(e.target.value)} />
                        <label className='reviews__label-review' for="name">Ваше имя</label>
                        <input id="name" className='reviews__input-name' type="text" name={name} required onChange={(e) => setName(e.target.value)} />
                        <p className='reviews__label-review'>Ваша оценка</p>
                        <div className="full-stars">
                            <div className="rating-group">
                                {/*<!-- по умолчанию 0 -->*/}
                                <input name="fst" value='0' type="radio" disabled checked />

                                {/*<!-- рейтинг 1 -->*/}
                                <label for="fst-1">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_988_1232)">
                                            <path d="M17.085 6.74504L17.0851 6.74506C17.2664 6.76146 17.4205 6.88398 17.4773 7.05839C17.5344 7.23412 17.4816 7.42451 17.3441 7.54519L13.4164 10.9892L13.1925 11.1855L13.2585 11.4759L14.4165 16.5761C14.4573 16.757 14.3872 16.9416 14.2392 17.0485L14.2388 17.0488C14.0903 17.1564 13.8933 17.165 13.7363 17.0711L9.25665 14.3921L9.00005 14.2387L8.74343 14.3921L4.26286 17.0712L4.26272 17.0712C4.19024 17.1146 4.10961 17.136 4.0289 17.136C3.93458 17.136 3.84149 17.1071 3.76181 17.0492L3.76082 17.0485C3.61289 16.9416 3.54275 16.7571 3.58354 16.5763C3.58356 16.5762 3.58357 16.5762 3.58358 16.5761L4.74158 11.4759L4.8075 11.1855L4.58364 10.9892L0.655856 7.54511C0.655844 7.5451 0.655833 7.54509 0.655821 7.54508C0.518482 7.42461 0.465875 7.23389 0.522437 7.05923C0.579917 6.88453 0.734077 6.76192 0.915387 6.74502C0.915529 6.745 0.915672 6.74499 0.915815 6.74498L6.11196 6.27331L6.4093 6.24632L6.52658 5.97176L8.58009 1.16406L8.58019 1.16382C8.65224 0.994891 8.81636 0.886475 9.00002 0.886475C9.18324 0.886475 9.34781 0.994537 9.42094 1.16443C9.421 1.16458 9.42107 1.16473 9.42113 1.16488L11.4743 5.97176L11.5916 6.24632L11.8889 6.27331L17.085 6.74504Z" stroke="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_988_1232">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </label>
                                <input name="fst" id="fst-1" value="1" type="radio" onChange={(e) => setRating(e.target.value)} />

                                {/*<!-- рейтинг 2 -->*/}
                                <label for="fst-2">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_988_1232)">
                                            <path d="M17.085 6.74504L17.0851 6.74506C17.2664 6.76146 17.4205 6.88398 17.4773 7.05839C17.5344 7.23412 17.4816 7.42451 17.3441 7.54519L13.4164 10.9892L13.1925 11.1855L13.2585 11.4759L14.4165 16.5761C14.4573 16.757 14.3872 16.9416 14.2392 17.0485L14.2388 17.0488C14.0903 17.1564 13.8933 17.165 13.7363 17.0711L9.25665 14.3921L9.00005 14.2387L8.74343 14.3921L4.26286 17.0712L4.26272 17.0712C4.19024 17.1146 4.10961 17.136 4.0289 17.136C3.93458 17.136 3.84149 17.1071 3.76181 17.0492L3.76082 17.0485C3.61289 16.9416 3.54275 16.7571 3.58354 16.5763C3.58356 16.5762 3.58357 16.5762 3.58358 16.5761L4.74158 11.4759L4.8075 11.1855L4.58364 10.9892L0.655856 7.54511C0.655844 7.5451 0.655833 7.54509 0.655821 7.54508C0.518482 7.42461 0.465875 7.23389 0.522437 7.05923C0.579917 6.88453 0.734077 6.76192 0.915387 6.74502C0.915529 6.745 0.915672 6.74499 0.915815 6.74498L6.11196 6.27331L6.4093 6.24632L6.52658 5.97176L8.58009 1.16406L8.58019 1.16382C8.65224 0.994891 8.81636 0.886475 9.00002 0.886475C9.18324 0.886475 9.34781 0.994537 9.42094 1.16443C9.421 1.16458 9.42107 1.16473 9.42113 1.16488L11.4743 5.97176L11.5916 6.24632L11.8889 6.27331L17.085 6.74504Z" stroke="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_988_1232">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-2" value="2" type="radio" onChange={(e) => setRating(e.target.value)} />

                                {/*<!-- рейтинг 3 -->*/}
                                <label for="fst-3">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_988_1232)">
                                            <path d="M17.085 6.74504L17.0851 6.74506C17.2664 6.76146 17.4205 6.88398 17.4773 7.05839C17.5344 7.23412 17.4816 7.42451 17.3441 7.54519L13.4164 10.9892L13.1925 11.1855L13.2585 11.4759L14.4165 16.5761C14.4573 16.757 14.3872 16.9416 14.2392 17.0485L14.2388 17.0488C14.0903 17.1564 13.8933 17.165 13.7363 17.0711L9.25665 14.3921L9.00005 14.2387L8.74343 14.3921L4.26286 17.0712L4.26272 17.0712C4.19024 17.1146 4.10961 17.136 4.0289 17.136C3.93458 17.136 3.84149 17.1071 3.76181 17.0492L3.76082 17.0485C3.61289 16.9416 3.54275 16.7571 3.58354 16.5763C3.58356 16.5762 3.58357 16.5762 3.58358 16.5761L4.74158 11.4759L4.8075 11.1855L4.58364 10.9892L0.655856 7.54511C0.655844 7.5451 0.655833 7.54509 0.655821 7.54508C0.518482 7.42461 0.465875 7.23389 0.522437 7.05923C0.579917 6.88453 0.734077 6.76192 0.915387 6.74502C0.915529 6.745 0.915672 6.74499 0.915815 6.74498L6.11196 6.27331L6.4093 6.24632L6.52658 5.97176L8.58009 1.16406L8.58019 1.16382C8.65224 0.994891 8.81636 0.886475 9.00002 0.886475C9.18324 0.886475 9.34781 0.994537 9.42094 1.16443C9.421 1.16458 9.42107 1.16473 9.42113 1.16488L11.4743 5.97176L11.5916 6.24632L11.8889 6.27331L17.085 6.74504Z" stroke="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_988_1232">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-3" value="3" type="radio" onChange={(e) => setRating(e.target.value)} />

                                {/* <!-- рейтинг 4 -->*/}
                                <label for="fst-4">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_988_1232)">
                                            <path d="M17.085 6.74504L17.0851 6.74506C17.2664 6.76146 17.4205 6.88398 17.4773 7.05839C17.5344 7.23412 17.4816 7.42451 17.3441 7.54519L13.4164 10.9892L13.1925 11.1855L13.2585 11.4759L14.4165 16.5761C14.4573 16.757 14.3872 16.9416 14.2392 17.0485L14.2388 17.0488C14.0903 17.1564 13.8933 17.165 13.7363 17.0711L9.25665 14.3921L9.00005 14.2387L8.74343 14.3921L4.26286 17.0712L4.26272 17.0712C4.19024 17.1146 4.10961 17.136 4.0289 17.136C3.93458 17.136 3.84149 17.1071 3.76181 17.0492L3.76082 17.0485C3.61289 16.9416 3.54275 16.7571 3.58354 16.5763C3.58356 16.5762 3.58357 16.5762 3.58358 16.5761L4.74158 11.4759L4.8075 11.1855L4.58364 10.9892L0.655856 7.54511C0.655844 7.5451 0.655833 7.54509 0.655821 7.54508C0.518482 7.42461 0.465875 7.23389 0.522437 7.05923C0.579917 6.88453 0.734077 6.76192 0.915387 6.74502C0.915529 6.745 0.915672 6.74499 0.915815 6.74498L6.11196 6.27331L6.4093 6.24632L6.52658 5.97176L8.58009 1.16406L8.58019 1.16382C8.65224 0.994891 8.81636 0.886475 9.00002 0.886475C9.18324 0.886475 9.34781 0.994537 9.42094 1.16443C9.421 1.16458 9.42107 1.16473 9.42113 1.16488L11.4743 5.97176L11.5916 6.24632L11.8889 6.27331L17.085 6.74504Z" stroke="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_988_1232">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-4" value="4" type="radio" onChange={(e) => setRating(e.target.value)} />

                                {/* <!-- рейтинг 5 -->*/}
                                <label for="fst-5">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_988_1232)">
                                            <path d="M17.085 6.74504L17.0851 6.74506C17.2664 6.76146 17.4205 6.88398 17.4773 7.05839C17.5344 7.23412 17.4816 7.42451 17.3441 7.54519L13.4164 10.9892L13.1925 11.1855L13.2585 11.4759L14.4165 16.5761C14.4573 16.757 14.3872 16.9416 14.2392 17.0485L14.2388 17.0488C14.0903 17.1564 13.8933 17.165 13.7363 17.0711L9.25665 14.3921L9.00005 14.2387L8.74343 14.3921L4.26286 17.0712L4.26272 17.0712C4.19024 17.1146 4.10961 17.136 4.0289 17.136C3.93458 17.136 3.84149 17.1071 3.76181 17.0492L3.76082 17.0485C3.61289 16.9416 3.54275 16.7571 3.58354 16.5763C3.58356 16.5762 3.58357 16.5762 3.58358 16.5761L4.74158 11.4759L4.8075 11.1855L4.58364 10.9892L0.655856 7.54511C0.655844 7.5451 0.655833 7.54509 0.655821 7.54508C0.518482 7.42461 0.465875 7.23389 0.522437 7.05923C0.579917 6.88453 0.734077 6.76192 0.915387 6.74502C0.915529 6.745 0.915672 6.74499 0.915815 6.74498L6.11196 6.27331L6.4093 6.24632L6.52658 5.97176L8.58009 1.16406L8.58019 1.16382C8.65224 0.994891 8.81636 0.886475 9.00002 0.886475C9.18324 0.886475 9.34781 0.994537 9.42094 1.16443C9.421 1.16458 9.42107 1.16473 9.42113 1.16488L11.4743 5.97176L11.5916 6.24632L11.8889 6.27331L17.085 6.74504Z" stroke="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_988_1232">
                                                <rect width="18" height="18" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-5" value="5" type="radio" onChange={(e) => setRating(e.target.value)} />
                            </div>
                        </div>
                        <button className="reviews__form-button" type='submit' onClick={hendleSubmit}>Отправить</button>
                    </form >
                </div> : <div></div>}
        </div>)
}

export default Reviews