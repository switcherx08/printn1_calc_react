import {
    fetchSheetMaterialList,
    putSheetMaterialSetting,
    postNewSheetMaterial,
    deleteNewSheetMaterial
} from "./SettingRequests";
import {useEffect, useState} from "react";

import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ButtonToolbar} from "react-bootstrap";
import {AddMaterialCardModal} from "./modal/AddMaterialCardModal";
import {DelMaterialModal} from "./modal/DelMaterialModal";


function OldSheetMaterialSettings() {

    const [materialsList, setMaterialsList] = useState([]);
    const [updates, setUpdates] = useState({});

    const [edit, setEdit] = useState(false);
    const [toDelete, setToDelete] = useState({});

    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);

    useEffect(() => {
        fetchSheetMaterialList()
            .then(response => setMaterialsList(response));
    }, [toDelete]);


    const updateHandler = (e) => {
        const idx = e.target.getAttribute('idx');
        const update = {[e.target.name]: e.target.value};
        const materialListUpdate = {...materialsList[idx], ...update};

        setUpdates(prevState => ({
            // ...prevState, [idx]: {...prevState[idx], ...update}
            ...prevState, [idx]: {...materialListUpdate}
        }));

        setMaterialsList(prevState => {
            const newState = [...prevState]
            newState[idx] = materialListUpdate
            return newState
        });
    };

    const saveHandler = () => {
        const values = Object.values(updates);
        values.forEach((v, idx) => {
            putSheetMaterialSetting(v.id, v).then()
        });
    };

    const editHandler = () => {
        setEdit(!edit);
    }

    const addHandler = (data) => {
        const payload = {
            name: data.materialName,
            sheet_width_mm: data.materialWidth,
            sheet_height_mm: data.materialHeight,
            cost: data.materialCost
        }
        postNewSheetMaterial(payload).then(r => console.log(r));
    };

    const deleteHandler = (e) => {
        const id = e.target.id;
        const idx = e.target.getAttribute('idx');
        const confirmed = e.target.getAttribute('confirmed');

        if (confirmed === "false") {
            setDelModalShow(true);
            setToDelete({id: id, idx: idx});
        }
        if (confirmed === "true") {
            const deleteId = toDelete['id'];
            const deleteIdx = toDelete['idx'];

            deleteNewSheetMaterial(deleteId).then(() => {
                setMaterialsList(prevState => {
                    const newState = [...prevState]
                    newState[deleteIdx] = {} //ISSUE index deleting does not work, {} - does not delete object from state
                    return newState
                });
                console.log(materialsList)
            });

            setDelModalShow(false);
            console.log(materialsList);
        }
    };


    return (<div>
        <AddMaterialCardModal show={addModalShow} onClose={() => setAddModalShow(false)}
                              addData={(d) => addHandler(d)}
        />
        <DelMaterialModal show={delModalShow}
                          onConfirm={(e) => deleteHandler(e)}
                          onClose={() => setDelModalShow(false)}/>
        <ButtonToolbar style={{marginTop: 5}}>
            <Button variant="success" onClick={saveHandler} style={{marginRight: 5}}>Сохранить</Button>
            <Button variant="primary" onClick={() => {
                setAddModalShow(true)
            }} style={{marginRight: 5}}>Добавить</Button>
            <Button variant="primary" onClick={editHandler} style={{marginRight: 5}}>Редактирование</Button>
            <Button variant="primary" onClick={() => {
                const payload = {
                    name: 'material' + Math.random(),
                    sheet_width_mm: 1,
                    sheet_height_mm: 1,
                    cost: 1
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
                                      disabled={!edit}
                    /></td>
                    <td><Form.Control type="number"
                                      idx={idx}
                                      onChange={updateHandler}
                                      value={currentMaterial?.cost}
                                      name="cost"
                                      disabled={!edit}
                    /></td>
                    <td>
                        <Button variant="danger" id={currentMaterial.id}
                                idx={idx} confirmed="false"
                                onClick={e => deleteHandler(e)}>Удалить</Button>
                    </td>

                </tr>);
            })}
            </tbody>
        </Table>
    </div>);
}

export default OldSheetMaterialSettings