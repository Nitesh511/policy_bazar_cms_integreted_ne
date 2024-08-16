import React, { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./components/layout/navbar/navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/layout/home/home.jsx";
import Footer from "./components/layout/footer/footer.jsx";
import Blogs from "./components/layout/blogs/blogs.jsx";
import Products from "./components/layout/products/products.jsx";
import Story from "./components/layout/ourstory/ourstory.jsx";
import Contactpage from "./components/layout/contactus/contactus.jsx";
import ChatBot from "react-simple-chatbot";
import GreenRobotAvatar from "./assets/chatbot.jpg";
import GreenRobotAvatar1 from "./assets/chatbot1.png";
import { ThemeProvider } from "styled-components";
import ChatbotSteps from "./chatbotsteps.jsx";
import LoadingScreen from "./components/layout/loadingscreen/loadingScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js"; // Import the Redux store
import InsuranceComponent from "./components/layout/home/home_second.jsx";
import ScrollToTop from "./scrollTop.jsx";
import Our_team from "./components/layout/teams/our_team.jsx";
import Product_details from "./components/layout/product_details_page/product_details.jsx";
import BlogDetails from "./components/layout/blogs/blogs_readmore.jsx";
import Home_third from "./components/layout/home/home_third.jsx";
import ComingSoon from "./components/layout/login/commingSoon.jsx";
import DematFAQ from "./components/layout/faq/life_insurance_faq.jsx";
import DematFAQHealth from "./components/layout/faq/faq_health.jsx";
import DematFAQMarine from "./components/layout/faq/faqmarine.jsx";
import DematFAQPersonalAccident from "./components/layout/faq/personalaccident.jsx";
import DematFAQMTerm from "./components/layout/faq/termlife.jsx";
import bot1 from "./assets/mas1.png";
import bot2 from "./assets/mas2.png";
import './components/layout/CSS/bot.css';
import DematFAQProperty from "./components/layout/faq/faq_property.jsx";
import DematFAQEndoment from "./components/layout/faq/faq_endoments.jsx";
import DematFAQTravels from "./components/layout/faq/faq_travels.jsx";
import DematFAQTrekkers from "./components/layout/faq/faq_trekkers.jsx";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#11cf59",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const MainApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout duration as needed
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            {/* <Route path="" element={<Home />}></Route> */}
            {/* <Route path="" element={<Home_third/>}></Route> */}
            <Route path="/" element={<InsuranceComponent />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/ourstory" element={<Story />}></Route>
            <Route path="/contactus" element={<Contactpage />}></Route>
            <Route path="/our_teams" element={<Our_team />}></Route>
            <Route path="/products/:slug" element={<Product_details />}></Route>
            <Route path="/blogs/:slug" element={<BlogDetails />}></Route>
            <Route path="/commingsoon" element={<ComingSoon />}></Route>
            <Route path="/faq" element={<DematFAQ/>}></Route>
            <Route path="/faqhealth" element={<DematFAQHealth/>}></Route>
            <Route path="/faqmarine" element={<DematFAQMarine/>}></Route>
            <Route path="/faqpersonal" element={<DematFAQPersonalAccident/>}></Route>
            <Route path="/faqterm" element={<DematFAQMTerm/>}></Route>
            <Route path="/faqproperty" element={<DematFAQProperty/>}></Route>
            <Route path="/faqendoment" element={<DematFAQEndoment/>}></Route>
            <Route path="/faqtravels" element={<DematFAQTravels/>}></Route>
            <Route path="/faqtrekkers" element={<DematFAQTrekkers/>}></Route>
          </Routes>

          <Footer />
          <ThemeProvider theme={theme}>
       
            <ChatBot
              floating={true}
              cache={false}
              steps={ChatbotSteps}
              floatingIcon={
                <img
                  src={bot1}
                  alt="Chatbot Icon"
                  className="bounce-animation"
                  style={{
                    width: "90px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    zIndex: 1000,
                  
                  }}
                />
              }
              botAvatar={bot2}
              bubbleStyle={{ background: "#4CAF50", color: "white" }}
              style={{ bottom: "10px", right: "20px", position: "fixed" }}
              floatingStyle={{
           
               
                borderRadius: "50%",
              
              }}
              headerTitle="Policybazar Nepal"
              userDelay={1000}
            />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<MainApp />);
