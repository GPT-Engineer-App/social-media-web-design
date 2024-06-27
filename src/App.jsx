import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import PasswordRecovery from "./pages/PasswordRecovery.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/password-recovery" element={<PasswordRecovery />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;