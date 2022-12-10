import {useEffect, useState} from "react";
import {fetchGetReq, sendPostReq} from "../../RequestModels"

export function MaterialOptionList({x, y = 'defaultValue', callBack}) {
    const [matChoice, setMatChoice] = useState([])
    const matUrl = 'http://127.0.0.1:9500/api/v1/sheet_material'

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
    const url = 'http://localhost:9500/api/v1/calculation';

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
    const url = 'http://localhost:9500/api/v1/chromaticity';
    return fetchGetReq(url).then(r => r?.chromaticities)
}

export function fetchPostpressList() {
    const url = 'http://localhost:9500/api/v1/postpress/';
    return fetchGetReq(url).then(r => r?.postpress_list)
}

export function fetchCalculationList(){
    const url='http://localhost:9500/api/v1/calculation/saved'
    return fetchGetReq(url).then(r => r?.calculations)
}


export function fetchTemplateList(id = '') {
    const url = 'http://localhost:9500/api/v1/template/'
    return fetchGetReq(url).then(r => r?.templates)
}

export function fetchCalcViaTemplate(templateId, quantity) {
    const url = 'http://localhost:9500/api/v1/template/' + templateId + '/calc'
    return fetchGetReq(url, {quantity: quantity})
}

export function saveCalculation(payload) {
    const url = 'http://localhost:9500/api/v1/calculation/'
    return sendPostReq(url, payload)
}


