"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { editUser, deleteUser } from "@/redux/user/userSlice";

const UserCard = ({ data }) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("Users in Redux:", users);
  }, []);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteUser(data.id));
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    await dispatch(editUser({ id: data.id, updatedUser: edited }));
    setEditing(false);
    setLoading(false);
  };

  return (
    <div className="relative w-[350px] bg-white border rounded-lg shadow-lg p-6 flex flex-col items-center">
      {/* Avatar */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-300 w-[80px] h-[80px] rounded-full flex justify-center items-center text-black font-semibold text-lg shadow-md border-4 border-white">
        <Image src={data.avatar} width={80} height={80} alt={data.first_name} loading="lazy" className=" rounded-full mx-auto object-fill" />
      </div>

      {/* Edit & Delete Buttons */}
      <div className="absolute right-3 top-3 flex gap-2 p-1 bg-gray-200 rounded-lg shadow-sm ">
        <button className="p-2 rounded-full hover:bg-gray-300 transition duration-300 hover:scale-105 cursor-pointer" onClick={handleEdit}>
          <CiEdit className="text-gray-700 text-xl" />
        </button>
        <button className="p-2 rounded-full hover:bg-red-500 transition duration-300 hover:scale-105 cursor-pointer" onClick={handleDelete} disabled={loading}>
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <AiOutlineDelete className="text-red-600 hover:text-white text-xl" />
          )}
        </button>
      </div>

      {/* User Info */}
      <div className="mt-10 w-full text-center">
        <ul className="text-gray-700 space-y-2">
          <li className="font-semibold">
            First Name: <span className="font-normal">{data?.first_name || "John"}</span>
          </li>
          <li className="font-semibold">
            Last Name: <span className="font-normal">{data?.last_name || "Doe"}</span>
          </li>
          <li className="font-semibold">
            Email: <span className="font-normal">{data?.email || "johndoe@example.com"}</span>
          </li>
        </ul>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="fixed inset-0 flex z-10 justify-center items-center bg-transparent bg-opacity-50 backdrop-blur-md">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit user</h2>

            <label className="block mb-2"> First-Name</label>
            <input
              type="text"
              value={edited.first_name}
              onChange={(e) => setEdited({ ...edited, first_name: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2"> Last-Name</label>
            <input
              type="text"
              value={edited.last_name}
              onChange={(e) => setEdited({ ...edited, last_name: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2">Email</label>
            <input
              type="text"
              value={edited.email}
              onChange={(e) => setEdited({ ...edited, email: e.target.value })}
              className="w-full p-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md flex items-center" disabled={loading}>
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : null}
                Save
              </button>
              <button onClick={() => setEditing(false)} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
