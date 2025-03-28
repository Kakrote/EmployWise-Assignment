"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch=useDispatch()
  const router=useRouter()
  const token=localStorage.getItem('token')
  

  useEffect(() => {
    if(token){
      router.push('/dashBord')
    }
  }, [])
  


  const BaseUrl="https://reqres.in/api/"

  const onSubmit=async(data)=>{
      try{
        const response=await axios.post(`${BaseUrl}login`,data);
        if(response.data.token){
          dispatch(setToken(response.data.token))
          router.push('/dashBord')

        }
      }
      catch(errors){
        alert("Invalid Credentials! Try again.");
      }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2F9135] ">
      <div className="w-full max-w-md bg-[#14404e]  shadow-lg shadow-[#324341] rounded-xl text-white  p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block  text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:scale-105 duration-700 shadow-md shadow-[#615d5d]"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block  text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:scale-105 duration-700 shadow-md shadow-[#615d5d]"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit px-10 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:scale-105 duration-700 hover:bg-blue-600 transition ">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
