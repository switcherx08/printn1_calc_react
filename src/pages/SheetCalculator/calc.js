import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";

import {fetchCalculation, MaterialOptionList} from "./fetchData";
import {Alert} from "react-bootstrap";


function Calculator() {
    let initParams = {
        quantity: 100,
        width: 148,
        bleeds: 3,
        height: 210,
        chromaticity_front: 4,
        chromaticity_back: 0,
        material_id: 1,
        calculation_mode_id: 1
    };

    const [formData, setFormData] = useState(initParams);
    const [calcData, setCalcData] = useState(null);

    const changeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCalculation(formData).then(r => setCalcData(r));
    };

    return (<div className="container-sm">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formQuantity">
                <Form.Label>Количество</Form.Label>
                <Form.Control type="number" value={formData.quantity} name="quantity" placeholder="Quantity"
                              onChange={changeHandler}/>
                <Form.Text className="text-muted">
                    Количество экземпляров тиража
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWidth">
                <Form.Label>Ширина изделия</Form.Label>
                <Form.Control type="number" value={formData.width} name="width" placeholder="width"
                              onChange={changeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHeight">
                <Form.Label>Высота изделия</Form.Label>
                <Form.Control type="number" value={formData.height} name="height" placeholder="height"
                              onChange={changeHandler}/> </Form.Group>
            <Form.Group className="mb-3" controlId="formChromFront">
                <Form.Label>Цветность лицо</Form.Label>
                <Form.Control type="number" value={formData.chromaticity_front} name="chromaticity_front"
                              placeholder="chromaticity_front"
                              onChange={changeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formChromBack">
                <Form.Label>Цветность оборот</Form.Label>
                <Form.Control type="number" value={formData.chromaticity_back} name="chromaticity_back"
                              placeholder="chromaticity_back"
                              onChange={changeHandler}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMaterial">
                <Form.Select aria-label="Материал" name='material_id' onChange={changeHandler}>
                    <option selected disabled>Материал</option>
                    <MaterialOptionList x="None" y="JAVASCRIPT" callBack={r => console.log('123')}/>
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

        {/*<div>{JSON.stringify(calcData)}</div>*/}
        <div className="row">
            <div className="col-sm">
                <Alert>
                    <div>{calcData?.calculation.total}</div>
                </Alert>
            </div>

        </div>

    </div>)
}


export default Calculator