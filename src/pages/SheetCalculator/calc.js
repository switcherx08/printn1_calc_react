import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";

import {fetchCalculation, fetchChromList, fetchPostpressList, MaterialOptionList} from "./fetchData";
import {Alert, Card} from "react-bootstrap";
import {activePostpress} from "./utils";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


function Calculator() {
    let initParams = {
        calculation_mode_id: 1,
        quantity: 100,
        width: 297,
        bleeds: 3,
        height: 210,
        chromaticity_front: 4,
        chromaticity_back: 0,
        material_id: 0,
        postpress: [0]
    };

    const [formData, setFormData] = useState(initParams);
    const [calcData, setCalcData] = useState(null);

    const [chromOptions, setChromOptions] = useState([]);
    const [postpressState, setPostpressState] = useState({});
    const [postpressOptions, setPostpressOptions] = useState([]);

    useEffect(() => {
        fetchPostpressList().then(response => {
            setPostpressOptions(response);
            const options = {};
            response.forEach((o) => {
                options[o.id] = {id: o.id, isActive: o.default_enabled};
            });
            setPostpressState(options);
            let optArr = activePostpress(options)
            setFormData({...formData, postpress: optArr});
        });
        fetchChromList().then(r => {
            setChromOptions(r);
        });

    }, []);


    let setData = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const changeHandler = e => {
        setData(e);
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCalculation(formData).then(r => setCalcData(r));
    };

    const handlePostpress = (id) => {
        const newPostpressState = {...postpressState, [id]: {id: id, isActive: !postpressState[id].isActive}}
        setPostpressState(newPostpressState);
        const newPostpressData = activePostpress(newPostpressState);
        setFormData({...formData, postpress: newPostpressData})
        console.log(newPostpressData)

    };

    return (

        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
            <Row>
                <Col sm={3} >
                    <Nav variant="pills" className="flex-column" style={{paddingLeft: 25, paddingTop: 20}}>
                        <Nav.Item>
                            <Nav.Link eventKey="first">Листовой расчет</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Листовой расчет по шаблону </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div className="container-sm">
                                <div className="row">
                                    <div className="col-sm" style={{paddingBottom: 15}}>
                                        <h3 style={{paddingTop: 15}}>Параметры продукции</h3>
                                        <Form.Group className="mb-3" controlId="formMode">
                                            <Form.Label>Тип печати:</Form.Label>
                                            <Form.Select aria-label="Режим расчета" placeholder="Mode">
                                                <option selected disabled value={1} name="calculation_mode">Цифровая
                                                    печать
                                                </option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formMaterial">
                                            <Form.Label>Материал:</Form.Label>
                                            <Form.Select aria-label="Материал" name='material_id'
                                                         onChange={changeHandler}>
                                                <option selected value="0">Без материала</option>
                                                <MaterialOptionList x="None" y="JAVASCRIPT"
                                                                    callBack={r => console.log('123')}/>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formQuantity">
                                                <Form.Label>Количество</Form.Label>
                                                <Form.Control type="number" value={formData.quantity} name="quantity"
                                                              placeholder="Quantity"
                                                              onChange={changeHandler}/>
                                                <Form.Text className="text-muted">
                                                    Количество экземпляров тиража
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formWidth">
                                                <Form.Label>Ширина изделия</Form.Label>
                                                <Form.Control type="number" value={formData.width} name="width"
                                                              placeholder="width"
                                                              onChange={changeHandler}/>
                                                <Form.Text className="text-muted">
                                                    Не менее 30 мм
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formHeight">
                                                <Form.Label>Высота изделия</Form.Label>
                                                <Form.Control type="number" value={formData.height} name="height"
                                                              placeholder="height"
                                                              onChange={changeHandler}/>
                                                <Form.Text className="text-muted">
                                                    Не менее 30 мм
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBleeds">
                                                <Form.Label>Вылеты изделия</Form.Label>
                                                <Form.Control type="number" value={formData.bleeds} name="bleeds"
                                                              placeholder="bleeds"
                                                              onChange={changeHandler}/>
                                                <Form.Text className="text-muted">
                                                    Не менее 2 мм
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formChromFront">
                                                <Form.Label>Цветность лицо</Form.Label>
                                                <Form.Select aria-label="Цветность" name="chromaticity_front"
                                                             onChange={changeHandler} defaultValue={4}>
                                                    {chromOptions.map((c, idx) => {
                                                        return <option value={c.id}
                                                                       key={'chrom-' + idx}> {c.colorfulnes} </option>
                                                    })}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formChromBack">
                                                <Form.Label>Цветность оборот</Form.Label>
                                                <Form.Select aria-label="Цветность" name="chromaticity_back"
                                                             onChange={changeHandler}>
                                                    {chromOptions.map((c, idx) => {
                                                        return <option value={c.id}
                                                                       key={'chrom-' + idx}> {c.colorfulnes} </option>
                                                    })}
                                                </Form.Select>

                                            </Form.Group>

                                            <Form.Group className="mb-3" name="postpress">
                                                Постпечатная обработка:
                                                {postpressOptions?.map((o, idx) => <Form.Check
                                                    key={`postpress-checkbox-${idx}`}
                                                    inline
                                                    label={o.name}
                                                    type="checkbox"
                                                    onChange={() => {
                                                        handlePostpress(o.id);
                                                    }}
                                                    onClick={() => handlePostpress(o.id)}
                                                    checked={postpressState[o.id]?.isActive}
                                                />)}


                                            </Form.Group>

                                            <Button variant="primary" type="submit">
                                                Расчет
                                            </Button>
                                        </Form>
                                    </div>


                                    {/*<div>{JSON.stringify(calcData)}</div>*/}

                                    <div className="col-sm" style={{padding: 15}}>
                                        <Alert>
                                            <div>
                                                <h5>{calcData?.calculation.name}</h5>
                                                <p>Тираж: {calcData?.calculation.quantity} экз.</p>
                                                <p>Цветность лица: {calcData?.calculation.chromaticity_front}</p>
                                                <p>Цветность оборота: {calcData?.calculation.chromaticity_back} </p>
                                                {/*<p>Материал изделия: {calcData?.calculation.material} </p>*/}
                                                <p>Ширина изделия: {calcData?.calculation.width} мм </p>
                                                <p>Высота изделия: {calcData?.calculation.height} мм </p>
                                                <hr></hr>
                                                <p>Стоимость за единицу: <b>{calcData?.calculation.price}</b> руб.</p>
                                                <p>Стоимость тиража: <b>{calcData?.calculation.total}</b> руб.</p>
                                                <p>Стоимость постпечатных
                                                    опций: <b>{calcData?.calculation.postpress_total}</b> руб.</p>
                                                <hr></hr>
                                                <p><b>Service info:</b></p>
                                                <p>Печатных листов
                                                    требуется: <b>{calcData?.calculation.sheets_required}</b> руб.</p>
                                                <p>Себестоимость
                                                    материалов: <b>{calcData?.calculation.total_cost_of_materials}</b> руб.
                                                </p>
                                                <p>Себестоимость
                                                    печати: <b>{calcData?.calculation.total_cost_of_materials}</b> руб.
                                                </p>
                                                <p>Стоимость постпечатных
                                                    опций: <b>{calcData?.calculation.postpress_total}</b> руб.</p>

                                            </div>

                                        </Alert>

                                    </div>
                                </div>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>


    )
}


export default Calculator