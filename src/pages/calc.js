import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from "react";

// calc_parser.add_argument('quantity', required=True, location='json', type=int)
// calc_parser.add_argument('width', required=True, location='json', type=int)
// calc_parser.add_argument('height', required=True, location='json', type=int)
// calc_parser.add_argument('bleeds', required=True, location='json', type=int)
// calc_parser.add_argument('template_id', required=False, default=None, location='json', type=int)

function Calculator() {
    const [templateId, setTemplateId] = useState('');
    function onSubmit(e) {
        console.log(templateId);
        e.preventDefault();
        const params = {
            template_id: templateId,
            quantity: 1,
            width: 210,
            height: 297,
            bleeds: 3
        };
        const url = 'http://localhost:9000/api/v1/calculation?' + Object.entries(params).map(([key, value]) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }).join('&');
        fetch(url).then(resp => {
            return resp.json();
        }).then(data => console.log(data));
    }


    return (<Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="number" placeholder="Template ID" value={templateId} onChange={e => {
                setTemplateId(e.target.value);
            }}/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out"/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    );
}

export default Calculator;