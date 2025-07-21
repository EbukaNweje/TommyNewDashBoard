import React, { useState } from 'react'
import {FaInstagram, FaTelegram, FaTwitter} from "react-icons/fa";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { FacebookFilled } from "@ant-design/icons";



const Forgottenpassword = () => {
    const Nav = useNavigate()
    const [loading,setLoading] = useState(false)
    const currentYear = new Date().getFullYear();

    const User = z.object({
        email: z.string().email({ message: 'Must be a valid email' }),
    })

      const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(User),
      });
    
      const Onsubmit = async (data, e) => {
        e.preventDefault(); 
        setLoading(true)
        const url = 'https://unixswap-coin.onrender.com/api/forgotpassword'
        const FormData ={
            email: data.email
        }
        console.log(FormData);
        await axios.post(url, FormData)
        .then( res =>{
            setLoading(false)
            console.log(res);
            toast.success(res.data.message) 
            // Nav('/')
        }).catch( Error => {
            setLoading(false)
            console.log(Error);
            toast.error(Error.response.data.message)
        })
      }

      const handleFacebook = (e) => {
        // window.location.href = "https://www.facebook.com/profile.php?id=61574843025485"
        console.log("first")
      }

    return (
        <div className="w-full h-screen">
            <div className="w-full h-12 bg-[#f8f8f8] phone:hidden px-48 flex items-center justify-between">
                <div className="w-max flex items-center gap-4">
                     <FacebookFilled onClick={handleFacebook}/>
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
                    Forgot password
                </div>
                <form onSubmit={handleSubmit(Onsubmit)} className="w-max phone:w-full phone:px-4 h-max flex flex-col items-center gap-5">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="w-[33rem] phone:w-full h-12 rounded border border-gray-100 bg-[#f8f8f8] outline-none pl-4"
                        placeholder="Email *"
                        required
                        {...register('email')}
                    />
                     {errors?.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
                    <button
                        type="submit"
                        // onClick={() => Nav('/reset-password')}
                        className="w-40 h-12 rounded bg-[#a286f4] text-white text-sm font-bold transition-all duration-500 hover:bg-white hover:border-2 hover:text-[#a286f4] hover:border-[#a286f4]"
                    >
                     { loading ? <ClipLoader color='white' /> :
                               "Confirm "}
                    </button>
                    <div className="w-max phone:w-full phone:justify-between phone:gap-0 h-max flex gap-80 text-sm text-[#a286f4]">
                        <NavLink to={"/register"}>
                            <div className="w-max h-max cursor-pointer">
                               Create Account
                            </div>
                        </NavLink>
                    </div>
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
            <Toaster position='top-center'/>
        </div>
    );
}

export default Forgottenpassword