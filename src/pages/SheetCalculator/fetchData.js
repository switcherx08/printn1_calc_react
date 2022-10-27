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


// export function GetCalculation() {
//
//     const [calc, setCalc] = useState([])
//     const url = 'http://localhost:9500/api/v1/calculation'
//         const params = {
//             quantity: allValues.quantity,
//             width: allValues.width,
//             height: allValues.height,
//             bleeds: allValues.bleeds,
//             chromaticity_front: allValues.chromaticity_front,
//             chromaticity_back: allValues.chromaticity_back,
//             material_id: allValues.material_id,
//             calculation_mode_id: allValues.calculation_mode_id
//         };
//
//     useEffect(() => {
//         let sendData = async () => {
//             const response = await fetch(url + '?' + new URLSearchParams(params));
//             const respJson = await response.json();
//             if (response.status !== 200) {
//                 throw new Error(respJson);
//             }
//             console.log(respJson)
//             return respJson;
//         };
//         sendData().then(response => {
//             setCalc(response.calculation)
//         });
//     }, [])
//
//
//     return (
//         <div>
//             <h1>Calc below</h1>
//             <h4>{calc.name}</h4>
//         </div>
//     )
// }



