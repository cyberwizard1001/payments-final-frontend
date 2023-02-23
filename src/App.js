import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Vendors from "./pages/Vendors";
import Billers from "./pages/Billers";
import Items from "./pages/Items";
import Orders from "./pages/Orders";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/vendors" element={<Vendors/>}/>
                    <Route path="/billers" element={<Billers/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>

        </div>
    );
}

export default App;