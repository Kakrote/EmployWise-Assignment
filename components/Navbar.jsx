"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const dispatch=useDispatch()
    const router=useRouter()

    const handelLogout=()=>{
        dispatch(logout())
        router.push('/')
    }


  return (
    <nav className=" md:w-full w-[370px] min-w-[100%] bg-[#091926] shadow-lg shadow-[#06111A] px-6 py-4 flex justify-between items-center rounded-lg">
      
      {/* Title */}
      <h1 className="text-white text-xl font-semibold">EmployWise Assignment</h1>
      
      {/* Logout Button */}
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={handelLogout}>
        Logout
      </button>

    </nav>
  );
};

export default Navbar;
