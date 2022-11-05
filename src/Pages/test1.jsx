import {useEffect, useState} from "react";

function TestCalculate() {

    const [calc, setCalc] = useState([])
    const url = 'http://localhost:9500/api/v1/calculation'
    const params = {
        quantity: 100,
        width: 297,
        height: 210,
        bleeds: 3,
        chromaticity_front: 4,
        chromaticity_back: 0,
        material_id: 1,
        calculation_mode_id: 1
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
            <h1>Calc below</h1>
            <h4>{calc.name}</h4>
        </div>
    )
}


export default TestCalculate;
