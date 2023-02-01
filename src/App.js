import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Pages/Navbar/Navbar";
import Calculator from "./Pages/SheetCalculator/Calculation";
import CalcModel from "./Pages/SheetCalculator/CalcModel";
import {SavedCalculations} from "./Pages/SavedCalculations";
import LoginForm from "./Pages/Auth/LoginPage";
import AdminPanel from "./Pages/Admin/AdminPanel";
import {AuthProvider} from "./Pages/Auth/AuthContext";
import OldSheetMaterialSettings from "./Pages/Admin/_DEPRECATED_MaterialSettings";
import AdminRoute from "./Pages/Admin/AdminRoute";


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
                        <Route path='/sheet-calculation' element={< Calculator/>}/>
                        <Route path='/sheet-calculation/model/:calcId' element={<CalcModel />} />
                        <Route path='/saved' element={< SavedCalculations/>}/>
                        <Route path='/test1' element={<OldSheetMaterialSettings />}/>
                        <Route element={<AdminRoute/>}>
                        <Route element={<AdminPanel/>} path='/admin'></Route>
                        </Route>
                    </Routes>

                </main>
            </BrowserRouter>
        </AuthProvider>


    );
}


export default App;
