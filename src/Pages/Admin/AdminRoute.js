import {Outlet} from "react-router-dom";

const AdminRoute = () => {
    const isAdmin = JSON.parse(localStorage.getItem('currentUser'))?.user.role
    return (
        isAdmin >= 3 ? <Outlet/> : <h1>Not authorized as admin</h1>
    )
}

export default AdminRoute