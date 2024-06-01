import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Routes, Route } from "react-router-dom";
import Home from "./users/pages/Home";
import Login from "./users/pages/Login";

function App() {
  return (
    <Theme>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Theme>
  );
}

export default App;
