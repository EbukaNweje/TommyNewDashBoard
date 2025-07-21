import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { PlanData } from "../../global/features";

const MyPlans = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useSelector((state) => state?.id); 
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userDatas, setUserDatas] = useState([]);

    const handleProceed = () => {
        navigate("/dashboard/Investmentpay");
    };

    const handleGetAllPlans = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://unixswap-coin-api.vercel.app/api/getallplan'
            );
            console.log(response.data.data);
            
            setUserDatas(response.data.data || []);
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            handleGetAllPlans();
        }
    }, [id]);

    console.log("this is what i clicked",plan);

    return (
        <div className="w-full h-max flex px-48 phone:px-6 phone:gap-2 flex-col gap-6 py-10 items-center text-[#8094ae]">
            <p>Choose an option</p>
            <p className="text-[#364a63] text-3xl font-semibold">Pricing/Plans</p>
            <p className="text-sm text-[#526484]">
                Choose your investment plan and start earning.
            </p>
            <div className="w-full flex flex-wrap phone:flex-col justify-between h-max gap-2">
                {loading ? (
                    <h3 className="text-center w-full">Loading plans...</h3>
                ) : userDatas.length === 0 ? (
                    <h3 className="text-center w-full">No plan available</h3>
                ) : (
                    userDatas.map((e, i) => (
                        <div
                            key={i}
                            className="w-1/4 phone:w-full h-max bg-white flex p-10 border flex-col justify-between gap-4 border-gray-300 rounded relative"
                        >
                            {plan === i && (
                                <span className="w-max h-max absolute top-4 right-4">
                                    <FaCheckCircle size={24} color="#a286f4" />
                                </span>
                            )}
                            <div className="w-full h-max flex flex-col gap-4">
                                <div className="w-full flex flex-col items-center gap-4">
                                    <p className=" w-full gap-2 text-center text-[#364a63] flex flex-col text-2xl font-semibold">
                                        {e?.planName}
                                        <span className="text-sm font-normal text-[#8094ae]">
                                             Enjoy entry level of invest & earn money.
                                        </span>
                                    </p>
                                    <div className="w-full flex items-center justify-between">
                                        <p className="w-1/2 flex flex-col text-1xl text-[#526484]">
                                            {e.percentageInterest}%
                                            <span className="text-xs text-[#8094ae]">Interest</span>
                                        </p>
                                        <p className="w-1/2  flex flex-col text-1xl text-[#526484]">
                                            {e.durationDays}
                                            <span className="text-xs text-[#8094ae]">Days</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-3 border-t-2 border-t-[#a286f4] mt-2 pt-5 text-sm text-[#526484]">
                                    <p className="w-full flex justify-between">
                                        Min Deposits <span>${e?.minimumDeposit}</span>
                                    </p>
                                    <p className="w-full flex justify-between">
                                        Max Deposits <span>${e?.maximumDeposit}</span>
                                    </p>
                                    <p className="w-full flex justify-between">
                                        Renewable <span>{e?.renewable}</span>
                                    </p>
                                    <p className="w-full flex justify-between">
                                        Referral Bonus <span>{e?.referralBonus || 50}%</span>
                                    </p>
                                    <p className="w-full flex justify-between">
                                        Turnover <span></span>
                                    </p>
                                </div>
                            </div>
                            <div className="w-full mt-2">
                                {plan === i ? (
                                    <button className="w-full py-3 text-xs font-semibold rounded text-[#fff] bg-[#a286f4]">
                                        PLAN SELECTED
                                    </button>
                                ) : (
                                    <button
                                        className="w-full py-3 text-xs font-semibold rounded text-[#364a63] bg-[#f5f6fa]"
                                        onClick={() => {setPlan(i), dispatch(PlanData(e))}}
                                    >
                                        CHOOSE THIS PLAN
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="w-max mt-4">
                <button
                    className="py-3 px-4 flex items-center gap-2 text-sm font-semibold rounded text-[#fff] bg-[#a286f4]"
                    onClick={handleProceed}
                >
                    Continue to Invest <FaArrowRightLong />
                </button>
            </div>
        </div>
    );
};

export default MyPlans;
