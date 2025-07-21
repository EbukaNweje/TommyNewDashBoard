import {Modal} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import toast, { Toaster } from "react-hot-toast";
import {FaArrowLeftLong} from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { walletInfo } from "../../global/features";

const Deposit = () => {
  const navigate = useNavigate()
  const dispacth = useDispatch()
  const [amount, setAmount] = useState(0.00)
  const [wallet, setWallet] = useState("")
  const [exchangeRate, setExchangeRate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [wallets, setWallets] = useState(null)

   const User = z
    //   .object({ check: z.boolean().refine((val) => val === true, {
    //       message: "You must accept the terms and conditions",
    //     }),
    // })


    //  const {
    //     // register,
    //     handleSubmit,
    //     formState: { errors },
    //   } = useForm({
    //     resolver: zodResolver(User),
    //   });

  const handleOpenModal = () => {
    if (amount !== 0.00 && wallet !== "") {
        setOpenModal(true);
    } else {
        toast.error("Wallet and amount are required");
    }
};

  const handleAmount = (e) =>{
    setAmount(e.target.value)
  }

  const handleWallet = (e) =>{
    setWallet(e.target.value)
  }

  useEffect(() => {
    axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((response) => {     
            const rate = response.data.bpi.USD.rate.replace(",", ""); // assuming USD rate
            setExchangeRate(parseFloat(rate));
        })
        .catch((error) => {
            console.error("Error fetching exchange rate:", error);
        });
}, []); 

const bitcoinValue = amount / exchangeRate;
const roundedNumber = parseFloat(bitcoinValue.toFixed(8));

const handleProceed = () => {
    dispacth(walletInfo({amount, wallet, roundedNumber}))
  navigate("/dashboard/deposit-pay");
};

const handlegetallWalletAddress = async () => {
    await axios.get('https://unixswap-coin-api.vercel.app/api/getallWalletAddress')
        .then(response => {
             setWallets(response?.data?.data)
        })
        .catch(error => {
            console.log(error);
        });
};
useEffect(() => {
    handlegetallWalletAddress()
}, [])

  const Nav = useNavigate()
    return (
        <div className="w-full h-max flex bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 phone:flex-col py-4">
            <div className="w-[60%] phone:w-full h-max flex flex-col gap-2">
                <div className="w-max h-max flex items-center gap-2 text-lg cursor-pointer" onClick={()=> Nav(-1)}>
                    <FaArrowLeftLong onClick={()=> Nav(-1)}/>
                    <p >Back to plan</p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63]">
                    Ready to get started?
                </p>
                <div className="w-full h-max flex flex-col gap-6 mt-4">
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-sm">Choose a wallet to pay from</p>
                        <select
                            name=""
                            id=""
                            onChange={handleWallet}
                            className="w-full h-14 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="">Choose Wallet Address</option>
                            {
                                wallets?.map((props, index)=>(
                                    <option value={props.walletName} key={index}>{props.walletName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-sm">Enter your amount</p>
                        <div className="w-full h-14 flex items-center border border-gray-300 rounded px-4 py-2 bg-white">
                            <input
                                type="Number"
                                className="w-[90%] border-r border-r-gray-200 h-full rounded-l outline-none "
                                placeholder="100000"
                                onChange={handleAmount}
                            />
                            <p className="w-[10%] h-full flex items-center justify-center">
                                USD
                            </p>
                        </div>
                    </div>
                    <div className="w-max h-max text-xs flex items-center">
                        {/* <p className="w-max h-max text-xs flex items-center text-[#8094ae]">
                            Note: Minimum deposit $ <span>100,000.00</span>{" "}
                            &nbsp; and up to &nbsp; $ <span>1,000,000.00</span>
                        </p> */} 
                    </div>
                    {/* <div className="w-full h-max flex items-center">
                        <input
                            type="checkbox"
                            name=""
                            className="w-6 h-6"
                            id=""
                            // required
                            // {...register("check")}
                        />
                        <p className="ml-2 text-sm">
                            I agree to the terms and conditions
                        </p>
                        </div> */}
                        {/* {errors?.check && <span style={{ color: "red" }}>{errors.check.message}</span>} */}
                </div>
            </div>
            <div className="w-[40%] phone:w-full phone:p-0 h-max pl-24 pt-24">
                <div className="w-full h-max rounded border bg-white border-gray-300">
                    <div className="w-full h-max flex flex-col p-6 gap-2">
                        <div className="w-full h-max text-lg text-[#364a63] font-semibold">
                            Your Deposit Details
                        </div>
                        
                        <div className="w-full h-max flex justify-between">
                            <p className="w-full h-max flex flex-col text-xs gap-1 text-[#8094ae]">
                                Fees
                                <span className="text-[#526484] text-sm">
                                    $50
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-max flex justify-between p-6 border-b border-b-gray-300">
                        <p className="w-[70%] h-max flex flex-col text-[#8094ae]">
                            Payment Processor
                        </p>
                        <p className="w-[30%] h-max flex flex-col text-[#526484]">
                            {wallet}
                        </p>
                    </div>
                    <div className="w-full h-max flex flex-col  p-6 border-b border-b-gray-300  gap-2">
                        <div className="w-full h-max flex justify-between">
                            <p className="w-[70%] text-xs h-max flex flex-col text-[#8094ae]">
                                 Amount
                            </p>
                            <p className="w-[30%] h-max flex flex-col text-[#526484]">
                            $ {amount}
                            </p>
                        </div>
                        {/* <div className="w-full h-max flex justify-between">
                            <p className="w-[70%] text-xs h-max flex flex-col text-[#8094ae]">
                                Min Amount
                            </p>
                            <p className="w-[30%] h-max flex flex-col text-[#526484]">
                                1,000,000.00
                            </p>
                        </div> */}
                    </div>
                    <div className="w-full h-20 flex items-center justify-center bg-[#f5f6fa]">
                        <button
                            className="w-max h-max px-5 py-2 rounded text-white font-semibold bg-[#a286f4]"
                            onClick={handleOpenModal}
                        >
                            Confirm & Deposit
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{hidden: true}}
                maskClosable={true}
                closeIcon={false}
            >
                <div className="w-full h-max flex flex-col items-center justify-center gap-4 p-4">
                    <p>Confirm Your Payment</p>
                    <p className="w-full text-center ">
                        This is to confirm your payment of ${amount} ({roundedNumber}
                        BTC) using {wallet} Payment. Please cancel if you did not
                        initiate the transaction.
                    </p>
                    <button
                        className="w-max h-max px-5 py-2 rounded text-white font-semibold bg-[#a286f4]"
                        onClick={handleProceed}
                    >
                        Proceed
                    </button>
                    <p className="w-full text-center ">
                        This transaction will appear on your wallet statement as
                         Deposit.
                    </p>
                    <button
                        className="w-max h-max px-5 py-2 rounded border border-[#a286f4] font-semibold text-[#a286f4]"
                        onClick={() => setOpenModal(false)}
                    >
                        Cancel and return
                    </button>
                </div>
            </Modal>
            <Toaster position ="top-center"/>
        </div>
    );
};

export default Deposit;
