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
            } else {
                navigate("/")
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <div className='container' style={{width: '100%'}}>
                {user ? <Alert variant="success"></Alert> : null}
                <Form onSubmit={handleLogin} style={{
                    width: '80%',
                    maxWidth: 500,
                    align: 'center',
                    position: "fixed",
                    top: '10%',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    margin: 'auto'
                }}>
                    {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
                    <h1>Вход в систему Печатная ERP</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="text" placeholder="Enter email"
                                      onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <Form.Text className="text-muted">
                            @printn1
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Запомнить меня"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                </Form>

                {user?.name}
            </div>
        </>)
        ;
}

export default LoginForm;