
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Vendors from "./pages/Vendors";
import Billers from "./pages/Billers";
import Items from "./pages/Items";
import Orders from "./pages/Orders";
import { BrowserRouter, BrowserRouter as Router, Route, Routes, } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" exact component={Login} />
      

        
          <Route path="/home" element={<Home/>} />
          <Route path="/vendors" component={<Vendors/>} />
          <Route path="/billers" component={<Billers/>} />
          <Route path="/items" component={<Items/>} />
          <Route path="/orders" component={<Orders/>} />
          
          
            
        </Routes>
        
      <Footer />  
      </BrowserRouter>
      
    </div>
  );
}

export default App;