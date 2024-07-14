import React from 'react';
import PolicybazaarLogo from "../../../assets/policybazar_logo.png";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img
        src={PolicybazaarLogo}
        alt="Policybazaar Logo"
        className="w-40 mb-4 animate-logo"
      />
      <div className="w-full h-1 bg-gray-200 fixed top-0">
        <div className="h-1 bg-green-500 animate-loading" />
      </div>
      <style jsx>{`
        .animate-loading {
          animation: loading 5s infinite;
        }

        @keyframes loading {
          0% { width: 0%; }
          50% { width: 90%; }
          100% { width: 110%; }
        }

        .animate-logo {
          animation: scaleLogo 5s infinite alternate;
        }

        @keyframes scaleLogo {
          0% { transform: scale(1); }
          50% { transform: scale(2.7); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
