const FETCH_ISOPEN = 'FETCH_ISOPEN';
const FETCH_MESSAGE = 'FETCH_MESSAGE';
/*const FETCH_HENDLE_POPUP_CLOSE = 'FETCH_HENDLE_POPUP_CLOSE';*/

const initialState = {
    isOpen: false,
    message: '',
}

export const popupReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ISOPEN:
            return {...state, isOpen: action.payload  }
        case FETCH_MESSAGE:
            return {  ...state, message: action.payload }
        /* FETCH_HENDLE_POPUP_CLOSE:
            return { ...state, loading: false, error: action.payload.message }*/
        default:
            return state
    }
} 

export const setIsOpen = (payload) =>({type: FETCH_ISOPEN, payload})
export const setMessage = (payload) =>({type: FETCH_MESSAGE, payload})
 