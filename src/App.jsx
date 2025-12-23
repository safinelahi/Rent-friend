import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { SpeedInsights } from "@vercel/speed-insights/react"; 

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <SpeedInsights />
    </>
  );
}

export default App;