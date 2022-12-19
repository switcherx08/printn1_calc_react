import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export function AddMaterialCardModal(props) {
    const [formData, setFormData] = useState({
        materialName: '', materialCost: 0, materialWidth: 0, materialHeight: 0
    })

    return (<>
            <Modal show={props.show}>
                <Modal.Header closeButton onHide={props.onClose}>
                    <Modal.Title>Добавление материала</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="materialName">
                            <Form.Label>Название материала</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={formData?.materialName}
                                onChange={(e) => setFormData({...formData, materialName: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="materialWidth">
                            <Form.Label>Ширина листа</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                value={formData?.sheetWidth}
                                onChange={(e) => setFormData({...formData, materialWidth: e.target.value})}
                            />
                            <Form.Text className="text-muted">мм.</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="materialHeight">
                            <Form.Label>Длина листа</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                value={formData?.sheetHeight}
                                onChange={(e) => setFormData({...formData, materialHeight: e.target.value})}
                            />
                            <Form.Text className="text-muted">
                            мм.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="materialCost">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                value={formData.materialCost}
                                onChange={(e) => setFormData({...formData, materialCost: e.target.value})}
                            />
                            <Form.Text className="text-muted">
                                руб.
                            </Form.Text>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => {
                        props.addData(formData)
                        props.onClose()}
                    }>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}