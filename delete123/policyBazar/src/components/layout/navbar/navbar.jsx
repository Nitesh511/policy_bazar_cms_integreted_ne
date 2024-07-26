import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed w-full z-30 top-0 start-0 bg-gradient-to-r from-green-200 to-green-500">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-16" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-red-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-green-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`w-full md:flex md:w-auto md:order-1 ${
              menuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-lg">
              <li>
                <Link
                  to="/"
                  className={`block py-2 px-3 rounded md:p-0 font-sans text-14px ${
                    isActive("/") ? "text-blue-700 " : "text-white"
                  }`}
                  aria-current={isActive("/") ? "page" : undefined}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={`block py-2 px-3 rounded md:p-0 font-sans ${
                    isActive("/products") ? "text-blue-700 " : "text-white"
                  }`}
                  onClick={closeMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/ourstory"
                  className={`block py-2 px-3 rounded md:p-0 font-sans ${
                    isActive("/ourstory") ? "text-blue-700 " : "text-white"
                  }`}
                  onClick={closeMenu}
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className={`block py-2 px-3 rounded md:p-0 font-sans ${
                    isActive("/blogs") ? "text-blue-700 " : "text-white"
                  }`}
                  onClick={closeMenu}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className={`block py-2 px-3 rounded md:p-0 font-sans ${
                    isActive("/contactus") ? "text-blue-700 " : "text-white"
                  }`}
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li className="md:hidden">
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://digital.policybazaarnepal.com/")
                  }
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 font-sans focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex md:order-2">
            <button
              onClick={() =>
                (window.location.href =
                  "https://digital.policybazaarnepal.com/")
              }
              className="w-full text-white bg-blue-700 hover:bg-blue-800 font-sans focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
