import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Admin } from "./pages/Admin";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { ForgotPassword } from "./components/FogortPasword";
import AccountSettings from "./pages/AccountSettings";
import { PaymentConfirmation } from "./pages/PaymentConfirmation";
import { ProtectedRoute } from "./lib/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<Admin />} allowedEmail="collinsyegon816@gmail.com" />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment-confirmation"
            element={<PaymentConfirmation />}
          />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
