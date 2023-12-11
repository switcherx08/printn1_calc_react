import React, { useReducer } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";



const initialState = {
  quantity: "",
  coverMaterial: "",
  pagesMaterial: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "update_quantity":
      return { ...state, quantity: action.payload };
    case "update_cover_material":
      return { ...state, coverMaterial: action.payload };
    case "update_pages_material":
      return { ...state, pagesMaterial: action.payload };
    default:
      return state;
  }
};

const MultipageCalculation = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Quantity: ${state.quantity}`);
    console.log(`Cover Material: ${state.coverMaterial}`);
    console.log(`Pages Material: ${state.pagesMaterial}`);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={state.quantity}
                onChange={(event) =>
                  dispatch({
                    type: "update_quantity",
                    payload: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicCoverMaterial">
              <Form.Label>Cover Material</Form.Label>
              <Form.Control
                as="select"
                value={state.coverMaterial}
                onChange={(event) =>
                  dispatch({
                    type: "update_cover_material",
                    payload: event.target.value,
                  })
                }
              >
                <option value="">Select Cover Material</option>
                <option value="Paper">Paper</option>
                <option value="Leather">Leather</option>
                <option value="Cloth">Cloth</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPagesMaterial">
              <Form.Label>Pages Material</Form.Label>
              <Form.Control
                as="select"
                value={state.pagesMaterial}
                onChange={(event) =>
                  dispatch({
                    type: "update_pages_material",
                    payload: event.target.value,
                  })
                }
              >
                <option value="">Select Pages Material</option>
                <option value="Paper">Paper</option>
                <option value="Rag">Rag</option>
                <option value="Vellum">Vellum</option>
              </Form.Control>
            </Form.Group>
                        <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

    </Container>
  );
};

export default MultipageCalculation;


