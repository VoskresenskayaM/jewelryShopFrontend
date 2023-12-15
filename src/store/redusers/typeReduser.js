const FETCH_TYPES = 'FETCH_TYPES';
const FETCH_TYPES_SUCCESS = 'FETCH_TYPES_SUCCESS';
const FETCH_TYPE_SUCCESS = 'FETCH_TYPE_SUCCESS';
const FETCH_TYPES_ERRORS = 'FETCH_TYPES_ERRORS';

const initialState = {
    types: [],
    loading: false,
    error: null,
    type: { id: 0, name: '' }
}

export const typeReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TYPES:
            return { ...state, loading: true }
        case FETCH_TYPES_SUCCESS:
            return { ...state, loading: false, types: action.payload }
        case FETCH_TYPE_SUCCESS:
            const typePayload = { id: action.payload.id, name: action.payload.name }
            return { ...state, loading: false, type: Object.assign({}, typePayload) }
        case FETCH_TYPES_ERRORS:
            return { ...state, loading: false, error: action.payload.message }
        default:
            return state
    }
}

export const getTypes = (payload) => ({ type: FETCH_TYPES_SUCCESS, payload })
export const getType = (payload) => ({ type: FETCH_TYPE_SUCCESS, payload })
