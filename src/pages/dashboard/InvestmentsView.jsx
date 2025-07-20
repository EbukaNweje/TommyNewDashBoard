import {FaPlus} from "react-icons/fa";
import {FaArrowLeftLong} from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";

const InvestmentView = () => {
    const Nav = useNavigate()
    const location = useLocation();
    const { investment } = location.state || {};

    if (!investment) {
        return <h3>No investment data available.</h3>;
    }

    return (
        <div className="w-full h-max bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 py-4">
            <div className="w-full h-max flex flex-col gap-3 phone:gap-6 mt-4">
                <div className="w-full h-max flex items-center gap-2 text-lg cursor-pointer">
                    <p className="w-full h-max flex gap-2 items-center text-[#8094ae]"  onClick={()=>Nav('my-invest')}>
                        <FaArrowLeftLong />
                        My Plans
                    </p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63] flex flex-col gap-2 phone:gap-4">
                                {investment?.plan?.planName} - {investment?.plan?.percentageInterest }% for {investment?.plan.durationDays} Days
                    <div className="text-sm font-semibold text-[#18c476] flex items-center gap-2">
                        Trx ID: {investment._id}{" "}
                        <span className="text-xs w-max px-2 bg-red-600 rounded text-white font-normal">
                            Inactive (Pending Activation)!
                        </span>
                    </div>
                </p>
                <div className="w-max h-max flex flex-col bg-white rounded border-gray-300 border p-6 gap-2">
                    <div className="w-max h-max flex gap-2">
                        <div className="w-max h-max flex flex-col">
                            <p className="w-max flex flex-col gap-1 text-[#364a63] text-2xl ">
                                ${investment?.amount}{" "}
                                <span className="w-max text-sm font-normal text-[#8094ae]">
                                    Invested Amount
                                </span>
                            </p>
                        </div>
                        <div className="w-max h-full flex items-center pt-4">
                            <FaPlus />
                        </div>
                        <div className="w-max h-max flex flex-col">
                            <p className="w-max flex flex-col gap-1 text-[#364a63] text-2xl ">
                                {investment?.profit}
                                <span className="w-max text-sm font-normal text-[#8094ae]">
                                    Profit Earned
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-max flex flex-col gap-4 mt-4">
                        <div className="w-64 h-max flex justify-between border-b border-b-gray-300">
                            <p className="text-sm text-[#8094ae]">Duration</p>
                            <p className="text-sm text-[#526484]">{investment?.plan.durationDays}  Days</p>
                        </div>
                        <div className="w-64 h-max flex justify-between border-b border-b-gray-300">
                            <p className="text-sm text-[#8094ae]">Start Date</p>
                            <p className="text-sm text-[#526484]">
                            {investment?.createdAt}
                            </p>
                        </div>
                        <div className="w-64 h-max flex justify-between border-b border-b-gray-300">
                            <p className="text-sm text-[#8094ae]">End Date</p>
                            <p className="text-sm text-[#526484]">
                            {investment?.endDate}
                            </p>
                        </div>
                        <div className="w-64 h-max flex justify-between ">
                            <p className="text-sm text-[#8094ae]">Interest</p>
                            <p className="text-sm text-[#526484]">{investment?.plan?.percentageInterest }%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentView;
