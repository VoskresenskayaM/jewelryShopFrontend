const FETCH_BRANDS = 'FETCH_BRANDS';
const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
const FETCH_BRAND_SUCCESS = 'FETCH_BRAND_SUCCESS';
const FETCH_BRANDS_ERRORS = 'FETCH_BRANDS_ERRORS';

const initialState = {
    brands: [],
    loading: false,
    error: null,
    brand: { id: 0, name: '' }
}

export const brandReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BRANDS:
            return {...state, loading: true  }
        case FETCH_BRANDS_SUCCESS:
            return {  ...state, loading: false, brands: action.payload }
            case FETCH_BRAND_SUCCESS:
                const brandPayload = { id: action.payload.id, name: action.payload.name }
                return { ...state, loading: false, brand: Object.assign({}, brandPayload) }
        case FETCH_BRANDS_ERRORS:
            return { ...state, loading: false, error: action.payload.message }
           
        default:
            return state
    }
} 

export const getBrands = (payload) =>({type: FETCH_BRANDS_SUCCESS, payload})
export const getBrand = (payload) =>({type: FETCH_BRAND_SUCCESS, payload})
 