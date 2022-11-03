import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./pages/Navbar/Navbar";
import Calculator from "./pages/SheetCalculator/Calculation";
import {SavedCalculations} from "./pages/SavedCalculations";


function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <main>
                <Routes>
                    <Route path='/calc' element={< Calculator />}/>
                    <Route path='/saved' element={< SavedCalculations />}/>
                </Routes>

            </main>
        </BrowserRouter>

    );
}

export default App;
