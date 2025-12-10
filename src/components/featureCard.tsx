import type React from "react";
import type { FeatureProps } from "@types/features.ts";

const FeatureCard: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  bgColor = "bg-blue-50",
  iconBgColor = "bg-blue-500",
  iconTextColor = "text-white",
}) => {
  return (
    <div
      className={`${bgColor} rounded-lg p-6 hover:shadow-lg transition-shadow duration-200`}
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <div className="flex items-start space-x-4">
        <div
          className={`${iconBgColor} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          {icon ? icon : <span className={`${iconTextColor} text-xl`}>🔐</span>}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;