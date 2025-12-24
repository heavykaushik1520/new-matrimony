import React from "react";
import scanner from "../assets/scanner/scanner.jpeg";

function Scanner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Buy Membership
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Please scan and pay{" "}
            <span className="font-semibold text-gray-800">₹999</span> for
            <span className="font-semibold"> 1 month</span> or
            <span className="font-semibold"> ₹1999</span> for
            <span className="font-semibold"> 3 months</span> membership.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            For more details, please contact us through the Contact page.
          </p>
        </div>

        {/* Scanner Image */}
        <img
          src={scanner}
          alt="Scanner"
          className="w-full h-48 sm:h-56 md:h-64 object-contain rounded-xl"
        />

        {/* UPI Details */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">UPI IDs</h3>

          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p className="bg-gray-100 rounded-lg py-2 px-3">
              aditya.katake@ybl
            </p>
            <p className="bg-gray-100 rounded-lg py-2 px-3">
              aditya.katake@ibl
            </p>
            <p className="bg-gray-100 rounded-lg py-2 px-3">
              aditya.katake@axl
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
