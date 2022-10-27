import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from "react";

//
// const [calc, setCalc] = useState([])
// const url = 'http://localhost:9500/api/v1/calculation'
// const params = {
//     quantity: 100,
//     width: 210,
//     height: 297,
//     bleeds: 3,
//     chromaticity_front: 4,
//     chromaticity_back: 0,
//     material_id: 1,
//     calculation_mode_id: 1
// }
//
//
// useEffect(() => {
//     const fetchCalculation = async () => {
//         const response = await fetch(url + '?' + new URLSearchParams(params));
//         const respJson = await response.json();
//         if (response.statusCode !== 200) {
//             throw new Error(respJson);
//         }
//         return respJson;
//     };
//     fetchCalculation().then(response => {
//         console.log(response);
//         setCalc(response.calculation);
//     });
// }, []);


function Calculator1() {

    const [matChoice, setMatChoice] = useState([])
    const matUrl = 'http://127.0.0.1:9500/api/v1/material'

    useEffect(() => {
        const fetchChoice = async () => {
            const response = await fetch(matUrl);
            const respJson = await response.json();
            if (response.status !== 200) {
                console.log('ERROR')
                console.log(respJson)
                // throw new Error(respJson);
            }
            return respJson;
        };
        fetchChoice().then(response => {
            console.log(response);
            setMatChoice(response.materials);
        });
    }, []);


    const mapChoiceArr = matChoice.map((m) => {
                        return <option value={m.id} key={'material-option-' + m.id}> {m.name}</option>;
                    })

    return (<div>
        <Form>
            <Form.Group className="mb-3" controlId="formQuantity">
                <Form.Label>Количество</Form.Label>
                <Form.Control type="text" placeholder=""/>
                <Form.Text className="text-muted">
                    Количество экземпляров тиража
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWidth">
                <Form.Label>Ширина изделия</Form.Label>
                <Form.Control type="" placeholder=""/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHeight">
                <Form.Label>Высота изделия</Form.Label>
                <Form.Control type="" placeholder=""/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formChromFront">
                <Form.Label>Цветность лицо</Form.Label>
                <Form.Control type="" placeholder=""/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formChromBack">
                <Form.Label>Цветность оборот</Form.Label>
                <Form.Control type="" placeholder=""/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMaterial">
                <Form.Select aria-label="Режим расчета">
                    <option selected disabled>Материал</option>
                    {mapChoiceArr}

                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMaterial1">
                <Form.Select aria-label="Режим расчета">
                    <option>Режим расчета</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    </div>)
}

export default Calculator1;