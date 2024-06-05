import "./App.css";
import HomePage from "./users/screen/mainpage.jsx";
import Navbar from "./users/components/navbar.jsx";
import WebgiViewer from "./users/components/webgi";
import Planning from "./users/screen/planningPage.jsx";
import Service from "./users/screen/servicePage.jsx";
import Loader from "./users/components/loader";
import Contact from "./users/screen/contact.jsx";
import Review from "./users/screen/review.jsx";

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
