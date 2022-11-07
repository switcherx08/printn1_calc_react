import {logout} from "../Auth/AuthActions";
import {useAuthDispatch, useAuthState} from "../Auth/AuthContext";
import {useEffect} from "react";
import { useNavigate} from "react-router-dom";

export function AdminPanel(props) {
    const dispatch = useAuthDispatch() // read dispatch method from context
    const userDetails = useAuthState()
    const navigate = useNavigate()

    useEffect(() => {

    })

    const handleLogout = () => {
        logout(dispatch) //call the logout action
        return navigate("/login");
    }
    return <div style={{padding: 10}}>
        <div>
            <h1>
                Dashboard
            </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <p>Welcome to the dashboard, {userDetails?.user?.email}</p>
    </div>
}