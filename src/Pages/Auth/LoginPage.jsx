import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {loginUser} from "./AuthActions";
import {useAuthDispatch, useAuthState} from "./AuthContext";
import {Alert} from "react-bootstrap";
import {redirect, useNavigate} from "react-router-dom";


function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    

    const dispatch = useAuthDispatch();
    const {user, loading, errorMessage} = useAuthState(); //read the values of loading and errorMessage from context

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(dispatch, {email, password});
            if (!response.user) {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
        navigate("/")
    };

    return (
        <div className="container-xxl">
            {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
            {/*{user ? <Alert variant="success"></Alert> : null}*/}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                                  onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  onChange={(e) => setPassword(e.target.value)} value={password}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {user?.name}
        </div>);
}

export default LoginForm;