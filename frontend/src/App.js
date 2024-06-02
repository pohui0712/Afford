import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Routes, Route } from "react-router-dom";
import Home from "./users/pages/Home";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";

function App() {
  return (
    <Theme>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Theme>
  );
}

export default App;
