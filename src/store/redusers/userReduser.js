const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_LIKE = 'SET_LIKE';
const DELETE_LIKE = 'DELETE_LIKE';
const ALL_LIKES = 'ALL_LIKES';


const initialState = {
    currentUser: { id: null, email: '', role: '' },
    isAuth: false,
    likes: []
}

export const userReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            const userPaiload = { id: action.payload.id, email: action.payload.email, role: action.payload.role }
            return { ...state, currentUser: Object.assign({}, userPaiload)}
        case SET_IS_AUTH:
            return { ...state, isAuth: action.payload }
        case SET_LIKE:
            return { ...state, likes: [...state.likes, action.payload]}
            case DELETE_LIKE:
                return { ...state, likes: state.likes.filter(el=>el.productId!==action.payload)}
        case ALL_LIKES:
            return { ...state, likes: action.payload }
        default:
            return state
    }
}

export const setCurrentUser = (payload) => ({ type: SET_CURRENT_USER, payload })
export const setIsAuth = (payload) => ({ type: SET_IS_AUTH, payload })
export const setLikeInStore = (payload) => ({ type: SET_LIKE, payload })
export const getAllLikes = (payload) => ({ type: ALL_LIKES, payload })
export const deleteLikesInStore = (payload) => ({ type: DELETE_LIKE, payload })
