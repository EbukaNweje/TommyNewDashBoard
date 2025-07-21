import axios from "axios";
import { useEffect, useState } from "react";
import {CgTranscript} from "react-icons/cg";
import {FaRegCopy} from "react-icons/fa";
import {FaArrowRightLong} from "react-icons/fa6";
import {IoIosInformationCircleOutline} from "react-icons/io";
import {IoLink, IoOpenOutline} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router";
import { userData } from "../../global/features";
import { ClipLoader } from "react-spinners";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { userId } from "../../global/features";

const DashboardHome = () => {
    // const id = useSelector((state)=> state?.id)
    const { userDataId } = useParams();
    const reduxId = useSelector((state) => state?.id);
    const finalId = userDataId || reduxId;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (userDataId) {
          dispatch(userId(userDataId));
          navigate("/dashboard"); // ✅ works now
        }
      }, [userDataId, dispatch, navigate]);

    const [userDatas, setUserDatas] = useState({});
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(false)
    // const userName = userDatas?.userName
    // console.log("this is UserName", userName)
    const [state, setState] = useState({
        value: `https://unixswap-coin.vercel.app/ref/`,
        copied: false,
      });

    const Nav = useNavigate()

   const handleGetUser = async () => {
  if (!finalId) return;
  setLoading(true);
  try {
    const response = await axios.get(
      `https://unixswap-coin-api.vercel.app/api/userdata/${finalId}`
    );
    setUserDatas(response?.data?.data);
    console.log(response?.data?.data);
  } catch (error) {
    toast.error("Error occurred, please try again");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (finalId) {
    handleGetUser();
  }
}, [finalId]);

    const totalBalance = userDatas?.accountBalance + userDatas?.totalProfit
    const totalTradingBalance =  userDatas.totalWithdrawal + userDatas.tradingAccounts    

    // useEffect(() => {
    //     axios
    //         .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    //         .then((response) => {
    //             const rate = response?.data?.bpi?.USD?.rate.replace(",", ""); // assuming USD rate
    //             setExchangeRate(parseFloat(rate));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             toast.error("Error fetching exchange rate:");
    //         });
    // }, []); 

    // const bitcoinValue = userDatas?.accountBalance / exchangeRate;
    // const bitcoinValue2 = userDatas?.totalProfit / exchangeRate;
    // const bitcoinValue3 = userDatas?.bonus / exchangeRate;
    // const bitcoinValue4 = userDatas?.ref / exchangeRate;
    // const bitcoinValue5 = userDatas?.totalDeposit / exchangeRate;
    // const bitcoinValue6 = userDatas?.totalWithdrawal / exchangeRate;
    // const bitcoinValue7 = userDatas?.totalInvestment / exchangeRate;
    // const roundedNumber = parseFloat(bitcoinValue.toFixed(8));
    // const roundedNumber2 = parseFloat(bitcoinValue2.toFixed(8));
    // const roundedNumber3 = parseFloat(bitcoinValue3.toFixed(8));
    // const roundedNumber4 = parseFloat(bitcoinValue4.toFixed(8));
    // const roundedNumber5 = parseFloat(bitcoinValue5.toFixed(8));
    // const roundedNumber6 = parseFloat(bitcoinValue6.toFixed(8));
    // const roundedNumber7 = parseFloat(bitcoinValue7.toFixed(8));

    return (
        <div className="w-full h-max px-48 phone:px-6 py-10 phone:py-6 flex flex-col gap-8 ">
            <div className="w-full h-max flex justify-between">
                <div className="w-max phone:w-full h-max flex flex-col gap-2">
                    <p>Welcome!</p>
                    <div className="w-max phone:w-full flex phone:flex-col phone:items-start phone:gap-4 items-center gap-8">
                        <p className="text-4xl phone:w-full font-semibold text-[rgb(54,74,99)] truncate">
                        { loading ? <ClipLoader color='white' /> :  `${userDatas?.firstName} ${userDatas?.lastName} ${userDatas?.userName}`}
                        </p>
                        <div className="w-max h-max py-2 rounded bg-white border border-gray-300 text-sm font-semibold px-3 flex items-center justify-center gap-2"
                            onClick={() => Nav('my-plans')}
                        >
                            <p>My Plans</p>
                            <FaArrowRightLong/>
                        </div>
                    </div>
                    <p className="text-[rgb(82,100,132)] mt-1">
                        At a glance summary of your investment account. Have
                        fun!
                    </p>
                </div>
            </div>
            <div className="w-full h-max flex items-center pl-8 phone:pl-3 phone:pr-3 py-6 border border-gray-300v gap-2 bg-white rounded cursor-pointer">
                <CgTranscript size={20} className="text-[#a286f4]" />
                <p className="w-max phone:w-full truncate flex items-center gap-2">
                    Do you know you can have a continous profit of 5% passively?
                    <span className="text-[#a286f4] phone:hidden">
                        <IoOpenOutline />
                    </span>
                </p>
            </div>
            <div className="w-full h-max flex flex-col">
                <div className="w-full flex justify-between phone:flex-col h-max gap-8">
                    <div className="w-1/3 phone:w-full h-28 rounded bg-[#0f3951] flex flex-col px-8 pt-5">
                        <div className="w-full h-max flex flex-col justify-between gap-4">
                            <p className="w-max flex items-center gap-2 text-[#1ee0ac]">
                                Available Balance
                                <span>
                                    <IoIosInformationCircleOutline color="rgb(30,224,172)" />
                                </span>
                            </p>
                            <p className="w-full flex items-center justify-between text-3xl text-white">
                                { loading ? <ClipLoader color='white' /> :  `$${userDatas?.accountBalance}`}
                                {/* <span className="text-[#1ee0ac] text-sm">
                               { roundedNumber}
                                </span> */}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3 phone:w-full h-28 rounded bg-[#0f3951] flex flex-col px-8 pt-5">
                        <div className="w-full h-max flex flex-col justify-between gap-4">
                            <p className="w-max flex items-center gap-2 text-[#1ee0ac]">
                                Total Invested
                                <span>
                                    <IoIosInformationCircleOutline color="rgb(30,224,172)" />
                                </span>
                            </p>
                            <p className="w-full flex items-center justify-between text-3xl text-white">
                                { loading ? <ClipLoader color='white' /> :  `$${userDatas?.totalInvestment}`}
                                {/* <span className="text-[#1ee0ac] text-sm">
                                    {roundedNumber7}
                                </span> */}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3 phone:w-full h-28 rounded bg-[#0f3951] flex flex-col px-8 pt-5">
                        <div className="w-full h-max flex flex-col justify-between gap-4">
                            <p className="w-max flex items-center gap-2 text-[#1ee0ac]">
                                Total Profits
                                <span>
                                    <IoIosInformationCircleOutline color="rgb(30,224,172)" />
                                </span>
                            </p>
                            <p className="w-full flex items-center justify-between text-3xl text-white">
                                { loading ? <ClipLoader color='white' /> :  `$${userDatas?.totalProfit}`}
                                {/* <span className="text-[#1ee0ac] text-sm">
                                    {roundedNumber2}
                                </span> */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex phone:flex-col justify-between h-max gap-8">
                <div className="w-1/3 phone:flex-col phone:w-full phone:h-max h-[26rem] bg-white flex p-6 border flex-col justify-between gap-4 border-gray-300 rounded">
                    <div className="w-full h-max flex flex-col gap-4">
                        <div className="w-full h-max flex flex-col gap-2">
                            <p className="text-[#8094ae]">Balance in Account</p>
                            <p className="w-full flex items-center justify-between text-3xl text-[#526484]">
                            ${userDatas?.accountBalance}
                            </p>
                        </div>
                        <div className="w-full h-max flex flex-col gap-2 border-t-2 border-t-[#a286f4] mt-2 pt-5 text-sm text-[#526484]">
                            <p className="w-full h-max flex justify-between">
                                Total Deposit  <span>{ loading ? <ClipLoader color='white' /> :  `$${userDatas?.totalDeposit}`}</span>
                            </p>
                            <p className="w-full h-max flex justify-between">
                                Total Profits <span> { loading ? <ClipLoader color='white' /> :  `$${userDatas?.totalProfit}`}</span>
                            </p>
                            <div className="w-full h-max flex justify-between border-t border-t-gray-300 font-semibold text-black py-2">
                                <p>Total</p>
                                <p>{ loading ? <ClipLoader color='white' /> :  `$${totalBalance}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-max flex">
                        <button className="w-full h-max py-3 font-semibold rounded text-white bg-[#a286f4]"
                        onClick={() => Nav('new-withdrawal')}
                        >
                            Withdraw Funds
                        </button>
                    </div>
                </div>
                <div className="w-1/3 phone:flex-col phone:w-full phone:h-max h-[26rem] bg-white flex p-6 border flex-col justify-between gap-4 border-gray-300 rounded">
                    <div className="w-full h-max flex flex-col gap-4">
                        <div className="w-full h-max flex flex-col gap-2">
                            <p className="text-[#8094ae]">Confirmed Deposits</p>
                            <p className="w-full flex items-center justify-between text-3xl text-[#526484]">
                                { loading ? <ClipLoader color='white' /> :  `$${userDatas?.totalDeposit }`}
                            </p>
                        </div>
                        <div className="w-full h-max flex flex-col gap-2 border-t-2 border-t-[#a286f4] mt-2 pt-5 text-sm text-[#526484]">
                            {/* <p className="w-full h-max flex justify-between">
                                Pending Deposits <span>$10.00</span>
                            </p> */}
                            {/* <p className="w-full h-max flex justify-between">
                                Pending Withdrawal <span>$10.00</span>
                            </p> */}
                            <p className="w-full h-max flex justify-between">
                                Bonus <span>{ loading ? <ClipLoader color='white' /> :  `$ ${userDatas?.bonus}`}  </span>
                            </p>
                            <p className="w-full h-max flex justify-between">
                                Referral Bonus <span>{ loading ? <ClipLoader color='white' /> :  `$${userDatas?.ref}`} </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-max flex flex-col gap-4">
                        <button className="w-full h-max py-3 font-semibold rounded text-white bg-[#a286f4]" onClick={()=>Nav('deposit')}>
                            Deposit
                        </button>
                        <p className="w-full h-max flex flex-col items-center text-sm">
                            Earn up to 10% referral commission.{" "}
                            <span>Refer a friend now!</span>
                        </p>
                    </div>
                </div>
                <div className="w-1/3 phone:flex-col phone:w-full phone:h-max h-[26rem] bg-white flex p-6 border flex-col justify-between gap-4 border-gray-300 rounded">
                    <div className="w-full h-max flex flex-col gap-4">
                        <div className="w-full h-max flex flex-col gap-2">
                            <p className="text-[#8094ae]">My Investment</p>
                            <p className="w-full flex items-center justify-between text-3xl text-[#526484]">
                            ${totalTradingBalance} - Total
                            </p>
                        </div>
                        <div className="w-full h-max flex flex-col gap-2 border-t-2 border-t-[#a286f4] mt-2 pt-5 text-sm text-[#526484]">
                            <p className="w-full h-max flex justify-between">
                                Total withdrawal<span>${userDatas?.totalWithdrawal}</span>
                            </p>
                            {/* <p className="w-full h-max flex justify-between">
                                Trading acoounts Packages <span>{userDatas?.investmentPlan?.leght}</span>
                            </p> */}
                        </div>
                    </div>
                    <div className="w-full h-max flex">
                        <button className="w-full h-max py-3 font-semibold rounded text-white bg-[#a286f4]"
                        onClick={() => Nav("/dashboard/my-plans")}
                        >
                            Investment plan
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-max flex phone:flex-col border border-gray-300 rounded">
                <div className="w-[60%] phone:w-full h-max flex flex-col gap-6 justify-between p-6 bg-white rounded-l">
                    <div className="w-full flex justify-between">
                        <div className="w-max h-max flex flex-col">
                            <p className="w-max text-2xl text-gray-800">
                                Refer Us and Earn
                            </p>
                            <p className="text-[#526484] text-sm">
                                Use Link below to invite your friends
                            </p>
                        </div>
                        <div className="w-max flex">
                            <button className="w-max h-max px-4 py-2 text-xs font-semibold rounded text-white bg-[#a286f4]"
                            onClick={() => Nav('referus')}
                            >
                                Referral List
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-10 flex items-center justify-between border border-gray-300 rounded px-2">
                        <IoLink />
                        <input
                            type="text"
                            className="w-[90%] bg-transparent h-full border-none outline-none"
                            value={state.value}
                        />
                        <CopyToClipboard
                              text={state.value}
                             onCopy={() => setState({ copied: true })}
                                 >
                                  <p className="w-max flex items-center text-sm">
                            <span>
                               {state.copied ? 'copied':  <FaRegCopy />}
                            </span>
                        </p>
                                 </CopyToClipboard>
                    </div>
                </div>
                <div className="w-[40%] phone:w-full h-max flex justify-between rounded-r p-6 text-sm">
                    <p>My Referral</p>
                    <p className="w-max h-max flex flex-col text-xl">
                        0 <span className="text-xs text-[#8094ae]">Joined</span>
                    </p>
                    <p className="w-max h-max flex flex-col text-xl">
                        0 <span className="text-xs text-[#8094ae]">Joined</span>
                    </p>
                </div>
            </div>
            <Toaster position ="top-center"/>
        </div>
    );
};

export default DashboardHome;
