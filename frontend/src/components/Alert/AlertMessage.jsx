import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const AlertMessage = ({ type, message }) => {
  let icon;
  let bgStyle;
  let textStyle;
  let borderStyle;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-red-500 text-2xl" />;
      bgStyle = "bg-red-50 sm:bg-white/80 backdrop-blur-md";
      textStyle = "text-red-800";
      borderStyle = "border border-red-200 sm:border-l-4 sm:border-l-red-500 shadow-sm";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="text-teal-500 text-2xl" />;
      bgStyle = "bg-teal-50 sm:bg-white/80 backdrop-blur-md";
      textStyle = "text-teal-800";
      borderStyle = "border border-teal-200 sm:border-l-4 sm:border-l-teal-500 shadow-sm";
      break;
    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-2xl" />
      );
      bgStyle = "bg-blue-50 sm:bg-white/80 backdrop-blur-md";
      textStyle = "text-blue-800";
      borderStyle = "border border-blue-200 sm:border-l-4 sm:border-l-blue-500 shadow-sm";
      break;
    default:
      icon = null;
      bgStyle = "";
      textStyle = "";
      borderStyle = "";
  }

  return (
    <div
      className={`flex items-center p-4 rounded-xl ${bgStyle} ${textStyle} ${borderStyle} space-x-3 transition-all duration-300 transform hover:scale-[1.01]`}
      role="alert"
    >
      <div className="shrink-0">
        {icon}
      </div>
      <span className="text-sm font-semibold tracking-wide">{message}</span>
    </div>
  );
};

export default AlertMessage;
