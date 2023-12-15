const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_ERRORS = 'FETCH_PRODUCTS_ERRORS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PRODUCT_ID = 'SET_CURRENT_PRODUCT_ID';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
const SET_USER_BASKET_PRODUCT = 'SET_USER_BASKET_PRODUCT';

const initialState = {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 6,
    totalCount: 0,
    currentProductId: 0,
    currentProduct: {
        id: 0,
        name: '',
        price: 0,
        rating: 0,
        img: '',
        description: '',
        typeId: 0,
        materialId: 0,
        brandId: 0,
    },
    userBasketproducts: [],
}

export const productReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, loading: action.payload }
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload, totalCount: action.payload }
        case FETCH_PRODUCTS_ERRORS:
            return { ...state, loading: false, error: action.payload.message }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload }
        case SET_TOTAL_COUNT:
            return { ...state, totalCount: action.payload }
        case SET_CURRENT_PRODUCT_ID:
            return { ...state, currentProductId: action.payload }
        case SET_CURRENT_PRODUCT:
            const productPaiload = {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                rating: action.payload.rating,
                img: action.payload.img,
                description: action.payload.description,
                typeId: action.payload.typeId,
                materialId: action.payload.materialId,
                brandId: action.payload.brandId
            }
            return { ...state, currentProduct: Object.assign({}, productPaiload) }
            case SET_USER_BASKET_PRODUCT:
                return { ...state, loading: false, userBasketproducts: action.payload }
        default:
            return state
    }
}

export const setProducts = (payload) => ({ type: FETCH_PRODUCTS_SUCCESS, payload })
export const setLoading = (payload) => ({ type: FETCH_PRODUCTS, payload })
export const setCurrentPage = (payload) => ({ type: SET_CURRENT_PAGE, payload })
export const setTotalCount = (payload) => ({ type: SET_TOTAL_COUNT, payload })
export const setCurrentProductId = (payload) => ({ type: SET_CURRENT_PRODUCT_ID, payload })
export const setCurrentProduct = (payload) => ({ type: SET_CURRENT_PRODUCT, payload })
export const setUserBasketProducts = (payload) => ({ type: SET_USER_BASKET_PRODUCT, payload })