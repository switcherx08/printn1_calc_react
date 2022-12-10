import {fetchGetReq, sendPostReq, sendPutReq} from "../../RequestModels"
import {apiUrl, entities} from "../config.js"

export function fetchSheetMaterialList(params){
    const url = apiUrl + entities.sheet_material
    return fetchGetReq(url).then(response => response?.materials)
}

export function putSheetMaterialSetting(id, payload=null){
    const url = apiUrl + entities.sheet_material + id
    return sendPutReq(url, payload).then(response => response?.material)
}