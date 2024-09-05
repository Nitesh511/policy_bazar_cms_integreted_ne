import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { Button } from "@mui/material";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

const NavbarBelow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) { // Adjust this value to when you want the navbar to be fixed
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className={`bg-white z-30 ${isScrolled ? 'fixed top-0' : 'relative'} w-full transition duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center font-subheading">
            <img className="h-24 w-auto" src={logo} alt="PolicybazarNepal" />
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8 mr-32">
            {["home", "services", "our-story", "contact-us"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => handleLinkClick(link)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-xl font-normal font-subheading ${activeLink === link ? 'text-green-600 border-green-600' : 'text-gray-900 hover:border-green-600'} transition duration-150 ease-in-out`}
              >
                {link.toUpperCase().replace("-", " ")}
              </a>
            ))}
          </div>
          <div className="hidden sm:block bg-green-600 py-2 px-4 rounded-md hover:bg-green-900">
            <button className="text-white font-bold font-subheading rounded-md transition duration-150 ease-in-out">
              Get a Quote
            </button>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <span className="">
                <MenuOpenOutlinedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`sm:hidden fixed inset-0 bg-white shadow-lg z-30 ${isScrolled ? 'mt-[80px]' : 'mt-[210px]'} transition-all duration-300`}>
          <div className="flex justify-end p-4"></div>
          <div className="pt-6 px-4 space-y-6">
            {["home", "about-us", "services", "blog"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => handleLinkClick(link)}
                className={`block text-base font-bold ${activeLink === link ? 'text-green-600 bg-gray-50' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'} transition duration-150 ease-in-out`}
              >
                {link.toUpperCase().replace("-", " ")}
              </a>
            ))}
            <div className="pt-4">
              <Button variant="contained" color="primary" fullWidth>
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarBelow;
