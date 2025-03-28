"use client";
import React, { useEffect, useState } from "react";
// import axios from "axios"; 
import UserCard from "@/components/UserCard";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/user/userSlice";
import { CiSearch } from "react-icons/ci";

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [usersPage, setUsersPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers(usersPage));
  }, [usersPage, dispatch]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  return (
    <div className="mx-auto w-[100%] bg-[#2F9135] p-2 min-h-screen flex flex-col gap-4 ">
      <Navbar></Navbar>

      {/* Search Bar */}
      <div className="flex gap-2 px-2 hover:scale-105 duration-500 border-2 border-blue-800 rounded-lg shadow-lg shadow-[#131117be]  bg-amber-50 md:w-1/3 w-[300px] mx-auto focus:ring-2 ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg text-black focus:outline-none  "
          placeholder="Search by name or email..."
        />
       <span className="text-black  flex text-2xl  items-center"> <CiSearch /></span>
      </div>

      {/* Users List */}
      <div className="mt-10 rounded-lg shadow-lg shadow-[#1a231b] bg-amber-300 w-[80%] mx-auto p-3 py-16 flex flex-wrap gap-[50px] justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} data={user} />)
        ) : (
          <h1 className="text-3xl text-white">Nothing found</h1>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setUsersPage(usersPage - 1)}
          disabled={usersPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setUsersPage(usersPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;

