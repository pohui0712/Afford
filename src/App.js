import "./App.css";
import HomePage from "./users/screen/mainpage";
import Navbar from "./users/components/navbar";
import WebgiViewer from "./users/components/webgi";
import Planning from "./users/screen/planningPage";
import Service from "./users/screen/servicePage";
import Loader from "./users/components/loader";

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
