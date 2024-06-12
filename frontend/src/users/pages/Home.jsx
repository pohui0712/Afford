import { useEffect, useState } from "react";
import "../../App.css";
import Navbar from "../components/navbar";
import Contact from "../screen/contact";
import HomePage from "../screen/mainpage";
import Planning from "../screen/planningPage";
import Review from "../screen/review";
import Service from "../screen/servicePage";

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
    </div>
  );
}

export default App;
