// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './components/Product';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import Welcome from './components/Welcome';
import Header from './components/Nav';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/product" element={<Product />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
