import "./App.css";
import HomePage from "./components/mainpage";
import Navbar from "./components/navbar";
import WebgiViewer from "./components/webgi";

function App() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <WebgiViewer />
    </div>
  );
}

export default App;
