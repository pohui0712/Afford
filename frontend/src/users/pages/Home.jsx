import { useEffect } from "react";
import { useState } from "react";
import "../../App.css";
import HomePage from "../screen/mainpage";
import Navbar from "../components/navbar";
import WebgiViewer from "../components/webgi";
import Planning from "../screen/planningPage";
import Service from "../screen/servicePage";
import Contact from "../screen/contact";
import Review from "../screen/review";

function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const [isTopOfPage, setTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.getElementById("service");
      if (secondSection) {
        const sectionTop = secondSection.getBoundingClientRect().top;
        if (sectionTop <= 0) {
          setTopOfPage(false);
        } else {
          setTopOfPage(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-smooth">
      <Navbar isTopOfPage={isTopOfPage} />
      <HomePage />
      <Service id="service" />
      <Planning />
      <Review />
      <Contact />
      {/* <WebgiViewer /> */}
    </div>
  );
}

export default App;
