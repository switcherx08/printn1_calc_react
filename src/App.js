import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calculator1 from "./pages/calc1";
import Navbar from "./pages/Navbar/Navbar";
import Test from "./pages/test";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <main>
                <Routes>
                    <Route path='/calc' element={< Calculator1/>}/>
                    <Route path='/test' element={< Test/>}/>


                </Routes>

            </main>
        </BrowserRouter>

    );
}

export default App;
