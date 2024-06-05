import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Contact = () => {
  return (
    <div
      id="contact"
      className="h-screen flex flex-col p-10 bg-black text-white"
    >
      <div className="flex justify-center items-center mt-5">
        <div className="text-3xl font-bold">VISIT OUR SERVICES</div>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-col justify-center space-y-6 w-1/6">
          <a
            href="https://www.facebook.com/FordMalaysia/"
            className="text-blue-600 hover:text-blue-800 text-left"
          >
            <FaFacebook className="w-10 h-10" />
          </a>
          <a
            href="https://www.instagram.com/fordmalaysia/?hl=en"
            className="text-pink-500 hover:text-pink-700"
          >
            <RiInstagramFill className="w-10 h-10" />
          </a>
          <a
            href="https://www.ford.com/"
            className="text-red-500 hover:text-red-700"
          >
            <FaGoogle className="w-10 h-10" />
          </a>
        </div>

        <div className="flex flex-col justify-center space-y-6 text-left text-lg w-2/6 ">
          <div className="font-pt-sans">
            <h3 className="font-bold">ADDRESS:</h3>
            <p>No.16, Jln BK 1/13</p>
            <p>Bandar Kinrara</p>
            <p>47180 Puchong, Selangor</p>
          </div>
          <div className="font-pt-sans">
            <h3 className="font-bold">PHONE:</h3>
            <p>03-8080 9228</p>
          </div>
          <div className="font-pt-sans">
            <h3 className="font-bold">EMAIL:</h3>
            <p>afford@gmail.com</p>
          </div>
          <div className="font-pt-sans">
            <h3 className="font-bold">BUSINESS HOURS:</h3>
            <p>Monday-Saturday: 9.00 AM - 6.00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="flex items-center w-3/6 grayscale invert">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63746.40485830259!2d101.5786289486328!3d3.054415100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4b18b9caab63%3A0xcbb0269e14a4d182!2sFord%20Puchong%2C%20Star%20East%20Enterprise%2C%20Showroom%2C%20Service%20Centre%2C%20Spare%20Parts!5e0!3m2!1sen!2smy!4v1717252219615!5m2!1sen!2smy"
            width="100%"
            height="500"
            loading="lazy"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>

      <footer className="text-lg text-center font-pt-sans-bold italic mt-10">
        CopyRight © Afford
      </footer>
    </div>
  );
};

export default Contact;
