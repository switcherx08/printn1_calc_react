import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";

import {fetchCalculation, fetchChromList, MaterialOptionList} from "./fetchData";
import {Alert} from "react-bootstrap";


function Calculator() {
    let initParams = {
        calculation_mode_id: 1,
        quantity: 100,
        width: 148,
        bleeds: 3,
        height: 210,
        chromaticity_front: 4,
        chromaticity_back: 0,
        material_id: 0,

    };

    const [formData, setFormData] = useState(initParams);
    const [calcData, setCalcData] = useState(null);
    const [chromOptions, setChromOptions] = useState([])

    let setData = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const changeHandler = e => {
        setData(e)
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCalculation(formData).then(r => setCalcData(r));
    };

    const chromHandler = (e) => {
        setData(e)
        fetchChromList().then(r => setChromOptions(r));
        console.log('works')
    };


    return (<div className="container-sm">
        <h3>Калькулятор листовой продукции</h3>
        <div className="row">
            <div className="col-sm">
                <Form.Group className="mb-3" controlId="formMode">
                    <Form.Label>Тип печати</Form.Label>
                    <Form.Select aria-label="Режим расчета" placeholder="Mode">
                        <option selected disabled value={1} name="calculation_mode">Цифровая печать</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMaterial">
                    <Form.Select aria-label="Материал" name='material_id' onChange={changeHandler}>
                        <option selected value="0">Без материала</option>
                        <MaterialOptionList x="None" y="JAVASCRIPT" callBack={r => console.log('123')}/>
                    </Form.Select>
                </Form.Group>

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
                        <Form.Select aria-label="Цветность" name="chromaticity_front" onClick={chromHandler}
                                     onChange={changeHandler}>
                            {
                                chromOptions.map((c, idx) => {
                                    return <option value={c.id} key={'chrom-' + idx}> {c.colorfulnes} </option>
                                })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formChromBack">
                        <Form.Label>Цветность оборот</Form.Label>
                        <Form.Select aria-label="Цветность" name="chromaticity_back" onClick={chromHandler}
                                     onChange={changeHandler}>
                            {chromOptions.map((c, idx) => {
                                return <option value={c.id} key={'chrom-' + idx}> {c.colorfulnes} </option>
                            })}
                        </Form.Select>
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Расчет
                    </Button>
                </Form>
            </div>


            {/*<div>{JSON.stringify(calcData)}</div>*/}

            <div className="col-sm">
                <Alert>
                    <div>
                        <h5>{calcData?.calculation.name}</h5>
                        <p>Цветность лицо: {calcData?.calculation.chromaticity_front}</p>
                        <p>Цветность оборот: {calcData?.calculation.chromaticity_back} </p>
                        <p>Стоимость тиража: <b>{calcData?.calculation.total}</b> руб.</p>
                        <p>Стоимость постпечатных опций:  <b>{calcData?.calculation.postpress_total}</b> руб. </p>
                    </div>

                </Alert>
                <div>{}</div>
            </div>
        </div>


    </div>)
}


export default Calculator