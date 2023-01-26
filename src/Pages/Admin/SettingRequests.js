import {fetchGetReq, sendDeleteReq, sendPostReq, sendPutReq} from "../../RequestModels"
import {entities} from "../config.js"
import apiUrl from "../config"


export function fetchSheetMaterialList(params){
    const url = apiUrl + entities.sheet_material
    return fetchGetReq(url).then(response => response?.materials)
}

export function postNewSheetMaterial(payload){
    const url = apiUrl + entities.sheet_material
    return sendPostReq(url, payload)
}

export function putSheetMaterialSetting(id, payload=null){
    const url = apiUrl + entities.sheet_material + id
    return sendPutReq(url, payload).then(response => response?.material)
}

export function deleteNewSheetMaterial(id){
    const url = apiUrl + entities.sheet_material + id
    return sendDeleteReq(url)
}