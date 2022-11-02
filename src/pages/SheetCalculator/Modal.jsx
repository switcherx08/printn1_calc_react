import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export function CalculationNameModal(props) {
    const [name, setName] = useState('')
    return (
        <>
            <Modal show={props.show}>
                <Modal.Header closeButton onHide={props.onClose}>
                    <Modal.Title>Сохранение расчета</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Название расчета</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Например: Листовки 130гр. 4+4 'Кафе на Тверской'"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" value={name} onClick={props.setCalcName}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}