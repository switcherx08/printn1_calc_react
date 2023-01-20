import {useParams} from "react-router-dom";
import {
    fetchCalcModelList,
    fetchChromByIdList,
    fetchMaterialsByIdList,
    fetchPostpressByIdList,
    fetchPostpressList
} from "./FetchCalcData";
import {useEffect, useReducer, useState} from "react";
import Form from "react-bootstrap/Form";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {CalculationLayout} from "./CalculationLayout";

function reducer(state, action) {
    switch (action.type) {
        case 'fetchModelData':
            return {...state, modelData: action.payload};

        case 'fetchFormData':
            return {...state, formData: action.payload};

        case 'update':
            return {...state, currentData: action.payload};


        default:
            return state;
    }
}

function CalcModel() {
    const initState = {
        modelData: {},
        formData: {},
        currentData: {
            postpress: []
        }

    }

    function init(state) {
        return {...state};
    }

    const params = useParams();
    const [data, dispatch] = useReducer(reducer, initState, init);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {

        fetchCalcModelList().then(response => {

            const modelData = response[`calc-${params.calcId}`];
            const reqMaterials = fetchMaterialsByIdList(modelData.materials);
            const reqChrom = fetchChromByIdList(modelData.chromaticities);
            const reqPostpress = fetchPostpressByIdList(modelData.postpress);

            Promise.all([reqMaterials, reqChrom, reqPostpress]).then(([materials,
                                                                          chromaticities,
                                                                          postpress]) => {
                let setData = {}
                setData.matList = materials;
                setData.chromList = chromaticities;
                setData.postpressList = postpress;
                dispatch({type: 'fetchFormData', payload: setData});
            });
        });
    }, []);


    const changeHandler = (e) => {

        if (e.target.name === 'postpress'){
             console.log(e.target.name)
            let currentPostpress = data.currentData.postpress
            currentPostpress.push(e.target.value)
            /// THIS PLACE: HAVE TO ADD POSTPRESS STATUS (ACTIVE OR NOT) THIS METHOD DOES NOT DELETE CANCELED CHOOSE

            dispatch({type: 'update', payload: {...data.currentData, postpress: currentPostpress}})
        }
        else{
            dispatch({type: 'update', payload: {...data.currentData, [e.target.name]: e.target.value}})
        }

    }

    console.log(data?.currentData)

    return <>
        <div className="container-sm">
            <div className="row">
                <div className="col-sm" style={{padding: 10}}>
                    <h3>{data?.modelData?.name}</h3>

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
                        <Form.Select aria-label="Материал" name='material_id' onChange={changeHandler}>
                            <option selected disabled>Выберите материал</option>
                            {data.formData?.matList?.map((m, idx) => {
                                return <option value={m.id} key={'mat-' + idx}>{m.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formChromFront">
                        <Form.Label>Цветность лицо</Form.Label>
                        <Form.Select aria-label="Цветность" name="chromaticity_front">
                            <option selected disabled>Выберите цветность лица</option>
                            {data.formData?.chromList?.map((m, idx) => {
                                return <option value={m.id} key={'mat-' + idx}>{m.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formChromBack">
                        <Form.Label>Цветность оборот</Form.Label>
                        <Form.Select aria-label="Цветность" name="chromaticity_back">
                            <option selected disabled>Выберите цветность оборота</option>
                            {data.formData?.chromList?.map((m, idx) => {
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

                        <Form.Group className="mb-3" controlId="formBleeds" onChange={changeHandler}>
                            <Form.Label>Вылеты изделия</Form.Label>
                            <Form.Control type="number" name="bleeds" placeholder="Вылеты"/>
                            <Form.Text className="text-muted">
                                Не менее {data?.modelData?.min_height} мм
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" name="postpress">
                            Постпечатная обработка:
                            {data.formData?.postpressList?.map((p, idx) => <Form.Check
                                key={`postpress-checkbox-${idx}`}
                                inline
                                label={p.name}
                                type="checkbox"
                                value={p.id}
                                name='postpress'
                                onChange={changeHandler}
                            />)}
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

export default CalcModel