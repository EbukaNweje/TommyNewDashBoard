import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {FaChevronRight, FaStarOfLife} from "react-icons/fa";
import {FaArrowRightLong, FaRightLong} from "react-icons/fa6";
import { useSelector } from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const Investments = () => {
const id = useSelector((state)=> state.id)
  const [loading, setLoading] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const Nav = useNavigate()

    const handleGetAllInvestments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://unixswap-coin-api.vercel.app/api/getallinvestmentplan/${id}`
            );
            setUserDatas(response.data.data);
            console.log(response.data.data);
            
        } catch (error) {
            toast.error("Error fetching plans, please try again");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetAllInvestments();
        }
    }, [id]);

    return (
        <div className="w-full h-max bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 py-4">
            <div className="w-full h-max flex flex-col gap-3 mt-4">
                <div className="w-full h-max flex items-center gap-2 text-lg cursor-pointer">
                    <p className="w-full h-max flex justify-between">
                        My Plans{" "}
                        <span className="w-max h-max flex gap-4">
                            <button className="w-max h-max flex items-center justify-center text-white font-semibold bg-[#a286f4] text-xs px-4 py-2 rounded gap-2"
                            onClick={() => Nav('/dashboard/my-withdrawal')}
                            >
                                Withdrawals
                                <FaArrowRightLong />
                            </button>
                            <button onClick={() => Nav('/dashboard/Investmentpay')}
                            className="w-max h-max flex items-center justify-center text-[#364a63] font-semibold bg-[#fff] text-xs px-4 py-2 rounded gap-2 border border-gray-300">
                                Invest More
                                <FaArrowRightLong />
                            </button>
                        </span>
                    </p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63] flex flex-col">
                    Invested History
                    <span className="text-sm font-normal">
                        Here is your both active and inactive investement plans.
                    </span>
                </p>
            </div>
            <div className="w-full h-max flex flex-col gap-2 mt-6">
                <p className="text-lg font-semibold text-[#364a63]">
                 Plan ({ userDatas?.length || 0})                </p>
                <div className="w-full h-max flex flex-col gap-4">
                    {
                        loading ? (
                            <h3>Loading...</h3>
                        ) : userDatas?.length === 0 ? (
                            <h3>No available investment</h3>
                        ) : userDatas.map((e, i)=>(
                            <div className="w-full h-max flex items-center justify-between rounded border border-gray-300 p-6 phone:p-4 bg-white">
                        <div className="w-max h-max p-4 rounded-full flex items-center justify-center bg-[#f5f6fa]">
                            <FaStarOfLife color="#364a63" />
                        </div>
                        <div className="w-max flex flex-col gap-1">
                            <p className="text-[#364a63] font-semibold text-sm">
                                {e?.plan?.planName} - {e?.plan?.percentageInterest }% for {e?.plan.durationDays} Days
                            </p>
                            <p className="text-[#8094ae] text-sm flex gap-2">
                                Invested Amount -
                                <span className="text-[#364a63] font-semibold text-xs">
                                    ${e?.amount}
                                </span>
                            </p>
                            <p className="text-[#8094ae] text-sm flex gap-2">
                                Status -
                                <span className="text-[#364a63] font-semibold text-xs">
                                  {/* {e?.status} */}
                                </span>
                            </p>
                            <p className="text-[#a286f4]  text-xs">
                                Click to delete
                            </p>
                        </div>
                        <div className="w-max h-max phone:hidden">
                            <p className="text-[#526484] text-sm flex flex-col gap-1">
                            Start date
                                <span className="text-[#8094ae] text-xs">
                                    {e?.createdAt}
                                </span>
                            </p>
                        </div>
                        <div className="w-max h-max phone:hidden">
                            <FaRightLong color="#8094ae" />
                        </div>
                        <div className="w-max h-max phone:hidden">
                            <p className="text-[#526484] text-sm flex flex-col gap-1">
                            End date 
                                <span className="text-[#8094ae] text-xs">
                                   {e?.endDate}
                                </span>
                            </p>
                        </div>
                        <div className="w-max h-max flex flex-col phone:hidden">
                            <p className="text-[#364a63] font-semibold text-sm">
                                $ {e?.profit} {" "}
                                <span className="text-[#a286f4]">-0.00%</span>
                            </p>
                            <p className="text-[#8094ae] text-sm">
                                Net Profit Earn
                            </p>
                        </div>
                        <div className="w-max h-max cursor-pointer hover:bg-[#f5f6fa] p-4 rounded-full transition-all duration-500">
                            <NavLink to={`/dashboard/my-invests/${e?._id}`}
                            state={{ investment: e }}
                            >
                                <FaChevronRight color="#8094ae" />
                            </NavLink>
                        </div>
                    </div>
                        ))
                    }
                </div>
            </div>
          <Toaster position = "top-center" />
        </div>
    );
};

export default Investments;
