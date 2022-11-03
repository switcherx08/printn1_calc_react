import Table from 'react-bootstrap/Table';
import {Button, ButtonGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {fetchCalculationList} from "./SheetCalculator/FetchData";

export function SavedCalculations() {
    const [calculations, setCalculations] = useState([])

    // useEffect(() => {
    //
    //         fetchCalculationList().then(r => {
    //             const savedCalculations = r.map(v => {
    //                 return v;
    //             });
    //             setCalculations(savedCalculations);
    //         })
    //
    //         console.log(calculations);
    //     }, []
    // );

    useEffect(() => {
        fetchCalculationList().then(r => setCalculations(r));
        fetch('http://localhost:9500/api/v1/auth/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: "4@4.ru",
                password: "1111"
            })
        }).then(r => r.json()).then(r => {
            localStorage.setItem('auth', JSON.stringify(r));
        });
    }, []);

    return (
        <div className="container-xl">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№ расчета</th>
                    {/*<th>Дата расчета</th>*/}
                    {/*<th>Сотрудник</th>*/}
                    <th>Название расчета</th>
                    <th>Параметры расчета</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>

                {
                    calculations.map(function (i, idx) {
                            return (<tr key={idx}>
                                <td>{i.id}</td>
                                <td>{i.calc_name}</td>
                                <td>{i.name}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button variant="primary">Primary</Button>{' '}
                                        <Button variant="secondary">Secondary</Button>{' '}
                                        <Button variant="success">Success</Button>{' '}
                                        <Button variant="warning">Warning</Button>{' '}
                                    </ButtonGroup>
                                </td>
                            </tr>);
                        }
                    )
                }

                </tbody>
            </Table>
        </div>
    );
}