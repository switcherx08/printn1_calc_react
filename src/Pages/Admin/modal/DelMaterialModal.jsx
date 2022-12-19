import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function DelMaterialModal(props) {

  return (
    <>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление материала</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы точно хотите удалить материал?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button variant="primary" confirmed="true" onClick={(e) => {
                  props.onConfirm(e)
                  props.onClose()
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}