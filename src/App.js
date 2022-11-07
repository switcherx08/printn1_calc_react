import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Pages/Navbar/Navbar";
import Calculator from "./Pages/SheetCalculator/Calculation";
import {SavedCalculations} from "./Pages/SavedCalculations";
import LoginForm from "./Pages/Auth/LoginPage";
import {AdminPanel} from "./Pages/Admin/AdminPanel";
import {AuthProvider, useAuthState} from "./Pages/Auth/AuthContext";


function App() {
    // const userDetails = useAuthState()
    // if (!userDetails.user.id) {
    //     return (
    //         <AuthProvider>
    //             <LoginForm/>
    //         </AuthProvider>)
    // }
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>
                <main>
                    <Routes>
                        <Route path='/login' element={<LoginForm/>}/>
                        <Route path='/calc' element={< Calculator/>}/>
                        <Route path='/saved' element={< SavedCalculations/>}/>
                        <Route path='/admin' element={<AdminPanel/>}/>
                    </Routes>

                </main>
            </BrowserRouter>
        </AuthProvider>


    );
}

export default App;
