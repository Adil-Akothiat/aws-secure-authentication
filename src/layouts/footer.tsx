import { Link } from "react-router-dom";

const Footer:React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="mb-3">
            <Link to="/" className="text-2xl font-bold text-gray-800">ASA</Link>
            <span className="text-gray-500 ml-2">•</span>
            <span className="text-gray-600 ml-2 text-sm">AWS Secure Authentication</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ASA. All rights reserved. | <a className="text-sky-700 underline" href="https://www.linkedin.com/in/adil-akothiat-560674221/" target="_blank">Akothiat Adil</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;