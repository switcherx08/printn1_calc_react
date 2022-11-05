import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./pages/Navbar/Navbar";
import Calculator from "./pages/SheetCalculator/Calculation";
import {SavedCalculations} from "./pages/SavedCalculations";
import LoginForm from "./pages/Auth/LoginPage";
import {AuthContext} from "./Auth";


function App() {
    // let y = localStorage.getItem('y')
    // if (y === '0'){
    //     return (<LoginForm/>)
    // }
    return (
        <BrowserRouter>
            <AuthContext.Provider value={0}>
                <Navbar/>
                <main>
                    <Routes>
                        <Route path='/login' element={<LoginForm/>}/>
                        <Route path='/calc' element={< Calculator/>}/>
                        <Route path='/saved' element={< SavedCalculations/>}/>
                    </Routes>

                </main>
            </AuthContext.Provider>
        </BrowserRouter>


    );
}

export default App;
