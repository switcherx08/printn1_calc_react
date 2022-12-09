import Table from 'react-bootstrap/Table';
import {fetchMaterialList} from "./fetchSettingsData";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";

function MaterialSettings() {

    const [materialsList, setMaterialsList] = useState([])
    useEffect(() => {

            fetchMaterialList().then(response => {
                setMaterialsList(response)
            })

        }, []
    );


    return (

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Username</th>
            </tr>
            </thead>
            <tbody>
            {
                materialsList.map(function (i, idx) {
                        return (<tr key={idx}>
                            <td>{i?.id}</td>
                            <td>{i?.name}</td>
                            <td><Form.Control type="text" id={'material-price-' + idx} value={i?.cost}/> </td>
                        </tr>);
                    }
                )
            }
            </tbody>
        </Table>
    );
}

export default MaterialSettings;