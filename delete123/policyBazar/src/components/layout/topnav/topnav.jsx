import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Topnavsicons from "./topnavsicon";

const TopNavbar = () => {
  return (
    <nav className="bg-green-600 py-1 px-6 flex flex-col sm:flex-row justify-between items-center font-subheading font-bold">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <span className="text-white font-bold flex items-center mb-2 sm:mb-0 sm:mr-6">
          <FmdGoodOutlinedIcon className="mr-2" />
          Banshidhar Marg, Chandol
        </span>
        <a
          href="mailto:info@policybazaarnepal.com"
          className="text-white hover:text-white flex items-center"
        >
          <EmailOutlinedIcon className="mr-2" />
          info@policybazaarnepal.com
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center sm:justify-end">
        <a href="#" className="text-gray-400 hover:text-white mx-2">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white mx-2">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white mx-2">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white mx-2">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white mx-2">
          <i className="fab fa-linkedin-in"></i>
        </a>

        <Topnavsicons />
        <button className="bg-red-500 text-white px-4 hidden md:block py-2 rounded-md hover:bg-green-700 mt-4 sm:mt-0">
          LOGIN
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
