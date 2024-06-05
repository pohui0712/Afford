import "../../App.css";
import HomePage from "../screen/mainpage";
import Navbar from "../components/navbar";
import WebgiViewer from "../components/webgi";
import Planning from "../screen/planningPage";
import Service from "../screen/servicePage";
import Contact from "../screen/contact";
import Review from "../screen/review";

function App() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <HomePage />
      <Service />
      <Planning />
      <Review />
      <Contact />
      {/* <WebgiViewer /> */}
    </div>
  );
}

export default App;
