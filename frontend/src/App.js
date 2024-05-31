import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./users/pages/Home";
import Login from "./users/components/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
