import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
         <Link href="/Attributes">Fill the Form</Link>
      </button>
    </div>
  );
};

export default LandingPage;
