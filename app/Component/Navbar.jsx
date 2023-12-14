"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index === activeItem ? null : index);
  };

  return (
    <nav className="flex justify-center p-2 rounded-b-xl">
      <ul className="flex flex-row sm:flex-row gap-6 sm:gap-12 justify-center items-center">
        <li
          className={`font-bold text-xs sm:text-base border border-solid rounded-xl p-2 hover:bg-slate-100 hover:cursor-pointer ${
            activeItem === 0 ? "underline underline-thick bg-slate-100" : ""
          }`}
          onClick={() => handleItemClick(0)}
        >
          <Link href="/Attributes">Attributes</Link> 
        
        </li>
        <li
          className={`font-bold text-xs sm:text-base border border-solid rounded-xl p-2 hover:bg-slate-100 hover:cursor-pointer ${
            activeItem === 1 ? "underline underline-thick bg-slate-100" : ""
          }`}
          onClick={() => handleItemClick(1)}
        >
          <Link href="/ARIDetails"> ARI Details</Link>
         
        </li>
        <li
          className={`font-bold text-xs sm:text-base border border-solid rounded-xl p-2 hover:bg-slate-100 hover:cursor-pointer ${
            activeItem === 2 ? "underline underline-thick bg-slate-100" : ""
          }`}
          onClick={() => handleItemClick(2)}
        >
          <Link href="/AddressDeatails"> Address Details</Link>
         
        </li>
        <li
          className={`font-bold text-xs sm:text-base border border-solid rounded-xl p-2 hover:bg-slate-100 hover:cursor-pointer ${
            activeItem === 3 ? "underline underline-thick bg-slate-100" : ""
          }`}
          onClick={() => handleItemClick(3)}
        >
          
          <Link href="/Description">Description</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
