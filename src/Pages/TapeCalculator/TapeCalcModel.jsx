import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import {Link, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {CalculationLayout} from "../SheetCalculator/CalculationLayout";
import {useState} from "react";

export const TapeCalcModel = () => {
    const [data, setData] = useState('')
    const params = useParams()



    return <>
        <Tab.Container id="left-tabs-example" defaultActiveKey={params.calcId}>
            <div className="container-sm">
                <div className="row">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column" style={{paddingLeft: 25}}>
                            {Object.entries(data.allCalcModels)?.map(([k, v], idx) => {
                                return (<Nav.Item key={`nav-link-n-${idx}`}>
                                    <Nav.Link eventKey={k} onClick={resetHandler}
                                              as={Link} key={`calc-model-n-${idx}`}
                                              to={`/sheet-calculation/model/${k}`}>{v.name}</Nav.Link>
                                </Nav.Item>)
                            })}

                        </Nav>
                    </Col>
                    <div className="col-sm" style={{padding: 10}}>
                        <h3>{data?.modelData?.name}</h3>
                        <Form onSubmit=''>
                            <Form.Group className="mb-3" controlId="formMode">
                                <Form.Label>Тип печати:</Form.Label>
                                <Form.Select defaultValue='plug' aria-label="Режим расчета" placeholder="Mode">
                                    <option value='plug' name="calculation_mode">Цифровая
                                        печать
                                    </option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMaterial">
                                <Form.Label>Материал:</Form.Label>
                                <Form.Select aria-label="Материал" name='material_id'
                                             value={data.currentData.material_id || 'plug'}>
                                    <option disabled value='plug'>Выберите материал</option>
                                    {data.formOptions?.matList?.map((m, idx) => {
                                        return <option value={m.id} key={'mat-' + idx}>{m.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formChromFront">
                                <Form.Label>Цветность лицо</Form.Label>
                                <Form.Select value={data.currentData.chromaticity_front || 'plug'}
                                             aria-label="Цветность" name="chromaticity_front">
                                    <option value='plug' disabled>Выберите цветность лица</option>
                                    {data.formOptions?.chromList?.map((m, idx) => {
                                        return <option value={m.id} key={'chrom_front-' + idx}>{m.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formChromBack">
                                <Form.Label>Цветность оборот</Form.Label>
                                <Form.Select aria-label="Цветность" name="chromaticity_back"
                                             value={data.currentData.chromaticity_back || 'plug'}>
                                    <option value='plug' disabled>Выберите цветность оборота</option>
                                    {data.formOptions?.chromList?.map((m, idx) => {
                                        return <option value={m.id} key={'chrom_back-' + idx}>{m.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formQuantity">
                                <Form.Label>Количество</Form.Label>
                                <Form.Control type="number" name="quantity"
                                              placeholder="Количество"
                                              value={data.currentData?.quantity}
                                />
                                <Form.Text className="text-muted">
                                    Количество экземпляров тиража
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formWidth">
                                <Form.Label>Ширина изделия</Form.Label>
                                <Form.Control type="number" name="width"
                                              placeholder="Ширина"
                                              value={data.currentData?.width}
                                />
                                <Form.Text className="text-muted">
                                    Не менее {data?.modelData?.min_width} мм
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formHeight">
                                <Form.Label>Высота изделия</Form.Label>
                                <Form.Control type="number" name="height"
                                              placeholder="Высота"
                                              value={data.currentData?.height}
                                />
                                <Form.Text className="text-muted">
                                    Не менее {data?.modelData?.min_height} мм
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBleeds" >
                                <Form.Label>Вылеты изделия</Form.Label>
                                <Form.Control type="number" name="bleeds" placeholder="Вылеты"
                                              value={data.currentData?.bleeds}
                                />
                                <Form.Text className="text-muted">
                                    Не менее {data?.modelData?.min_bleeds} мм
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" name="postpress">
                                Постпечатная обработка:
                                {data.formOptions?.postpressList?.map((p, idx) => <><Form.Check
                                    key={`postpress-checkbox-${idx}`}
                                    label={p.name}
                                    type="switch"
                                    value={p?.id}
                                    name='postpress'
                                    checked={data.currentData.postpressState?.has(p.id) || false}

                                    <Form.Select name={`suboption-postpress-${p.id}`}
                                                 hidden={!(p?.suboptions.length > 0 && data.currentData.postpressState?.has(p.id))}

                                                 value={data.currentData?.postpressSuboptionsState[`suboption-postpress-${p.id}`] || 'plug'}>
                                        <option value="plug" key={0} disabled>Выберите опцию</option>
                                        {p.suboptions.map((s, idx) => {
                                            if (data.modelData.postpress_suboptions?.includes(s.id)) {
                                                return <option key={`suboption-${idx}`}
                                                               value={s?.id}>{s.name}</option>
                                            }
                                        })}
                                    </Form.Select>
                                </>)}
                            </Form.Group>

                            <ButtonGroup>
                                <Button variant="primary" name="getCalc"
                                       >Расчет</Button>
                                {/*<Button variant="success" id="2">Расчет с*/}
                                {/*    сохранением</Button>*/}
                                {/*<Button variant="outline-success"> Сохранить в*/}
                                {/*    шаблон </Button>*/}
                                {/*<Button variant="outline-danger" onClick={resetHandler}>TEST</Button>*/}
                            </ButtonGroup>
                        </Form>
                    </div>

                    <div className="col-sm">
                        <CalculationLayout calcData={data?.calcData} calcName={data?.modelData.name}/>
                    </div>
                </div>
            </div>
        </Tab.Container>
    </>
}