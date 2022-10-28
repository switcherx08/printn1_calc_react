import {useEffect, useState} from "react";


export function MaterialOptionList({x, y='defaultValue', callBack}) {
    const [matChoice, setMatChoice] = useState([])
    const matUrl = 'http://127.0.0.1:9500/api/v1/material'

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
        const response = await fetch(url + '?' + new URLSearchParams(params));
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

    const fetchData = async () => {
        const response = await fetch(url);
        const respJson = await response.json();
        if (response.status !== 200) {
            throw new Error(respJson);
        }
        return respJson;
    };

    return fetchData().then(response => {
        console.log(response);
        return response.chromaticities;
    });
}

