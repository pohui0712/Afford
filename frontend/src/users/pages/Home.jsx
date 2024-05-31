import React from 'react'
import HomePage from "../screen/mainpage";
import Navbar from "../components/navbar";
import WebgiViewer from "../components/webgi";
import Planning from "../screen/planningPage";
import Service from "../screen/servicePage";
import Loader from "../components/loader";

const Home = () => {
  return (
    <div>
        <Loader />
        <Navbar />
        <HomePage />
        <WebgiViewer />
        <Service />
        <Planning />
    </div>
  )
}

export default Home