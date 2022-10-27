import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from "react";

import {FetchMaterial} from "./fetchData";

function Calculator(props) {
    let initParams = {
        quantity: 100,
        width: 297,
        height: 210,
        bleeds: 3,
        chromaticity_front: 4,
        chromaticity_back: 0,
        material_id: 1,
        calculation_mode_id: 1
    }
    const [allValues, setAllValues] = useState(initParams);
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const allMaterials = FetchMaterial()

    // problem is HERE
    function GetCalculation() {
        const url = 'http://localhost:9500/api/v1/calculation'
        const params = {
            quantity: allValues.quantity,
            width: allValues.width,
            height: allValues.height,
            bleeds: allValues.bleeds,
            chromaticity_front: allValues.chromaticity_front,
            chromaticity_back: allValues.chromaticity_back,
            material_id: allValues.material_id,
            calculation_mode_id: allValues.calculation_mode_id
        }

        const [calc, setCalc] = useState([])

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
    }

    return (<div>
        <Form>
            <Form.Group className="mb-3" controlId="formQuantity">
                <Form.Label>Количество</Form.Label>
                <Form.Control type="number" value={allValues.quantity} name="quantity" placeholder="Quantity"
                              onChange={changeHandler}/>
                <Form.Text className="text-muted">
                    Количество экземпляров тиража
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWidth">
                <Form.Label>Ширина изделия</Form.Label>
                <Form.Control type="number" value={allValues.width} name="width" placeholder="width"
                              onChange={changeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHeight">
                <Form.Label>Высота изделия</Form.Label>
                <Form.Control type="number" value={allValues.height} name="height" placeholder="height"
                              onChange={changeHandler}/> </Form.Group>
            <Form.Group className="mb-3" controlId="formChromFront">
                <Form.Label>Цветность лицо</Form.Label>
                <Form.Control type="number" value={allValues.chromaticity_front} name="chromaticity_front"
                              placeholder="chromaticity_front"
                              onChange={changeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formChromBack">
                <Form.Label>Цветность оборот</Form.Label>
                <Form.Control type="number" value={allValues.chromaticity_back} name="chromaticity_back"
                              placeholder="chromaticity_back"
                              onChange={changeHandler}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMaterial">
                <Form.Select aria-label="Материал" name='material_id' onChange={changeHandler}>
                    <option selected disabled>Материал</option>
                    {allMaterials}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMode">
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
        <div>{allValues.quantity}</div>
        <div>{`Width: ${allValues.width}`}</div>
        <div>{allValues.material_id}</div>
        <div></div>


    </div>)
}


export default Calculator;