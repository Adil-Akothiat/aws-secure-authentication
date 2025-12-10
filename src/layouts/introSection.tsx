import React from "react";
import banner from "../assets/banner/banner.png";
import Technologies from "./technologies";
import { Button } from "flowbite-react";
// import { useAuth } from "react-oidc-context";

const IntroSection: React.FC = () => {
  // const auth = useAuth();
  const signinHandler = () => {
    // auth.signinRedirect();
    alert(
    "🚧 This project demo uses AWS Authentication, which is currently disabled due to unpaid billing. "
  );
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div data-aos="fade-up" data-aos-duration="1500">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="mr-2">🚀</span>
                Secure Authentication Made Simple
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                ASA
              </h1>

              <p className="text-2xl text-gray-600 mb-6 font-light">
                AWS Secure Authentication
              </p>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                is a Single-Page Authentication Web App built using TypeScript,
                React, and TailwindCSS, leveraging AWS Cognito for secure user
                authentication and identity management
              </p>
            </div>

            <div className="flex items-center mt-6 gap-x-4" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="100">
              <Button color="dark" size="lg" className="px-6" onClick={signinHandler}>
                Get Started
              </Button>
            </div>
          </div>
          <div className="relative" data-aos="fade-up" data-aos-duration="1800">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <img src={banner} alt="asa banner" />
              </div>
              <p className="text-gray-600">
                Built with AWS Cognito for robust authentication
              </p>
              <Technologies />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🛡️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;