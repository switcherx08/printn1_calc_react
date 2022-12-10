import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import SheetMaterialSettings from "./MaterialSettings";


function AdminPanel() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
              <Nav.Item>
              <Nav.Link eventKey="users">Пользователи</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="materials">Материалы</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="equipment">Оборудование</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="materials">
              <SheetMaterialSettings />
            </Tab.Pane>
            <Tab.Pane eventKey="second">

            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default AdminPanel;