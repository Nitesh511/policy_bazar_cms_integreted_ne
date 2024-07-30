import React, { useState, useEffect } from "react";
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
import store from "./store.js";  // Import the Redux store
import InsuranceComponent from "./components/layout/home/home_second.jsx";
import ScrollToTop from "./scrollTop.jsx";
import Our_team from "./components/layout/teams/our_team.jsx";
import Product_details from "./components/layout/product_details_page/product_details.jsx";
import { HelmetProvider } from "react-helmet-async";
import BlogDetails from "./components/layout/blogs/blogs_readmore.jsx";
import Home_third from "./components/layout/home/home_third.jsx";
import ComingSoon from "./components/layout/login/commingSoon.jsx";


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

      <ScrollToTop/>
 
        <Navbar />
        <Routes>
          {/* <Route path="" element={<Home />}></Route> */}
          {/* <Route path="" element={<Home_third/>}></Route> */}
          <Route path="" element={<InsuranceComponent />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/ourstory" element={<Story />}></Route>
          <Route path="/contactus" element={<Contactpage />}></Route>
          <Route path="/our_teams" element={<Our_team/>}></Route>
          <Route path="/products/:slug" element={<Product_details/>}></Route>
          <Route path="/blogs/:slug" element={<BlogDetails/>}></Route>
          <Route path="/commingsoon" element={<ComingSoon/>}></Route>
        </Routes>
    
        <Footer />
        <ThemeProvider theme={theme}>
          <ChatBot
            floating={true}
            cache={false}
            steps={ChatbotSteps}
            floatingIcon={
              <img
                src={GreenRobotAvatar1}
                alt="Chatbot Icon"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#4CAF50",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  zIndex: 1000,
                }}
              />
            }
            botAvatar={GreenRobotAvatar}
            bubbleStyle={{ background: "#4CAF50", color: "white" }}
            style={{ bottom: "10px", right: "20px", position: "fixed" }}
            floatingStyle={{
              width: "60px",
              height: "60px",
              background: "#4CAF50",
              borderRadius: "50%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
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
