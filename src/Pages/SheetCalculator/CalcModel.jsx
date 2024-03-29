import {Link, useParams} from "react-router-dom";
import {
    fetchCalcModelList, fetchCalculation, fetchChromByIdList, fetchMaterialsByIdList, fetchPostpressByIdList,
} from "./FetchCalcData";
import {useEffect, useReducer} from "react";
import Form from "react-bootstrap/Form";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import {CalculationLayout} from "./CalculationLayout";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

function reducer(state, action) {
    switch (action.type) {
        case 'fetchModelData':
            return {...state, modelData: action.payload};

        case 'fetchFormOptions':
            return {...state, formOptions: action.payload};

        case 'fetchCalcData':
            return {...state, calcData: action.payload};

        case 'fetchAllCalcModels':
            return {...state, allCalcModels: action.payload};

        case 'update':
            return {...state, currentData: action.payload};

        case 'resetCurrentData':
            return {...state, currentData: action.payload};

        case 'resetCalcData':
            return {...state, calcData: action.payload};

        default:
            return state;
    }
}

function CalcModel() {
    let initState = {
        allCalcModels: {}, modelData: {}, formOptions: {}, currentData: {
            chromaticity_front: 0, chromaticity_back: 0, postpress: [0],
            postpress_suboptions: [0], postpressSuboptionsState: {}, prepress: [0],
        }, calcData: {}
    }

    const params = useParams();
    const [data, dispatch] = useReducer(reducer, initState, init);

    function init(state) {
        return {...state};
    }


    useEffect(() => {
        fetchCalcModelList().then(response => {

            const modelData = response[params.calcId];
            const reqMaterials = fetchMaterialsByIdList(modelData.materials);
            const reqChrom = fetchChromByIdList(modelData.chromaticities);
            const reqPostpress = fetchPostpressByIdList(modelData.postpress);

            Promise.all([response]).then(([models]) => {
                dispatch({type: 'fetchAllCalcModels', payload: models})
                dispatch({type: 'fetchModelData', payload: models[params.calcId]})
                dispatch({
                    type: 'resetCurrentData', payload: Object.assign(initState.currentData, {
                        ...models[params.calcId].default_params,
                        postpressState: new Set(models[params.calcId].default_params.postpress) // init the default postpress checkboxes
                    })
                })
            })

            Promise.all([reqMaterials, reqChrom, reqPostpress]).then(([materials, chromaticities, postpress]) => {
                let setData = {};
                setData.matList = materials;
                setData.chromList = chromaticities;
                setData.postpressList = postpress;
                dispatch({type: 'fetchFormOptions', payload: setData});
            });
        });
    }, [params]);


    const changeHandler = (e) => {
        let currentPostpress = new Set(data.currentData.postpressState);
        let currentPostpressSuboptionsState = Object.assign({}, data.currentData.postpressSuboptionsState);
        let currentPostpressSuboptions = new Set(data.currentData.postpress_suboptions);

        if (e.target.name === 'postpress') {
            if (!currentPostpress.has(Number(e.target.value))) {
                currentPostpress.add(Number(e.target.value));

            } else {
                currentPostpress.delete(Number(e.target.value));
                if (data?.currentData?.postpressSuboptionsState != null &&
                    Object?.keys(data?.currentData?.postpressSuboptionsState).includes(`suboption-postpress-${e.target.value}`)
                ) {
                    currentPostpressSuboptions.delete((currentPostpressSuboptionsState[`suboption-postpress-${e.target.value}`]))
                    delete currentPostpressSuboptionsState[`suboption-postpress-${e.target.value}`];
                }
            }

            if (currentPostpress.size === 0) {
                currentPostpress = new Set([0]);
            }
            if (currentPostpressSuboptions.size === 0) {
                currentPostpressSuboptions = new Set([0])
            }
            dispatch({
                type: 'update', payload: {
                    ...data.currentData, ...{
                        postpressState: currentPostpress,
                        postpress: Array.from(currentPostpress),
                        postpressSuboptionsState: currentPostpressSuboptionsState,
                        postpress_suboptions: Array.from(currentPostpressSuboptions)
                    }
                }
            });

        } else if (e.target.name.includes('suboption-postpress-')) {
            // if (!currentPostpressSuboptions.has(Number(e.target.value))) {
            //     currentPostpressSuboptions.add(Number(e.target.value));
            // } else {
            //     currentPostpressSuboptions.delete(Number(e.target.value))
            // }
            const newSuboptionState = {
                ...data.currentData.postpressSuboptionsState,
                [e.target.name]: e.target.value
            }
            dispatch({
                type: 'update', payload: {
                    ...data.currentData, ...{
                        postpressSuboptionsState: newSuboptionState,
                        postpress_suboptions: Array.from(Object?.values(newSuboptionState))
                    }
                }
            });

        } else {
            dispatch({type: 'update', payload: {...data.currentData, [e.target.name]: e.target.value}});
        }

    }

    const handleSubmit = (e) => {
        switch (e.target.name) {
            case 'getCalc':
                const calcRequest = {
                    calculation_mode_id: 1, //hardcode is here
                    quantity: data.currentData?.quantity,
                    width: data.currentData?.width,
                    bleeds: data.currentData?.bleeds,
                    height: data.currentData?.height,
                    chromaticity_front: data.currentData?.chromaticity_front,
                    chromaticity_back: data.currentData?.chromaticity_back,
                    material_id: data.currentData?.material_id,
                    postpress: String(data.currentData?.postpress),
                    postpress_suboptions: String(data.currentData?.postpress_suboptions),
                    prepress: data?.modelData?.prepress //semi-hardcode
                }
                fetchCalculation(calcRequest).then(r => dispatch({type: 'fetchCalcData', payload: r}))
        }
    }

    const resetHandler = () => {
        dispatch({type: 'resetCurrentData', payload: initState.currentData});
        dispatch({type: 'resetCalcData', payload: initState.CalcData})
    }



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
                        <Form onSubmit={handleSubmit}>
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
                                             onChange={changeHandler} value={data.currentData.material_id || 'plug'}>
                                    <option disabled value='plug'>Выберите материал</option>
                                    {data.formOptions?.matList?.map((m, idx) => {
                                        return <option value={m.id} key={'mat-' + idx}>{m.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formChromFront">
                                <Form.Label>Цветность лицо</Form.Label>
                                <Form.Select value={data.currentData.chromaticity_front || 'plug'}
                                             aria-label="Цветность" name="chromaticity_front"
                                             onChange={changeHandler}>
                                    <option value='plug' disabled>Выберите цветность лица</option>
                                    {data.formOptions?.chromList?.map((m, idx) => {
                                        return <option value={m.id} key={'chrom_front-' + idx}>{m.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formChromBack">
                                <Form.Label>Цветность оборот</Form.Label>
                                <Form.Select aria-label="Цветность" name="chromaticity_back"
                                             onChange={changeHandler}
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
                                              placeholder="Количество" onChange={changeHandler}
                                              value={data.currentData?.quantity}
                                />
                                <Form.Text className="text-muted">
                                    Количество экземпляров тиража
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formWidth">
                                <Form.Label>Ширина изделия</Form.Label>
                                <Form.Control type="number" name="width"
                                              placeholder="Ширина" onChange={changeHandler}
                                              value={data.currentData?.width}
                                />
                                <Form.Text className="text-muted">
                                    Не менее {data?.modelData?.min_width} мм
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formHeight" onChange={changeHandler}>
                                <Form.Label>Высота изделия</Form.Label>
                                <Form.Control type="number" name="height"
                                              placeholder="Высота"
                                              value={data.currentData?.height}
                                />
                                <Form.Text className="text-muted">
                                    Не менее {data?.modelData?.min_height} мм
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBleeds" onChange={changeHandler}>
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
                                    onChange={changeHandler}
                                />
                                    <Form.Select name={`suboption-postpress-${p.id}`}
                                                 hidden={!(p?.suboptions.length > 0 && data.currentData.postpressState?.has(p.id))}
                                                 onChange={changeHandler}
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
                                        onClick={(e) => handleSubmit(e)}>Расчет</Button>
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

export default CalcModel