import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from "react";
import axios from "axios";

function Calculator1() {
    const [calc, setCalc] = useState([])
    const url = 'http://localhost:9500/api/v1/calculation'
    const params = {
        quantity: 100,
        width: 210,
        height: 297,
        bleeds: 3,
        chromaticity_front: 4,
        chromaticity_back: 0,
        material_id: 1,
        calculation_mode_id: 1
    }


    useEffect(() => {
        axios.get(url, {params: params})
            .then(response => {
                console.log(response);
                setCalc(response.data.calculation)
            });
    }, []);


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
                <Form.Label>Цветность оборота</Form.Label>
                <Form.Control type="" placeholder=""/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMaterial">
                <Form.Select aria-label="Материал">
                    <option>Материал</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
              <Form.Group className="mb-3" controlId="formMaterial">
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
        {calc.name}
    </div>)
}

export default Calculator1;