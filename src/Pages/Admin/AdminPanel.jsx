import {logout} from "../Auth/AuthActions";
import {useAuthDispatch, useAuthState} from "../Auth/AuthContext";
import {useEffect} from "react";

export function AdminPanel(props) {
    const dispatch = useAuthDispatch() // read dispatch method from context
    const userDetails = useAuthState()

    useEffect(() => {

    })

    const handleLogout = () => {
        logout(dispatch) //call the logout action
        props.history.push('/login') //navigate to logout page on logout
    }
    return <div style={{padding: 10}}>
        <div>
            <h1>
                Dashboard
            </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <p>Welcome to the dashboard</p>
    </div>
}