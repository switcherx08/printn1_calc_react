import {fetchSheetMaterialList, putSheetMaterialSetting} from "./SettingRequests";
import {useEffect, useReducer, useState} from "react";

import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ButtonToolbar} from "react-bootstrap";
import {initialState} from "../Auth/AuthReducer";


function SheetMaterialSettings() {

    const [materialsList, setMaterialsList] = useState([])
    const [updates, setUpdates] = useState({})


    const updateHandler = (e) => {
        const idx = e.target.getAttribute('idx')
        const update = {[e.target.name]: e.target.value}
        const materialListUpdate = {...materialsList[idx], ...update}

        setUpdates(prevState => ({
            // ...prevState, [idx]: {...prevState[idx], ...update}
            ...prevState, [idx]: {...materialListUpdate}
        }))

        setMaterialsList(prevState => {
            const newState = [...prevState]
            newState[idx] = materialListUpdate
            return newState
        })
    }


    const saveHandler = () => {
        const values = Object.values(updates);
        values.forEach((v, idx) => {
            putSheetMaterialSetting(v.id, v).then(r => console.log(r))

        })

    }

    console.log(updates)
    useEffect(() => {
        fetchSheetMaterialList().then(response => setMaterialsList(response))
    }, []);

    return (<div>
            <ButtonToolbar style={{marginTop: 5}}>
                <Button variant="primary" onClick={saveHandler}>Сохранить</Button>
            </ButtonToolbar>
            <Table striped bordered hover style={{marginTop: 5}}>

                <thead>
                <tr>
                    <th>#</th>
                    <th>Наименование</th>
                    <th>Цена</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {materialsList.map(function (i, idx) {
                    const currentMaterial = materialsList[idx]
                    return (<tr key={idx}>
                        <td>{currentMaterial?.id}</td>
                        <td><Form.Control type="text"
                                          idx={idx}
                                          onChange={updateHandler}
                                          value={currentMaterial?.name}
                                          name="name"
                        /></td>
                        <td><Form.Control type="number"
                                          idx={idx}
                                          onChange={updateHandler}
                                          value={currentMaterial?.cost}
                                          name="cost"
                        /></td>
                        <td><Button variant="danger">Удалить</Button></td>
                    </tr>);
                })}
                </tbody>
            </Table>
        </div>);
}

export default SheetMaterialSettings;