import {FaArrowLeftLong} from "react-icons/fa6";
import {MdInfo} from "react-icons/md";
import qr from "../../assets/qr.jpeg";
import qrr from "../../assets/qrr.jpeg";
import {toast} from "react-toastify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { walletInfo } from "../../global/features";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const DepositPay = () => {
    const Nav = useNavigate()
    const {walletInfo, id} = useSelector((state) => state)
    console.log(walletInfo, id)

    const [laoding, setLoading] = useState(false)
    const [userDatas, setUserDatas] = useState();
    const [wallets, setWallets] = useState(null)
    const [pay, setPay] = useState()
    const [h, setH] = useState();
    const [coin, setCoin] = useState();
    const [state, setState] = useState({
      value: h,
      copied: false,
    });

    //   wallets?.map((props)=> {walletInfo.wallet === props.walletName ? setH(props?.walletName) : "Loading...";})
      

      const handlegetallWalletAddress = async () => {
        await axios.get('https://unixswap-coin-api.vercel.app/api/getallWalletAddress')
            .then(response => {
                 setWallets(response?.data?.data)
                // dispatch(userData(response?.data.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (wallets && walletInfo) {
          wallets.forEach((props) => {
            if (walletInfo.wallet === props.walletName) {
              setH(props?.walletAddress);
              setCoin(props?.coin)
            }
          });
        }
      }, [wallets, walletInfo]); 
      
  
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            value: h,coin,
          }));
        handlegetallWalletAddress()
    }, [h,coin])

      const handleGetUser = async () => {
        setLoading(true)
        await axios.get(`https://unixswap-coin-api.vercel.app/api/userdata/${id}`)
            .then(response => {
                setLoading(false)
                 console.log(response?.data?.data);
                setUserDatas(response?.data?.data);
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
    }, [id])

    const url = `https://unixswap-coin-api.vercel.app/api/sendpayment/${id}`
      const url2 = `https://unixswap-coin-api.vercel.app/api/deposit/${id}
`
      const data = {
        amount: walletInfo?.amount
      }
      const data2 = {
        amount: walletInfo?.amount,
        coin: coin
      }            
      
      const SendPayMenttoadmin = async()=> {
        axios.post(url2, data2)
        .then(res => {
          console.log(res)
          toast.success(res?.data?.message)
        }).catch((err)=>{
          console.log(err)
          toast.error(err?.res?.data?.message)
        })
      }
      const payNow = async()=> {
        setLoading(true)
        axios.post(url, data)
        .then(res => {
            setLoading(false)
            SendPayMenttoadmin()
            toast.success("Thanks for deposit. We will check your transaction.")
            Nav("/dashboard")
        }).catch((err)=>{
            setLoading(false)
          console.log(err)
        })
      }
    
    
    return (
        <div className="w-full h-max flex bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 phone:flex-col py-4">
            <div className="w-full h-max flex flex-col items-center gap-2">
                <div className="w-full h-max flex items-center gap-2 text-lg cursor-pointer" onClick={() =>Nav(-1)} >
                    <FaArrowLeftLong />
                    <p>Back</p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63] w-full text-center">
                    Payment Processor
                </p>
                <div className="w-[45%] phone:w-full h-max flex flex-col bg-white mt-4 rounded border-gray-300 border">
                    <div className="w-full rounded-t p-4 flex items-center text-xs">
                        <MdInfo color="#364a63" size={15} />
                        Copy and send this exact amount, to the payment address
                        below.
                    </div>
                    {/* <div className="w-full h-44 flex items-center justify-center border-t border-t-gray-300 p-2">
                        {
                            walletInfo?.wallet === "Bitcoin" ? 
                            <img
                            src={qr}
                            alt=""
                            className="w-full h-full object-contain"
                        /> : 
                        <img
                        src={qrr}
                        alt=""
                        className="w-full h-full object-contain"
                    /> 
                        }
                    </div> */}
                    <div className="w-full h-max flex flex-col border-t border-t-gray-300 p-4">
                        <div className="w-full flex flex-col gap-2">
                            <p>{walletInfo?.wallet} Payment Address*</p>
                            <input
                                    type="text"
                                    value={state.value}
                                    readOnly
                                    className="w-full h-10 bg-[#f5f6fa] outline-none rounded border-gray-300 border pl-3"
                                />
                                <CopyToClipboard
                                 text={state.value}
                                 onCopy={() => setState({ copied: true })}
                                 >
                                <button className="w-max h-max px-2 py-2 rounded text-white bg-[#1ee0ac] font-semibold text-xs">
                                {
                                    state.copied ? "copied" : "Copy Wallet"
                                }
                             </button>
                                 </CopyToClipboard>
                        </div>
                       
                        <div className="w-full flex flex-col gap-2">
                            <p>Amount *</p>
                            <input
                                type="text"
                                readOnly
                                className="w-full h-10 bg-[#f5f6fa] outline-none rounded border-gray-300 border pl-3"
                                value={
                                     `$${walletInfo?.amount}`
                                }
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <p>Bitcoin Equivalent*</p>
                            <input
                                type="text"
                                readOnly
                                className="w-full h-10 bg-[#f5f6fa] outline-none rounded border-gray-300 border pl-3"
                                value={
                                    walletInfo?.roundedNumber
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full h-max flex border-t border-t-gray-300 p-4">
                        <div className="w-full h-max flex justify-between py-2">
                            <p className="w-[70%] h-max flex flex-col text-sm text-[#8094ae]">
                                Payment Processor
                            </p>
                            <p className="w-[30%] h-max flex flex-col text-[#526484]">
                           { walletInfo?.wallet}
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-max flex border-t border-t-gray-300 p-4">
                        <div className="w-full h-max flex flex-col gap-2">
                            <div className="w-full h-max text-lg text-[#364a63] font-semibold">
                                Your Deposit Details
                            </div>
                            <div 
                            style={{display: "flex", flexWrap: "wrap"}}
                            className="w-full h-max gap-2">
                                <p className="w-[45%] h-max flex flex-col text-xs gap-1 text-[#8094ae]">
                                    Wallet Name{" "}
                                    <span className="text-[#526484] text-sm">
                                        {walletInfo?.wallet}
                                    </span>
                                </p>
                                <p className="w-[45%] h-max flex flex-col text-xs gap-1 text-[#8094ae]">
                                    Deposited Amount
                                    <span className="text-[#526484] text-sm">
                                    ${walletInfo?.amount}
                                    </span>
                                </p>
                                <p className="w-[45%] h-max flex flex-col text-xs gap-1 text-[#8094ae]">
                                    Depositor Name
                                    <span className="text-[#526484] text-sm">
                                    {userDatas?.firstName}  {userDatas?.lastName}
                                    </span>
                                </p>
                               
                                <p className="w-[45%] h-max flex flex-col text-xs gap-1 text-[#8094ae]">
                                    Fees
                                    <span className="text-[#526484] text-sm">
                                    $50
                                    </span>
                                </p>
                    
                                <p className="w-[45%] h-max flex flex-col text-xs gap-1 text-[#8094ae]">
                                Bitcoin Equivalence
                                    <span className="text-[#526484] text-sm">
                                    { walletInfo?.roundedNumber}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-20 flex items-center justify-center border-t border-t-gray-300 p-4 bg-[#f5f6fa]">
                        <button
                            className="w-max h-max px-5 py-2 rounded text-white font-semibold bg-[#a286f4]"
                            onClick={() => payNow()}
                        >
                             { laoding ? <ClipLoader color='white' className="hover:bg-#a286f4" /> :
                               " Paid" 
                               } 
                            
                        </button>
                    </div>
                    <div className="w-full h-max rounded-b p-4">
                        <p>
                            Note: click paid if have made payment to the above
                            wallet and wait for the system to confirm your
                            deposit!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositPay;
