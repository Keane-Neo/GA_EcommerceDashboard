import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSidebarClick = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isDrawerOpen={isDrawerOpen}
              handleSidebarClick={handleSidebarClick}
            />
          }
        ></Route>
        <Route
          path="/customers"
          element={
            <Customers
              isDrawerOpen={isDrawerOpen}
              handleSidebarClick={handleSidebarClick}
            />
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <Orders
              isDrawerOpen={isDrawerOpen}
              handleSidebarClick={handleSidebarClick}
            />
          }
        ></Route>
        <Route
          path="/products"
          element={
            <Products
              isDrawerOpen={isDrawerOpen}
              handleSidebarClick={handleSidebarClick}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
