import {
    deleteNewSheetMaterial, fetchSheetMaterialList, postNewSheetMaterial, putSheetMaterialSetting
} from "./SettingRequests";
import {useEffect, useReducer, useState} from "react";

import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ButtonToolbar} from "react-bootstrap";
import {AddMaterialCardModal} from "./modal/AddMaterialCardModal";
import {DelMaterialModal} from "./modal/DelMaterialModal";

/// TEST MATERIAL SETTINGS !!!!!!!!!!
function reducer(state, action) {
    switch (action.type) {
        case 'fetch':
            return {...state, materialsList: action.payload}
        case 'update':
            // console.log(action.payload)
            return {...state, materialsList: action.payload}
        case 'delete':
            delete state.materialsList[action.payload]
            return state
        case 'editToggle':
            return {...state, editToggle: action.payload}
        case 'addModalShow':
            return {...state, addModalShow: action.payload}
        case 'delModalShow':
            return {...state, delModalShow: action.payload}


        default:
            return state
    }
}

function SheetMaterialSettings() {

    const initState = {
        materialsList: {}, editToggle: true, addModalShow: false, delModalShow: false
    }
    const [data, dispatch] = useReducer(reducer, initState, init);
    const [updates, setUpdates] = useState({});
    const [deleteItem, setDeleteItem] = useState(null)

    function init(state) {
        return {...state}
    }

    useEffect(() => {
        fetchSheetMaterialList()
            .then(response => {
                const matList = {}
                response.forEach(m => {
                    matList[m.id] = m
                })
                dispatch({type: 'fetch', payload: matList})
            });
    }, []);


    const updateHandler = (e) => {
        const update = {[e.target.name]: e.target.value}
        const updatedMaterial = {[e.target.id]: {...data.materialsList[e.target.id], ...update}}

        setUpdates(prevState => {
            return {...prevState, ...updatedMaterial}
        })

        dispatch({
            type: 'update', payload: {...data.materialsList, ...updatedMaterial}
        })

    };

    const saveHandler = () => {
        const values = Object.values(updates);
        values.forEach(v => {
            putSheetMaterialSetting(v.id, v).then(r => console.log(r))
        });
        if (!data.editToggle) {
            dispatch({type: 'editToggle', payload: !data.editToggle})
        }

    };

    const addHandler = (data) => {
        const payload = {
            name: data.materialName,
            sheet_width_mm: data.materialWidth,
            sheet_height_mm: data.materialHeight,
            cost: data.materialCost
        }
        postNewSheetMaterial(payload).then(r => console.log(r));
    };

    const deleteHandler = () => {
        deleteNewSheetMaterial(deleteItem).then(dispatch({type: 'delete', payload: deleteItem}))
        console.log(deleteItem)
    };


    return (<div>
        <AddMaterialCardModal show={data.addModalShow}
                              onClose={() => dispatch({type: 'addModalShow', payload: false})}
                              addData={(d) => addHandler(d)}/>

        <DelMaterialModal show={data.delModalShow}
                          onConfirm={(e) => deleteHandler(e)}
                          onClose={() => dispatch({type: 'delModalShow', payload: false})}/>

        <ButtonToolbar style={{marginTop: 5}}>
            <Button variant="success" onClick={saveHandler}
                    style={{marginRight: 5}}>Сохранить</Button>

            <Button variant="primary" style={{marginRight: 5}}
                    onClick={() => dispatch({type: 'addModalShow', payload: true})}>Добавить</Button>

            <Button variant="primary" onClick={() => dispatch({type: 'editToggle', payload: !data.editToggle})}
                    style={{marginRight: 5}}>Редактирование</Button>

            <Button variant="primary" onClick={() => {
                const payload = {
                    name: 'material' + Math.random(), sheet_width_mm: 1, sheet_height_mm: 1, cost: 1
                }
                postNewSheetMaterial(payload).then()
            }} style={{marginRight: 5}}>TEST</Button>

        </ButtonToolbar>
        <Table striped bordered hover style={{marginTop: 10}}>

            <thead>
            <tr>
                <th>#</th>
                <th>Наименование</th>
                <th>Закупочная цена</th>
                <th>Ширина материала</th>
                <th>Высота материала</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(data?.materialsList).map(function (material, idx) {
                return (<tr key={idx}>
                    <td>{material?.id}</td>
                    <td><Form.Control type="text"
                                      id={material?.id}
                                      onChange={updateHandler}
                                      value={material?.name}
                                      name="name"
                                      disabled={data?.editToggle}
                    /></td>
                    <td><Form.Control type="number"
                                      id={material?.id}
                                      onChange={updateHandler}
                                      value={material?.cost}
                                      name="cost"
                                      disabled={data?.editToggle}
                    /></td>
                    <td><Form.Control type="number"
                                      id={material?.id}
                                      onChange={updateHandler}
                                      value={material?.sheet_width_mm}
                                      name="sheet_width_mm"
                                      disabled={data?.editToggle}
                    /></td>
                    <td><Form.Control type="number"
                                      id={material?.id}
                                      onChange={updateHandler}
                                      value={material?.sheet_height_mm}
                                      name="sheet_height_mm"
                                      disabled={data?.editToggle}
                    /></td>
                    <td>
                        <Button variant="danger"
                                id={material?.id}
                                confirmed="false"
                                onClick={() => {
                                    dispatch({type: 'delModalShow', payload: true})
                                    setDeleteItem(material.id)
                                }}>Удалить</Button>
                    </td>

                </tr>);
            })}
            </tbody>
        </Table>
    </div>);
}

export default SheetMaterialSettings;