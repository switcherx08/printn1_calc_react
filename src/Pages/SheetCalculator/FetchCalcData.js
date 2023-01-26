import {useEffect, useState} from "react";
import {fetchGetReq, sendPostReq} from "../../RequestModels"
import {entities} from "../config.js"
import apiUrl from "../config"

export function MaterialOptionList({x, y = 'defaultValue', callBack}) {
    const [matChoice, setMatChoice] = useState([])
    const matUrl = apiUrl + entities.sheet_material

    useEffect(() => {
        console.log(x, y);
        const fetchChoice = async () => {
            const response = await fetch(matUrl);
            const respJson = await response.json();
            if (response.status !== 200) {
                console.log('ERROR')
                throw new Error(respJson);
            }
            callBack(respJson);
            return respJson;
        };
        fetchChoice().then(response => {
            console.log(response);
            setMatChoice(response.materials);
        });
    }, []);


    return matChoice.map((m) => {
        return <option name={`mat-${m.name}`} value={m.id} key={'material-option-' + m.id}> {m.name}</option>;
    })
}


export function fetchCalculation(params) {
    const url = apiUrl + entities.calculation;

    const fetchData = async () => {
        const queryParams = new URLSearchParams(params)
        const response = await fetch(url + '?' + queryParams);
        const respJson = await response.json();

        if (response.status !== 200) {
            throw new Error(respJson);
        }
        return respJson;
    };

    return fetchData().then(response => {
        console.log(response);
        return response;
    });
}

export function fetchChromList() {
    const url = apiUrl + entities.chromaticity;
    return fetchGetReq(url).then(r => r?.chromaticities)
}

export function fetchPostpressList() {
    const url = apiUrl + entities.postpress;
    return fetchGetReq(url).then(r => r?.postpress_list)
}

export function fetchCalculationList(){
    const url= apiUrl + entities.calculation + '/saved'
    return fetchGetReq(url).then(r => r?.calculations)
}

export function fetchCalcModelList() {
    const url = apiUrl + entities.calculator_model
    return fetchGetReq(url).then(r => r)
}

export function fetchMaterialsByIdList(idList) {
    const url = apiUrl + entities.sheet_material
    return fetchGetReq(url, {id_list: String(idList)}).then(r => r?.materials)
}

export function fetchChromByIdList(idList) {
    const url = apiUrl + entities.chromaticity
    return fetchGetReq(url, {id_list: String(idList)}).then(r => r?.chromaticities)
}

export function fetchPostpressByIdList(idList) {
    const url = apiUrl + entities.postpress
    return fetchGetReq(url, {id_list: String(idList)}).then(r => r?.postpress_list)
}

export function fetchTemplateList(id = '') {
    const url = apiUrl + entities.template
    return fetchGetReq(url).then(r => r?.templates)
}

export function fetchCalcViaTemplate(templateId, quantity) {
    const url = apiUrl + entities.template + templateId + '/calc'
    return fetchGetReq(url, {quantity: quantity})
}

export function saveCalculation(payload) {
    const url = apiUrl + entities.calculation
    return sendPostReq(url, payload)
}



