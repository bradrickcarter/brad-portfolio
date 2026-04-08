import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BradPortfolio from "./brad-portfolio.jsx";
import ProductDetail from "./product-detail.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BradPortfolio />} />
        <Route path="/about" element={<BradPortfolio />} />
        <Route path="/work/:slug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
