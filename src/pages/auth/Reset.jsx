import {FaInstagram, FaTelegram, FaTwitter} from "react-icons/fa";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Reset = () => {
    const [loading, setLoading] = useState(false)
    const currentYear = new Date().getFullYear();

    const Nav = useNavigate();
    const{ id, token }= useParams()
    const User = z.object({
        password: z
          .string()
          .min(8, { message: "Password must be at least 8 characters long" })
          .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, {
            message:
              "Password must be 8 characters long, include an uppercase and special character (!@#$%^&*).",
          }),
        confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
        // check: z.boolean().refine((val) => val === true, {
        //   message: "You must accept the terms and conditions.",
        // }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"], 
      });

      const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(User),
      });
    
      const Onsubmit = async (data, e) => {
            setLoading(true)
             e.preventDefault(); 

            const url = `https://unixswap-coin-api.vercel.app/api/reset-password/${id}/${token}`
            const FormData ={
            password: data.password,
            confirmPassword: data.confirmPassword,
            }
            await axios.post(url, FormData)
            .then(response=>{
                setLoading(false)
                console.log("response:",response);
                toast.success(response.data.message);
                    Nav('/')
                
             })
             .catch(error=>{
                setLoading(false)
               console.log("error:",error)
               toast.error(error.response?.data?.message);
             })
      };
    return (
        <div className="w-full h-screen">
            <div className="w-full h-12 bg-[#f8f8f8] phone:hidden px-48 flex items-center justify-between">
                <div className="w-max flex items-center gap-4">
                    <FaTwitter />
                    <FaTelegram />
                    <FaInstagram />
                </div>
                <div className="w-max flex items-center gap-5 text-sm">
                    <div className="w-max h-max cursor-pointer">Help</div>
                    <div className="w-max h-max cursor-pointer">Support</div>
                    <div className="w-max h-max cursor-pointer">Login</div>
                    <div className="w-max h-max cursor-pointer">Register</div>
                </div>
            </div>
            <div className="w-full h-[calc(100%-6.5rem)] phone:h-[calc(100%-6rem)] bg-[#ffffff] flex items-center justify-center flex-col gap-5">
            <div className="w-[33rem] text-xl text-[#5d3891] font-semibold flex items-start">
                 Reset your Password
                </div>
                <form onSubmit={handleSubmit(Onsubmit)} className="w-max phone:w-full phone:px-4 h-max flex flex-col items-center gap-5">
                    <input
                        type="password"
                        className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
                        placeholder="New password *"
                        {...register("password")}
                    />
                     {errors?.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
                    <input
                        type="password"
                        className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
                        placeholder="confirm password *"
                        {...register("confirmPassword")}
                    />
                     {errors?.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>}
                    <div className="w-[33rem] phone:w-full flex items-start ">
                    <button
                        type="submit"
                        className="w-40 h-12 bg-[#a286f4] text-white font-bold rounded hover:bg-white hover:border hover:border-[#a286f4] hover:text-[#a286f4]"
                    >
                           { loading ? <ClipLoader color='white' /> :
                               "Reset Password" 
                               } 
                    </button>
                    </div>
                    <div className="w-max phone:w-full phone:justify-between phone:gap-0 h-max flex gap-80 text-sm text-[#a286f4]">
                        <NavLink to={"/register"}>
                            <div className="w-[33rem] h-max cursor-pointer flex items-start">
                                Create Account
                            </div>
                        </NavLink>
                    </div>
                    <Toaster/>
                </form>
            </div>
            <div className="w-full phone:h-24 phone:gap-3 phone:flex-col phone:justify-center  phone:py-4 h-14 text-white px-48 flex items-center justify-between bg-[#0e1120]">
                <div className="w-max flex items-center gap-4">
                <p className="flex gap-5 items-center text-white">&copy;  Copy Rights {currentYear}. All Rights Reserved Unixswap-Coin</p>
                </div>
                <div className="w-max flex items-center gap-5 ">
                    <FaTwitter />
                    <FaTelegram />
                    <FaInstagram />
                </div>
            </div>
        </div>
    );
};

export default Reset;
