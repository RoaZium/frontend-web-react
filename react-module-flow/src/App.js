import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./layouts/authentication/sign-in";
import FlowPage from "./pages/flowpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/FlowPage" element={<FlowPage />} />
      </Routes>
    </Router>
  );
}

export default App;
