import {FaArrowLeftLong} from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2'


const NewWithdrawal = () => {
    const Nav = useNavigate()
    const [amount, setAmount] = useState(0.00)
    const [wallet, setWallet] = useState("")
    const [loading, setLoading] = useState("loading...")
    const [openModal, setOpenModal] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [userDatas, setUserDatas] = useState(null);
    const [clickMe, setClickMe] = useState(false)

    const id = useSelector((state)=> state.id)

    const User = z
    .object({ check: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
  })
     const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(User),
      });

      const handleGetUser = async () => {
        setLoading(true)
        await axios.get(`https://unixswap-coin-api.vercel.app/api/userdata/${id}`)
            .then(response => {
                setLoading(false)
                setUserDatas(response?.data?.data);
                // dispatch(userData(response?.data.data));
                // localStorage.setItem("UserId", response?.data);
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            handleGetUser();
        }
    }, [id]);

  const handleOpenModal = handleSubmit(() => {
    if (amount !== 0.00 && wallet !== "") {
        setOpenModal(true);
    } else {
        toast.error("Wallet and amount are required");
    }
});

  const handleAmount = (e) =>{
    setAmount(e.target.value)
  }
  const url = `https://unixswap-coin-api.vercel.app/api/requestwithdrawcode/${id}`
  const urlll = `https://unixswap-coin-api.vercel.app/api/withdraw/${id}`
  const urlprofit = `https://unixswap-coin-api.vercel.app/api/transferprofittoaccount/${id}`
  const urlemail = `https://unixswap-coin-api.vercel.app/api/withdrawalemailsend/${id}`

  let userName = userDatas?.userName
  let email = userDatas?.email

  const datas = {walletAddress: wallet, amount, coin: "BTC"}

  const datasend = {
       userName, email, amount, dateCreated: new Date().toDateString(),
  }

  const datasa = amount

  const sendSignUpEmail = async () => {
       axios.post(urlemail, datasa)
          .then(response => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      };


  const sendWallet = () => {
          setClickMe(true);
          axios.post(urlll, datas)
          .then(res => {console.log(res), 
              sendSignUpEmail()
              alert(res.data.message)
              window.location.reload()
          })
          .catch((err)=>{
              setClickMe(false)
              console.log(err)
          })
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


  const Wrr = (e) => {
        e.preventDefault()
          setClickMe(true);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Please you need to secure a referral before proceeding with the withdrawal. Or contact your manager",
          }).then(() => {
            setClickMe(false)
            setOpenModal(false)
            
         })
    }
    return (
        <div className="w-full h-max flex bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 phone:flex-col py-4">
            <div className="w-[60%] phone:w-full h-max flex flex-col gap-2">
                <div className="w-max h-max flex items-center gap-2 text-lg cursor-pointer" onClick={()=> Nav('dashboard')}>
                    <FaArrowLeftLong onClick={()=> Nav('dashboard')} />
                    <p>History</p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63]">
                    Want to withdraw from wallet?
                </p>
                <div className="w-full h-max flex flex-col gap-6 mt-4">
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-sm">Enter wallet address</p>
                        <input
                                type="text"
                                className="w-full h-14 flex items-center border border-gray-300 rounded px-4 py-2 bg-white"
                                 placeholder="Wallet Address*"
                                onChange={handleWallet}
                            />
                    </div>

                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-sm">Enter your amount</p>
                        <div className="w-full h-14 flex items-center border border-gray-300 rounded px-4 py-2 bg-white">
                            <input
                                type="text"
                                className="w-[90%] border-r border-r-gray-200 h-full rounded-l outline-none "
                                onChange={handleAmount}
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
                <div className="w-full h-max flex  flex-col justify-between p-6 border-b border-b-gray-300">
                        <p className="w-[70%] h-max flex flex-col text-[#8094ae]">
                            Payment wallet
                        </p>
                        <p className="w-full h-max flex flex-col text-[#526484] ">
                            {wallet}
                        </p>
                    </div>
                        <div className="w-full h-max flex justify-between p-6 border-b border-b-gray-300">
                            <p className="w-[70%] text-xs h-max flex flex-col text-[#8094ae]">
                                 Amount
                            </p>
                            <p className="w-[30%] h-max flex flex-col text-[#526484]">
                            $ {amount}
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
                        onClick={sendWallet}
                    >  { clickMe ? <ClipLoader color='white' /> :  ' Proceed'}
                       
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

export default NewWithdrawal;
