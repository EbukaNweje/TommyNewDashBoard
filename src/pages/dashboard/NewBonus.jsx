import { useState } from "react";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toaster } from "react-hot-toast";
import { toast } from "react-toastify";

const NewBonus = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState(0.00)
 const [wallet, setWallet] = useState("Bitcoin")
 const [openModal, setOpenModal] = useState(false)

  const User = z
       .object({ check: z.boolean().refine((val) => val === true, {
           message: "You must accept the terms and conditions",
         }),
     })
 
      const {
         register,
         handleSubmit,
         formState: { errors },
       } = useForm({
         resolver: zodResolver(User),
       });

       const handleOpenModal = handleSubmit(() => {
        if (amount !== 0.00 && wallet !== "") {
            setOpenModal(true);
            toast.success("successful")
        } else {
            toast.error("Wallet and amount are required");
        }
    });

 const handleAmount = (e) =>{
    setAmount(e.target.value)
  }

  const handleWallet = (e) =>{
    setWallet(e.target.value)
  }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        

        setLoading(true);

        try {
            const response = await axios.post("https://unixswap-coin-api.vercel.app/api/bonus-transfer", {
                wallet,
                amount,
            });
            console.log(response);
            
        } catch (error) {
            console.error("API Error:", error);
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full h-max flex bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 phone:flex-col py-4">
            <div className="w-[60%] phone:w-full h-max flex flex-col gap-2">
                <div className="w-max h-max flex items-center gap-2 text-lg cursor-pointer">
                    <FaArrowLeftLong />
                    <p>History</p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63]">
                    Want to transfer from bonus?
                </p>
                <div className="w-full h-max flex flex-col gap-6 mt-4">
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-sm">Transfer to</p>
                        <select
                            name=""
                            id=""
                            onChange={handleWallet}
                            className="w-full h-14 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="bitcoin">bitcoin</option>
                            <option value="">Select Plan</option>
                            <option value="">Select Plan</option>
                        </select>
                    </div>
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-sm">Enter your amount</p>
                        <div className="w-full h-14 flex items-center border border-gray-300 rounded px-4 py-2 bg-white">
                            <input
                                type="text"
                                onChange={handleAmount}
                                className="w-[90%] border-r border-r-gray-200 h-full rounded-l outline-none "
                            />
                            <p className="w-[10%] h-full flex items-center justify-center">
                                USD
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-max flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            className="w-6 h-6"
                            id=""
                            {...register("check")}
                        />
                        <p className="ml-2 text-sm">
                            I agree to the terms and conditions
                        </p>
                        {errors?.check && <span style={{ color: "red" }}>{errors.check.message}</span>}
                    </div>
                </div>
            </div>
            <div className="w-[40%] phone:w-full phone:p-0 h-max pl-24 pt-32">
                <div className="w-full h-max rounded border bg-white border-gray-300">
                    <div className="w-full h-max flex flex-wrap justify-between p-6 border-b border-b-gray-300">
                        <p className="w-[70%] h-max flex flex-col text-[#8094ae]">
                            Payment Processor
                            <span className="text-xs">
                                No profit at the moment to withdraw
                            </span>
                        </p>
                        <p className="w-[30%] h-max flex flex-col text-[#526484]">
                        {wallet}
                        </p>
                        <p style={{marginTop: '10px'}}
                        className="w-[70%]  h-max flex flex-col text-[#8094ae]">
                            Amount
                            <span className="text-xs">
                                {amount}
                            </span>
                        </p>
                    </div>
                    <div className="w-full h-20 flex items-center justify-center bg-[#f5f6fa]">
                        <button onClick={handleOpenModal}
                        className="w-max h-max px-5 py-2 rounded text-white font-semibold bg-[#a286f4]">
                            Confirm & Withdrawal
                        </button>
                    </div>
                </div>
            </div>
            <Toaster position="top-center"/>
        </div>
    );
};

export default NewBonus;
