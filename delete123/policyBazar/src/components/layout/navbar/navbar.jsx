import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { LuLogIn } from "react-icons/lu";

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
      <nav className="fixed w-full z-30 top-0 start-0 bg-white  border-b-2 border-green-200">
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
                  className={`block py-2 px-3 rounded md:p-0 font-sans text-14px font-normal ${
                    isActive("/") ? "text-blue-700 " : "text-black"
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
                    isActive("/products") ? "text-blue-700 " : "text-black"
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
                    isActive("/ourstory") ? "text-blue-700 " : "text-black"
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
                    isActive("/blogs") ? "text-blue-700 " : "text-black"
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
                    isActive("/contactus") ? "text-blue-700 " : "text-black"
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
                  className="w-full text-white rounded-full font-sans border-b-4 border-blue-700 text-lg py-2  bg-blue-500"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex md:order-2">
            <LuLogIn className="mt-3 w-full h-full" />

            <Link to={"/commingsoon"}
            
              className="w-full text-black  font-sans hover:text-red-900   font-medium rounded-lg text-lg px-1 py-2 text-center "
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
