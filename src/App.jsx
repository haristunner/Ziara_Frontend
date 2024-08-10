import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/components.css";
import Landing from "./pages/Landing";
import CreateProduct from "./pages/admin/CreateProduct";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import Carts from "./pages/Carts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:type" element={<Collections />} />{" "}
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin/create_new" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
