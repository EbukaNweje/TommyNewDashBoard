import { useLocation, useNavigate } from "react-router";
import {FaPlus} from "react-icons/fa";
import {FaArrowLeftLong} from "react-icons/fa6";

const DepositHistoryView = () => {
    const Nav = useNavigate()
     const location = useLocation();
        const { deposit } = location.state || {};
    
        if (!deposit) {
            return <h3>No deposit data available.</h3>;
        }
    return (
        <div className="w-full h-max bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 py-4">
            <div className="w-full h-max flex flex-col gap-3 phone:gap-6 mt-4">
                <div className="w-full h-max flex items-center gap-2 text-lg cursor-pointer">
                    <p className="w-full h-max flex gap-2 items-center text-[#8094ae]"  onClick={()=>Nav("/dashboard/my-deposit")}>
                        <FaArrowLeftLong />
                        My Plans
                    </p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63] flex flex-col gap-2 phone:gap-4">
                    Deposit Details
                    <div className="text-sm font-semibold text-[#18c476] flex items-center gap-2">
                        Trx ID: {deposit._id}{" "}
                        <span style={{textTransform: "capitalize"}}
                        className="text-xs w-max px-2 rounded text-green font-normal">
                          {deposit.status == "pending" ?  <p className="text-xs w-max px-2 bg-red-600 rounded text-white font-normal">pending Activation</p> :"confirmed!"}
                        </span>
                    </div>
                </p>
                <div className="w-max h-max flex flex-col bg-white rounded border-gray-300 border p-6 gap-2">
                    <div className="w-full h-max flex justify-between gap-2">
                        <div className="w-max h-max flex flex-col">
                            <p className="w-max flex flex-col gap-1 text-[#364a63] text-2xl ">
                                ${deposit.amount}{" "}
                                <span className="w-max text-sm font-normal text-[#8094ae]">
                                    Deposited Amount
                                </span>
                            </p>
                        </div>
                        {/* <div className="w-max h-full flex items-center pt-4">
                            <FaPlus />
                        </div> */}
                        <div className="w-max h-max flex flex-col">
                            <p className="w-max flex flex-col gap-1 text-[#364a63] text-2xl ">
                                {deposit.coin}
                                <span className="w-max text-sm font-normal text-[#8094ae]">
                                    wallet
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-max flex flex-col gap-4 mt-4">
                        <div className="w-64 h-max flex justify-between border-b border-b-gray-300">
                            <p className="text-sm text-[#8094ae]">Deposited Date</p>
                            <p className="text-sm text-[#526484]">{deposit.depositDate}</p>
                        </div>
                        {/* <div className="w-64 h-max flex justify-between border-b border-b-gray-300">
                            <p className="text-sm text-[#8094ae]">Start Date</p>
                            <p className="text-sm text-[#526484]">
                                Tue, Aug 27, 2024 3:55 AM
                            </p>
                        </div>
                        <div className="w-64 h-max flex justify-between border-b border-b-gray-300">
                            <p className="text-sm text-[#8094ae]">End Date</p>
                            <p className="text-sm text-[#526484]">
                                Sat, Oct 26, 2024 3:55 AM
                            </p>
                        </div> */}
                        <div className="w-64 h-max flex justify-between ">
                            <p className="text-sm text-[#8094ae]">Total</p>
                            <p className="text-sm text-[#526484]">{deposit.total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepositHistoryView