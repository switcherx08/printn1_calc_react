import {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";

function Test() {
    const [calc, setCalc] = useState([])
    const url = 'http://localhost:9500/api/v1/calculation'
    const params = {
        quantity: 100,
        width: 210,
        height: 297,
        bleeds: 3,
        chromaticity_front: 4,
        chromaticity_back: 0,
        material_id: 1,
        calculation_mode_id: 1
    }


    useEffect(() => {
        const fetchCalculation = async () => {
            const response = await fetch(url + '?' + new URLSearchParams(params));
            const respJson = await response.json();
            if (response.statusCode !== 200) {
                // throw new Error(respJson);
            }
            return respJson;
        };
        fetchCalculation().then(response => {
            console.log(response);
            setCalc(response.calculation);
        });
    }, []);
    return (<div>

        <Form.Group className="mb-3" controlId="formMaterial">
                <Form.Select aria-label="Материал">

                    <option selected disabled>Материал</option>
                    {Object.entries({1: 'one', 2: 'two', 3: 'three'}).map(([key, value]) => {
                        return <option value={key} key={'material-option-' + key}> {value}</option>;
                    })}


                </Form.Select>
            </Form.Group>
    </div>)
}



export default Test