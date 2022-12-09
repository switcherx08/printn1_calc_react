import {fetchGetReq, sendPostReq} from "../../RequestModels"
import {apiUrl, entities} from "../config.js"

export function fetchMaterialList(params){
    const url = apiUrl + entities.material
    return fetchGetReq(url).then(response => response?.materials)
}