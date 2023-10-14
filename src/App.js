import './App.css';
import List from './pages/list';
import MovieDetail from './pages/detail';
import { Routes, Route } from "react-router-dom";
import Cart from './pages/cart';
import { ShoppingContextProvider } from './context/shoppingContext';
import Payment from './pages/payment';

function App() {
  return (
    <ShoppingContextProvider>
      <Routes>
      <Route path="/" element={<List />} />
      <Route path="/movie/:movieId" element={< MovieDetail/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      </Routes>
    </ShoppingContextProvider>
    
  );
}

export default App;
