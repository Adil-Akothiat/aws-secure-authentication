import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";
import AuthLoader from "../components/loader";
import { Button, Dropdown, DropdownItem } from "flowbite-react";

const Header: React.FC = () => {
  const auth = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const signinHandler = () => {
    auth.signinRedirect();
  };

  const signoutHandler = () => {
    auth.signoutRedirect({
      extraQueryParams: {
        client_id: import.meta.env.VITE_CLIENT_ID,
        logout_uri:
          import.meta.env.VITE_SIGNOUT_REDIRECT_URI || "http://localhost:5173/",
      },
    });
  };

  if (auth.isLoading) return <AuthLoader />;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <Link
                  className="text-gray-800 text-2xl font-bold hover:text-slate-500 transition-colors"
                  to="/"
                >
                  ASA
                </Link>
                <p className="text-gray-500 text-xs">
                  AWS Secure Authentication
                </p>
              </div>
            </div>

            {!auth.isAuthenticated ? (
              <button
                onClick={signinHandler}
                className="bg-slate-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </button>
            ) : (
              <div className="flex items-center gap-x-3">
                <Dropdown label="More" outline={true} color="gray" size="sm">
                  <DropdownItem>
                    <Link to="qrcode-scanner">QR Code Scanner</Link>
                  </DropdownItem>
                </Dropdown>
                <Button color="red" outline={true} onClick={()=> setShowLogoutModal(true)} size="sm">
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={signoutHandler}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;