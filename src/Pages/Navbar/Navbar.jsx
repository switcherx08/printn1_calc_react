import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from "react-router-dom";
import {useAuthDispatch, useAuthState} from "../Auth/AuthContext";
import {logout} from "../Auth/AuthActions";


function BasicExample() {
    const dispatch = useAuthDispatch()
    const userDetails = useAuthState()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout(dispatch) //call the logout action
        return navigate("/login");
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" href='#home'>PrintCalc</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/calc" href='#calc'>Листовой калькулятор</Nav.Link>
                        <Nav.Link as={Link} to="/saved" href="#test">Сохраненные расчеты</Nav.Link>
                        <Nav.Link as={Link} to="/test1" href="#test1">test1</Nav.Link>
                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="#action/3.1">Сохраненные расчеты</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.2">*/}
                        {/*        Another action*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider/>*/}
                        {/*    <NavDropdown.Item href="#action/3.4">*/}
                        {/*        Separated link*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    {userDetails.user.role >= 2 ?
                        <Nav.Link as={Link} to="/admin"> Администрирование </Nav.Link>
                        : null}
                    {userDetails.user ? <Nav className="justify-content-end">
                            <Nav.Link> {userDetails?.user.name}</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
                        </Nav>
                        :  <Nav.Link as={Link} to="/login">Войти</Nav.Link>}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;