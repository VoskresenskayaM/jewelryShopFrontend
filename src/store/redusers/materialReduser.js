const FETCH_MATERIALS = 'FETCH_MATERIALS';
const FETCH_MATERIALS_SUCCESS = 'FETCH_MATERIALS_SUCCESS';
const FETCH_MATERIAL_SUCCESS = 'FETCH_MATERIALS_SUCCES';
const FETCH_MATERIAL_ERRORS = 'FETCH_MATERIAL_ERRORS';

const initialState = {
    materials: [],
    loading: false,
    error: null,
    material: { id: 0, name: '' }
}

export const materialReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MATERIALS:
            return { ...state, loading: true }
        case FETCH_MATERIALS_SUCCESS:
            return { ...state, loading: false, materials: action.payload }
        case FETCH_MATERIAL_SUCCESS:
            const materialPayload = { id: action.payload.id, name: action.payload.name }
            return { ...state, loading: false, material: Object.assign({}, materialPayload) }
        case FETCH_MATERIAL_ERRORS:
            return { ...state, loading: false, error: action.payload.message }
        default:
            return state
    }
}

export const getMaterials = (payload) => ({ type: FETCH_MATERIALS_SUCCESS, payload })
export const getMaterial = (payload) => ({ type: FETCH_MATERIAL_SUCCESS, payload })