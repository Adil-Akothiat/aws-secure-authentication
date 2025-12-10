import type React from "react";
import { useAuth } from "react-oidc-context";
import { formatDate } from "@utils/formatDate";
import { truncateString } from "@utils/stringUtils";

const Dashboard: React.FC = () => {
    const auth = useAuth();
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6" data-aos="fade-up" data-aos-duration="600">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">
                                {user?.profile?.email?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {String(user?.profile?.["cognito:username"] || "User")}
                            </h1>
                            <p className="text-gray-600">{user?.profile?.email}</p>
                            <div className="flex items-center mt-2">
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                    user?.profile?.email_verified ? 'bg-green-500' : 'bg-red-500'
                                }`}></div>
                                <span className="text-sm text-gray-500">
                                    {user?.profile?.email_verified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up" data-aos-duration="700">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-blue-600 text-sm">🔐</span>
                            </div>
                            Authentication
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Username</label>
                                <p className="text-gray-800 font-mono text-sm">
                                    {String(user?.profile?.["cognito:username"] || "N/A")}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Subject ID</label>
                                <p className="text-gray-800 font-mono text-sm">
                                    {truncateString(user?.profile?.sub || "N/A")}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Event ID</label>
                                <p className="text-gray-800 font-mono text-sm">
                                    {truncateString(String(user?.profile?.event_id || "N/A"))}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up" data-aos-duration="800">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-green-600 text-sm">⏰</span>
                            </div>
                            Session Info
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Issued At</label>
                                <p className="text-gray-800 text-sm">
                                    {user?.profile?.iat ? formatDate(user.profile.iat) : "N/A"}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Expires At</label>
                                <p className="text-gray-800 text-sm">
                                    {user?.profile?.exp ? formatDate(user.profile.exp) : "N/A"}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Time Remaining</label>
                                <p className="text-gray-800 text-sm">
                                    {user?.profile?.exp ? 
                                        `${Math.max(0, Math.floor((user.profile.exp * 1000 - Date.now()) / 60000))} minutes` : 
                                        "N/A"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up" data-aos-duration="900">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-purple-600 text-sm">🎫</span>
                            </div>
                            Token Info
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Audience</label>
                                <p className="text-gray-800 font-mono text-sm">
                                    {truncateString(String(user?.profile?.aud || "N/A"))}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Issuer</label>
                                <p className="text-gray-800 font-mono text-sm">
                                    {truncateString(user?.profile?.iss || "N/A")}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Origin JTI</label>
                                <p className="text-gray-800 font-mono text-sm">
                                    {truncateString(String(user?.profile?.origin_jti || "N/A"))}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up" data-aos-duration="1000">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-slate-600 text-sm">👤</span>
                            </div>
                            Account Status
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Email Verified</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    user?.profile?.email_verified ? 
                                    'bg-green-100 text-green-800' : 
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {user?.profile?.email_verified ? 'Verified ✓' : 'Not Verified ✗'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Session Status</span>
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active ✓
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;