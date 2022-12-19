import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Pages/Navbar/Navbar";
import Calculator from "./Pages/SheetCalculator/Calculation";
import {SavedCalculations} from "./Pages/SavedCalculations";
import LoginForm from "./Pages/Auth/LoginPage";
import AdminPanel from "./Pages/Admin/AdminPanel";
import {AuthProvider} from "./Pages/Auth/AuthContext";
import OldSheetMaterialSettings from "./Pages/Admin/_DEPRECATED_MaterialSettings";


function App() {
    const accessToken = JSON.parse(localStorage.getItem('currentUser'))?.access_token
    if (!accessToken) {
        return (
            <AuthProvider>
                <BrowserRouter>
                    <LoginForm/>
                </BrowserRouter>
            </AuthProvider>)
    }
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>
                <main>
                    <Routes>
                        <Route path='/calc' element={< Calculator/>}/>
                        <Route path='/saved' element={< SavedCalculations/>}/>
                        <Route path='/admin' element={<AdminPanel/>}/>
                        <Route path='/test1' element={<OldSheetMaterialSettings />}/>
                    </Routes>

                </main>
            </BrowserRouter>
        </AuthProvider>


    );
}


export default App;
