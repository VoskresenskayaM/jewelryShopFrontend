import { combineReducers } from "redux";
import { brandReduser } from "./brandReduser";
import { typeReduser } from "./typeReduser";
import { materialReduser } from "./materialReduser";
import { productReduser } from "./productReduser";
import { userReduser } from "./userReduser";
import { popupReduser } from "./popupReduser";

export const rootReduser = combineReducers({
    brand: brandReduser,
    type: typeReduser,
    material: materialReduser,
    product: productReduser,
    user: userReduser, 
    popup: popupReduser
})