import {useEffect, useState} from "react";


export function FetchMaterial(props) {
    const [matChoice, setMatChoice] = useState([])
    const matUrl = 'http://127.0.0.1:9500/api/v1/material'

    useEffect(() => {
        const fetchChoice = async () => {
            const response = await fetch(matUrl);
            const respJson = await response.json();
            if (response.status !== 200) {
                console.log('ERROR')
                // throw new Error(respJson);
            }
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


export function GetCalculation(props) {

    const [calc, setCalc] = useState([])
    const url = 'http://localhost:9500/api/v1/calculation'
        const params = {
            quantity: props.values.quantity,
            width: props.values.width,
            height: props.values.height,
            bleeds: props.values.bleeds,
            chromaticity_front: props.values.chromaticity_front,
            chromaticity_back: props.values.chromaticity_back,
            material_id: props.values.material_id,
            calculation_mode_id: props.values.calculation_mode_id
        };

    useEffect(() => {
        let sendData = async () => {
            const response = await fetch(url + '?' + new URLSearchParams(params));
            const respJson = await response.json();
            if (response.status !== 200) {
                throw new Error(respJson);
            }
            console.log(respJson)
            return respJson;
        };
        sendData().then(response => {
            setCalc(response.calculation)
        });
    }, [])


    return (
        <div>
            <h4>{calc.name}</h4>
            <h2>Стоимость: {calc.total}</h2>
        </div>
    )
}



