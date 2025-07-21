import axios from "axios";
import { useEffect, useState } from "react";
import {FaChevronRight} from "react-icons/fa";
import {FaArrowRightLong, FaRightLong} from "react-icons/fa6";
import {MdHistory} from "react-icons/md";
import { useSelector } from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";

const Profit = () => {
    const Nav = useNavigate()
    const id = useSelector((state) => state?.id); 
    console.log("deposit", id);

        const [loading, setLoading] = useState(false);
        const [userDatas, setUserDatas] = useState([]);
        const [exchangeRate, setExchangeRate] = useState(null);

    const handleGetAllDeposits = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://unixswap-coin-api.vercel.app/api/getallinterest/${id}`
            );
            console.log('API Response:', response.data.data);
            // const depositsArray = Object.entries(response.data.data).map(([key, value]) => ({ key, value }));
            // console.log("Deposits Array:", depositsArray);
        setUserDatas(response?.data?.data);
    } catch (error) {
        console.error("Error fetching deposits:", error);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        if (id) {
            handleGetAllDeposits();
        }
    }, [id]);

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
    return (
        <div className="w-full h-max bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 py-4">
            <div className="w-full h-max flex flex-col gap-3 mt-4">
                <div className="w-full h-max flex items-center gap-2 text-lg cursor-pointer">
                    <p className="w-full h-max flex justify-between">
                        My Plans{" "}
                        <span className="w-max h-max flex gap-4">
                        <button 
                            className="w-max h-max flex items-center justify-center text-white font-semibold bg-[#a286f4] text-xs px-4 py-2 rounded gap-2"
                            onClick={() => Nav('/dashboard')}
                        >
                            Home
                            <FaArrowRightLong />
                        </button>
                        </span>
                    </p>
                </div>
                <p className="text-4xl font-semibold text-[#364a63] flex flex-col">
                    Profit History ()
                </p>
            </div>
            <div className="w-full h-max flex flex-col gap-2 mt-6">
                <div className="w-full h-max flex flex-col gap-4">
                {
                    loading? (
                        <h3>Loading deposits...</h3>
                    ) : userDatas.length === 0? (
                        <h3>No available deposits</h3>
                    ) : 
                         userDatas.map((e,i) =>(  
                            <div key={i}
                            className="w-full h-max flex items-center justify-between rounded border border-gray-300 p-6 phone:p-4 bg-white">
                                <div className="w-max h-max p-4 rounded-full flex items-center justify-center bg-[#f5f6fa]">
                                    <MdHistory color="#364a63" size={25} />
                                </div>
                                <div className="w-max flex flex-col gap-1">
                                    <p className="text-[#364a63] font-semibold text-sm">
                                        { parseFloat(e?.amount / exchangeRate.toFixed(8))} - {e?.coin}
                                    </p>
                                    <p className="text-[#8094ae] text-sm flex gap-2">
                                        Profit Amount -
                                        <span className="text-[#364a63] font-semibold text-xs">
                                            ${e?.amount}
                                        </span>
                                    </p>
                                </div>
                                <div className="w-max h-max phone:hidden">
                                    <p className="text-[#526484] text-sm flex flex-col gap-1">
                                        {e?.Date}
                                        <span className="text-[#8094ae] text-xs">
                                            Date
                                        </span>
                                    </p>
                                </div>
                                <div className="w-max h-max phone:hidden">
                                    <FaRightLong color="#8094ae" />
                                </div>
                                <div className="w-max h-max phone:hidden">
                                    <p className="text-[#526484] text-sm flex flex-col gap-1">
                                        {e?.transactionType}
                                        <span className="text-[#8094ae] text-xs">
                                            Transaction Type
                                        </span>
                                    </p>
                                </div>
                                {/* <div className="w-max h-max flex flex-col phone:hidden">
                                    <p className="text-[#364a63] font-semibold text-sm">
                                       {e?.mode}
                                    </p>
                                    <p className="text-[#8094ae] text-sm">
                                        Deposit Mode
                                    </p>
                                </div> */}
                                {/* <div className="w-max h-max cursor-pointer hover:bg-[#f5f6fa] p-4 rounded-full transition-all duration-500">
                                <NavLink to={`/dashboard/my-deposit/${e?._id}`}
                                 state={{ deposit: e }}
                                >
                                <FaChevronRight color="#8094ae" />
                                     </NavLink>
                                </div> */}
                            </div>
                         ))
                    
                } 
                </div>
            </div>
        </div>
    );
};

export default Profit;
