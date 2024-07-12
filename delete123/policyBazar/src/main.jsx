import React from "react";
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
import ChatBot from 'react-simple-chatbot';
import GreenRobotAvatar from "./assets/chatbot.jpg"; 
import GreenRobotAvatar1 from "./assets/chatbot1.png";
import { ThemeProvider } from 'styled-components';
import ChatbotSteps from "./chatbotsteps.jsx";

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#11cf59',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="" element={<Home/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/products" element={<Products/>}></Route>
      <Route path="/ourstory" element={<Story/>}></Route>
      <Route path="/contactus" element={<Contactpage/>}></Route>
    </Routes>
    <Footer />
    <ThemeProvider theme={theme}>
    <ChatBot
      floating={true}
      cache={false}
  
      steps={ChatbotSteps}
      floatingIcon={<img src={GreenRobotAvatar1} alt="Chatbot Icon" style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#4CAF50', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', zIndex: 1000 }} />}
      botAvatar={GreenRobotAvatar} // Update avatar prop here
      bubbleStyle={{ background: '#4CAF50', color: 'white' }}
      style={{ bottom: '10px', right: '20px', position: 'fixed' }}
      floatingStyle={{
        width: '60px', // Adjust size as needed
        height: '60px', // Adjust size as needed
        background: '#4CAF50', // Green background color
        borderRadius: '50%', // Makes it round
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Adds a shadow
      }}
      headerTitle="Policybazar Nepal"


   
      userDelay={1000}
    />

    </ThemeProvider>
  
  </BrowserRouter>
);
