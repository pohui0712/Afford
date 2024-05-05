import "./App.css";
import HomePage from "./screen/mainpage";
import Navbar from "./components/navbar";
import WebgiViewer from "./components/webgi";
import Planning from "./screen/planningPage";
import Service from "./screen/servicePage";
import Loader from "./components/loader";

function App() {
  return (
    <div>
      <Loader />
      <Navbar />
      <HomePage />
      <WebgiViewer />
      <Service />
      <Planning />
    </div>
  );
}

export default App;
