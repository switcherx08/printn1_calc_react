import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";

import {fetchTemplateList, fetchCalcViaTemplate} from "./FetchData";
import {CalculationLayout} from "./CalculationLayout";


export function TemplateCalculation(props) {
    const [calcData, setCalcData] = useState(null)
    const [formData, setFormData] = useState({quantity: 100});

    useEffect(() => {
        fetchTemplateList().then(response => {
            setFormData({...formData, templateList: response, template_id: response[0]?.id});
        });
    }, []);

    const setData = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const changeHandler = (e) => {
        setData(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCalcViaTemplate(formData.template_id, formData.quantity).then(r => setCalcData({
            ...calcData,
            calculation: r
        }))
        console.log(calcData)
    }


    return <div className="container-sm">
        <div className="row">
            <div className="col-sm">
                <Form style={{padding: 15}} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formMode">
                        <Form.Label>Шаблон расчета:</Form.Label>
                        <Form.Select aria-label="Режим расчета" placeholder="Mode" name="template_id"
                                     onChange={changeHandler}>
                            {formData?.templateList?.map((t, idx) => {
                                return <option key={'template-' + idx} value={t.id}>{t.name}</option>
                            })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>Количество</Form.Label>
                        <Form.Control type="number" name="quantity"
                                      placeholder="Количество"
                                      onChange={changeHandler}
                                      value={formData?.quantity}
                        />
                        <Form.Text className="text-muted">
                            Количество экземпляров тиража
                        </Form.Text>
                    </Form.Group>
                    <Button type='submit'>Расчет</Button>

                </Form>
            </div>
            <div className="col-sm">
                <CalculationLayout calcData={calcData}/>
            </div>
        </div>
    </div>
}