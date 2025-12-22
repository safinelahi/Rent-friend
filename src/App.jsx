import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/LogIn/LogIn";

function App() {
  return (
    <Routes>
      {/* Option 1: Pages WITH Navbar & Footer (Wrapped in Layout) */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      {/* Option 2: Pages WITHOUT Navbar & Footer (Standalone) */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
