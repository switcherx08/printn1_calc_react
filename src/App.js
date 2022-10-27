import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calculator1 from "./pages/calc1";
import Navbar from "./pages/Navbar/Navbar";
import Calculator from "./pages/SheetCalculator/calc";
import TestCalculate from "./pages/test1";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <main>
                <Routes>
                    <Route path='/calc' element={< Calculator />}/>
                    <Route path='/test' element={< Calculator1 />}/>
                    <Route path='/test1' element={< TestCalculate />}/>
                </Routes>

            </main>
        </BrowserRouter>

    );
}

export default App;
