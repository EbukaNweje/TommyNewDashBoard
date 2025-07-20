import {Outlet} from "react-router";
import Header from "../../components/Header";

const Dashboard = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className="w-full h-max flex flex-col">
                <div className="w-full h-max">
                    <Header />
                </div>
                <div className="w-full min-h-[calc(100vh-8rem)] h-max mt-16 bg-[#f5f6fa]">
                    <Outlet />
                </div>
                <div className="w-full h-16 bg-[#0f3951]">
                <p className="flex gap-5 items-center text-white">&copy;  Copy Rights {currentYear}. All Rights Reserved Unixswap-Coin</p>
                 </div>
            </div>
        </>
    );
};

export default Dashboard;
