import {useParams} from "react-router-dom";
import {fetchCalcModelList, fetchMaterialsByIdList, MaterialOptionList} from "./FetchCalcData";
import {useEffect, useReducer} from "react";
import Form from "react-bootstrap/Form";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {CalculationLayout} from "./CalculationLayout";

function reducer(state, action) {
    switch (action.type) {
        case 'fetchModelData':
            return {...state, modelData: action.payload};

        case 'fetchMaterialList':
            return {...state, materialList: action.payload};

        case 'update':
            return {...state, currentData: action.payload};

        default:
            return state;
    }
}

export function CalcModel() {
    const initState = {
        modelData: {},
        materialList: [],
        currentData: {}
    }

    function init(state) {
        return {...state};
    }

    const params = useParams();
    const [data, dispatch] = useReducer(reducer, initState, init);


    useEffect(() => {
        fetchCalcModelList().then(r => {
            const modelData = r[`calc-${params.calcId}`];
            dispatch({type: 'fetchModelData', payload: modelData});

            fetchMaterialsByIdList(modelData.materials).then(r => {
                dispatch({type: 'fetchMaterialList', payload: r})
            })

        });


    }, []);

    const changeHandler = (e) => {
        dispatch({type: 'update', payload: {...data.currentData, [e.target.name]: e.target.value}})
    }

    console.log(data.currentData)


    return <>
        <div className="container-sm">
            <div className="row">
                <div className="col-sm" style={{padding: 10}}>
                    <h3>{data?.modelData?.name}</h3>
                    <>{data.modelData?.materials}</>
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
                        <Form.Select aria-label="Материал" name='materialId' onChange={changeHandler} >
                            {data?.materialList?.map((m, idx) => {
                                return <option value={m.id} key={'mat-' + idx}>{m.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control type="number" name="quantity"
                                          placeholder="Количество" onChange={changeHandler}
                            />
                            <Form.Text className="text-muted">
                                Количество экземпляров тиража
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formWidth">
                            <Form.Label>Ширина изделия</Form.Label>
                            <Form.Control type="number" name="width"
                                          placeholder="Ширина" onChange={changeHandler}
                            />
                            <Form.Text className="text-muted">
                                Не менее 30 мм
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formHeight" onChange={changeHandler}>
                            <Form.Label>Высота изделия</Form.Label>
                            <Form.Control type="number" name="height"
                                          placeholder="Высота"
                            />
                            <Form.Text className="text-muted">
                                Не менее {data?.modelData?.min_width} мм
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBleeds">
                            <Form.Label>Вылеты изделия</Form.Label>
                            <Form.Control type="number" name="bleeds"
                                          placeholder="bleeds"
                            />
                            <Form.Text className="text-muted">
                                Не менее {data?.modelData?.min_height} мм
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formChromFront">
                            <Form.Label>Цветность лицо</Form.Label>
                            <Form.Select aria-label="Цветность" name="chromaticity_front"
                                         defaultValue={4}>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formChromBack">
                            <Form.Label>Цветность оборот</Form.Label>
                            <Form.Select aria-label="Цветность" name="chromaticity_back"
                            >

                            </Form.Select>

                        </Form.Group>

                        <Form.Group className="mb-3" name="postpress">

                        </Form.Group>
                        <ButtonGroup>
                            <Button variant="primary" id="1" type="submit">Расчет</Button>
                            <Button variant="success" id="2">Расчет с
                                сохранением</Button>
                            <Button variant="outline-success"> Сохранить в
                                шаблон </Button>
                            <Button variant="outline-danger">TEST</Button>
                        </ButtonGroup>
                    </Form>

                </div>

                <div className="col-sm">
                    <CalculationLayout/>
                </div>
            </div>
        </div>
    </>
}