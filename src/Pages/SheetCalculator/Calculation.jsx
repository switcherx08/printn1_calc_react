import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {ButtonGroup} from "react-bootstrap";

import {CalculationLayout} from "./CalculationLayout";
import {TemplateCalculation} from "./TemplateCalculation";
import {CalculationNameModal} from "./Modal";
import {SavedCalculations} from "../SavedCalculations"
import {useEffect, useState} from "react";
import {fetchCalculation, fetchChromList, fetchPostpressList, MaterialOptionList, saveCalculation} from "./FetchCalcData";
import {activePostpress} from "./utils";
import {AddMaterialCardModal} from "../Admin/modal/AddMaterialCardModal";


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
    const [modalShow, setModalShow] = useState(false)

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
            setFormData({...formData, postpress: optArr.arrayPostpress});
        });
        fetchChromList().then(r => {
            setChromOptions(r);
        });
    }, []);

    let setData = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const changeHandler = e => setData(e)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.id === "2") {
            setModalShow(true);
        } else {
            fetchCalculation(formData).then(r => setCalcData(r));
        }
    };

    const handlePostpress = (id) => {
        const newPostpressState = {...postpressState, [id]: {id: id, isActive: !postpressState[id].isActive}};
        setPostpressState(newPostpressState);
        const newPostpressData = activePostpress(newPostpressState);
        setFormData({...formData, postpress: newPostpressData.arrayPostpress});
    };

    const handleSubmitTemplateCalc = e => {
        let calcName = e.target.value;

        saveCalculation({
            ...formData,
            postpress: formData?.postpress,
            calc_name: calcName
        }).then(r => setCalcData(r)).then(r => setModalShow(false));
    }
    return (

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <CalculationNameModal show={modalShow} onClose={() => setModalShow(false)}
                                  setCalcName={(e) => handleSubmitTemplateCalc(e)}/>
            <Row style={{paddingTop: 15}}>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column" style={{paddingLeft: 25}}>
                        <Nav.Item>
                            <Nav.Link eventKey="first">Листовой расчет</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Листовой расчет по шаблону </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Сохраненные расчеты</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div className="container-sm">
                                <div className="row">
                                    <div className="col-sm" style={{padding: 10}}>
                                        <h3>Параметры продукции</h3>
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
                                            <ButtonGroup>
                                                <Button variant="primary" id="1" type="submit">Расчет</Button>
                                                <Button variant="success" id="2" onClick={e => handleSubmit(e)}>Расчет с
                                                    сохранением</Button>
                                                <Button variant="outline-success" onClick={() => {
                                                    setModalShow(true)
                                                }}> Сохранить в
                                                    шаблон </Button>
                                                <Button variant="outline-danger" onClick={() => console.log(formData?.postpress)}>TEST</Button>
                                            </ButtonGroup>
                                        </Form>

                                    </div>

                                    <div className="col-sm">
                                        <CalculationLayout calcData={calcData}/>
                                    </div>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <TemplateCalculation postpress={postpressOptions}></TemplateCalculation>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <SavedCalculations/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    )
}


export default Calculator