
import {Drawer} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import {CiSettings} from "react-icons/ci";
import {FaArrowAltCircleUp, FaCaretDown, FaCubes, FaDownload, FaHome, FaRegUser, FaUserCircle} from "react-icons/fa";
import {GiHamburgerMenu} from "react-icons/gi";
import {IoIosNotificationsOutline} from "react-icons/io";
import {IoLogOutOutline} from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import Logo from '../assets/logo.png'
import { ClipLoader } from "react-spinners";
import { logout } from "../global/features";
import { toast } from "react-toastify";
// import DownLoadButton from "./DownLoadButton"
const Header = () => {
    const [drop1, setDrop1] = useState(false);
    const [drop2, setDrop2] = useState(false);
    const [drop3, setDrop3] = useState(false);
    const [drop4, setDrop4] = useState(false);
    const [drop5, setDrop5] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [laoding, setLoading] = useState(false)
    const [userDatas, setUserDatas] = useState();
    const [dropInvestment, setDropInvestment] = useState(false);

    const handleDropInvestment = () => {
        setDropInvestment(!dropInvestment);
    };

    const [box, setBox ] = useState([1,2,3, 4])

    const handleDelete =(filterItem)=>{
        const update = box.filter((item)=> item !== filterItem )
        setBox(update)

    }

    const dispatch = useDispatch()
    const Nav = useNavigate()
    const id = useSelector((state)=> state.id)

    const handleGetUser = async () => {
        setLoading(true)
        await axios.get(`https://unixswap-coin-api.vercel.app/api/userdata/${id}`)
            .then(response => {
                setLoading(false)
                setUserDatas(response?.data?.data);
            })
            .catch(error => {
                setLoading(false)
                toast.error("error fetching details , please try again");
            });
    };
  
    const Profil =  userDatas?.firstName.charAt(0).toUpperCase()
    
    useEffect(() => {
        if (id) {
            handleGetUser();
        }
    }, [id]);
    
    
const handleLogout = () =>{
    dispatch(logout())
    Nav("/")
}

const handleNavToPlan = () => {
    Nav("/dashboard");
    setOpenSideBar(false)
};


    return (
        <>
            <div className="w-full h-16 bg-[#0f3951] px-48 phone:px-6 fixed top-0 left-0 z-10">
                <div className="w-full h-full flex justify-between items-center">
                    <div className="w-max h-full flex items-center gap-10">
                        <div className="w-max h-full flex items-center phone:gap-4">
                            <GiHamburgerMenu
                                className="hidden phone:flex text-white"
                                size={26}
                                onClick={() => setOpenSideBar(!openSideBar)}
                            />
                              <img src={Logo} alt="Logo" className="w-40 h-full"/>
                              {/* <DownLoadButton/> */}
                        </div>
                        <div className="w-max h-full flex gap-2 text-white phone:hidden">
                            <NavLink to={"/dashboard"}>
                                <div className="w-max h-full border-t-[3px] px-4  border-t-[#a287f4] flex items-center font-semibold uppercase">
                                    Overview
                                </div>
                            </NavLink>
                            <div className="w-max h-full border-t-[3px] px-4 border-t-[#a287f4] flex items-center font-semibold">
                                <div
                                    className="relative w-max h-full"
                                    onMouseEnter={() => setDrop1(!drop1)}
                                    onMouseLeave={() => setDrop1(!drop1)}
                                >
                                    <div className="w-max h-full flex items-center gap-2">
                                        TRANSACTION{" "}
                                        <FaCaretDown
                                            className={`transition-all duration-300 ${
                                                drop1 ? "-rotate-180" : ""
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`w-28 h-max flex flex-col absolute -bottom-[2.7rem] shadow border border-gray-100 left-0 bg-white text-sm dropdown ${
                                            drop1 ? "active" : ""
                                        }`}
                                    >
                                        <NavLink to={"deposit"}>
                                            <div className="w-full pl-2 text-gray-600 h-10 border-b-gray-300 flex items-center cursor-pointer"
                                            >
                                                Deposit
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="w-max h-full border-t-[3px] px-4 border-t-[#a287f4] flex items-center font-semibold">
                                <div
                                    className="relative w-max h-full"
                                    onMouseEnter={() => setDrop2(!drop2)}
                                    onMouseLeave={() => setDrop2(!drop2)}
                                >
                                    <div className="w-max h-full flex items-center gap-2">
                                        TRANSFER
                                        <FaCaretDown
                                            className={`transition-all duration-300 ${
                                                drop2 ? "-rotate-180" : ""
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`w-28 h-max flex flex-col absolute -bottom-[5.2rem] shadow border border-gray-100 left-0 bg-white text-sm dropdown ${
                                            drop2 ? "active" : ""
                                        }`}
                                    >
                                        <NavLink
                                            to={"/dashboard/new-withdrawal"}
                                        >
                                            <div className="w-full pl-2 text-gray-600 h-10 border-b border-b-gray-300 flex items-center cursor-pointer">
                                                Profit
                                            </div>
                                        </NavLink>
                                        <NavLink to={"/dashboard/new-bonus"}>
                                            <div className="w-full pl-2 text-gray-600 h-10  flex items-center cursor-pointer">
                                                Bonus
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="w-max h-full border-t-[3px] px-4 border-t-[#a287f4] flex items-center font-semibold">
                                <div
                                    className="relative w-max h-full"
                                    // onMouseEnter={() => setDrop3(!drop3)}
                                    // onMouseLeave={() => setDrop3(!drop3)}
                                    onClick={() => setDrop3(!drop3)}
                                >
                                    <div className="w-max h-full flex items-center gap-2">
                                        HISTORY
                                        <FaCaretDown
                                            className={`transition-all duration-300 ${
                                                drop3 ? "-rotate-180" : ""
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`w-28 h-max flex flex-col absolute -bottom-[7.7rem] shadow border border-gray-100 left-0 bg-white text-sm dropdown ${
                                            drop3 ? "active" : ""
                                        }`}
                                    >
                                        <NavLink to={"/dashboard/my-invest"}>
                                            <div className="w-full pl-2 text-gray-600 h-10 border-b border-b-gray-300 flex items-center cursor-pointer">
                                                Investment
                                            </div>
                                        </NavLink>
                                        <NavLink to={"/dashboard/my-deposit"}>
                                            <div className="w-full pl-2 text-gray-600 h-10  flex items-center cursor-pointer">
                                                Deposit
                                            </div>
                                        </NavLink>
                                        <NavLink
                                            to={"/dashboard/my-withdrawal"}
                                        >
                                            <div className="w-full pl-2 text-gray-600 h-10  flex items-center cursor-pointer">
                                                Withdrawal
                                            </div>
                                        </NavLink>
                                        <NavLink
                                            to={"/dashboard/profit"}
                                        >
                                            <div className="w-full pl-2 text-gray-600 h-10  flex items-center cursor-pointer">
                                                Profit
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-max h-full flex  phone:flex-row-reverse items-center gap-4 relative"
                        onMouseLeave={() => setDrop4(false)}
                    >
                        <div
                            className="w-max h-max flex gap-2 items-center cursor-pointer text-white "
                            onClick={() => setDrop4(!drop4)}
                        >
                            <div className="w-max h-max">
                                <FaUserCircle size={28} onClick={() => Nav('profile')}/>
                            </div>
                            <div className="w-max h-max flex flex-col phone:hidden">
                                    {/* {
                                        userDatas?.verify === true ? <p className="text-xs font-semibold text-green-500"> verified </p> : <p className="text-xs font-semibold text-red-500"> Unverified</p>
                                    } */}
                                <p className="w-max flex items-center text-xs font-semibold">
                                 { laoding ? <ClipLoader color='white' /> :  `${userDatas?.firstName} ${userDatas?.lastName} ${" "}`}
                                    <span>
                                        <FaCaretDown />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="w-max h-max"  >
                            <IoIosNotificationsOutline
                                size={28}
                                className="cursor-pointer text-white"
                                onClick={()=> setDrop5(!drop5)}
                            />
                        </div>
                        <div className="w-max h-max phone:hidden">
                            <IoLogOutOutline
                                size={28}
                                className="cursor-pointer text-white"
                            />
                        </div>
                        <div
                            className={`w-full phone:w-[18rem]  h-[32rem] rounded bg-white shadow absolute -bottom-[32rem] left-0 phone:-left-[14rem] dropdown ${
                                drop4 ? "active" : ""
                            }`}
                        >
                            <div className="w-full h-max flex gap-2 items-center justify-center pl-4 py-5 border-t-[3px] rounded-t border-t-[#a287f4]">
                                <div className="w-max h-max flex items-center">
                                    <span className="w-10 h-10 rounded-full bg-[#12dba4] flex items-center justify-center text-white">
                                        {Profil}
                                    </span>
                                </div>
                                <div className="w-max h-max flex flex-col">
                                    <p   style={{ textTransform: "capitalize" }}
                                    className="truncate text-sm font-semibold text-[#364a63]">
                                         {
                                        userDatas?.verify === true ? <p className="text-xs font-semibold text-green-500"> verified </p> : <p className="text-xs font-semibold text-red-500"> Unverified</p>
                                    }
                                    { laoding ? <ClipLoader color='white' /> :  `${userDatas?.firstName} ${userDatas?.lastName}${" "}`}
                                    </p>
                                    <p className="truncate text-xs text-[#8094ae]">
                                    { laoding ? <ClipLoader color='white' /> :  `${userDatas?.email}`}
                                    </p>
                                </div>
                                 <NavLink to={"/dashboard/profile"}>
                                 <div className="w-max">
                                    <CiSettings
                                        size={20}
                                        className="text-[#364a63]"
                                    />
                                </div>
                                </NavLink>
                                
                            </div>
                            <div className="w-full h-max flex flex-col gap-2 justify-center pl-8 py-5 border-t border-t-gray-300">
                                <p className="text-sm font-semibold text-[#8094ae]">
                                    ACCOUNT BALANCE
                                </p>
                                <p className="text-[#a287f4] text-xl">
                                { laoding ? <ClipLoader color='white' /> :  `${userDatas?.accountBalance}$`}
                                   
                                </p>
                                <p className="text-sm text-[#8094ae]">
                                    Active Plans <span>0 plans</span>
                                </p>
                                <p className="text-sm text-[#a287f4] flex items-center gap-2">
                                    Withdraw Balance
                                    <span>
                                        <IoLogOutOutline />
                                    </span>
                                </p>
                            </div>
                            <div className="w-full h-max flex flex-col gap-4 justify-center pl-8 py-5 border-t border-t-gray-300 text-[#526484]">
                                {/* <NavLink to={"/dashboard/profile"}>
                                    <div className="w-full h-8 flex items-center hover:text-[#a287f4] cursor-pointer transition-all duration-500 gap-2 ">
                                        <FaRegUser size={17} />
                                        <p className="text-sm">View Profile</p>
                                    </div>
                                </NavLink> */}
                                <NavLink to={"/dashboard/profile"}>
                                    <div className="w-full h-8 flex items-center hover:text-[#a287f4] cursor-pointer transition-all duration-500 gap-2">
                                        <FaRegUser size={17} />
                                        <p className="text-sm">
                                            Account Setting
                                        </p>
                                    </div>
                                </NavLink>
                                <NavLink to={'/dashboard/referus'}>
                                    <div className="w-full h-8 flex items-center hover:text-[#a287f4] cursor-pointer transition-all duration-500 gap-2">
                                        <FaRegUser size={17} />
                                        <p className="text-sm">Refer Users</p>
                                    </div>
                                </NavLink>
                                <div className="w-full h-8 flex items-center hover:text-[#a287f4] cursor-pointer transition-all duration-500 gap-2">
                                    <FaRegUser size={17} />
                                    <p className="text-sm">Support</p>
                                </div>
                            </div>
                            <div onClick={() => handleLogout()}
                            className="w-full h-12 flex items-center hover:text-[#a287f4] cursor-pointer transition-all duration-500 gap-2 border-t border-t-gray-300 py-2 pl-8 text-[#526484]">
                                <IoLogOutOutline size={17} />
                                <p className="text-sm">Sign out</p>
                            </div>
                        </div>
                        <div
                            className={`w-full phone:w-[18rem] h-max  rounded bg-white shadow absolute top-[60px] phone:-left-[14rem] flex flex-col items-center gap-5 overflow-y-scroll dropdown ${
                                drop5 ? "active" : ""
                            }`}
                            style={{
                                padding: "15px",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none", 
                            }}
                        >
                            { box.length < 0 ? 
                            box.map((e, i) => (
                                <div className="w-full h-max flex flex-col gap-3" key={i}>
                                <div className="w-full h-max flex flex-col  gap-1">
                                    
                                    <p className="w-[100%] text-[ #364a63] text-l w-max flex justify-between gap-5 items-center font-semibold">
                                    <p className="w-max h-max flex justify-end bg-[red] text-[white] text-xs	font-size: 0.85rem; "  style={{
                                        padding: '4px'}}>
                                        New
                                    </p>
                                        <MdCancel color="red" onClick={() => handleDelete(e)} cursor={'pointer'}/>
                                    </p>
                                    <p className="w-[100%] text-[ #364a63] text-m	font-size: 0.95rem;"> STARTER PLAN</p>
                                    <div className="w-full flex flex-col gap-2">
                                        <p className="w-1/2 h-max flex items-center gap-2 text-1xl text-[#526484] text-xs	font-size: 0.75rem;">
                                            525%
                                            <span className="text-1x1 flex items-center text-[#8094ae]">
                                                Interest
                                            </span>
                                        </p>
                                        <p className="w-1/2 h-max flex items-center gap-2 text-1xl text-[#526484] text-xs	font-size: 0.75rem;">
                                            30
                                            <span className="text-1x1 text-[#8094ae]">
                                                Days
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-max flex flex-col gap-2  text-sm text-[#526484]">
                                    <p className="w-[100%] h-max flex items-center text-[#526484] gap-2 text-xs	font-size: 0.75rem;">
                                        Min Deposits 
                                        <span className="text-xs flex items-center text-[#8094ae]">{ laoding ? <ClipLoader color='white' /> :  `${userDatas?.accountBalance}$`}                                        </span>
                                    </p>
                                    <p className="w-[100%] h-max flex items-center text-[#526484] gap-2 text-xs	font-size: 0.75rem;">
                                        Max Deposits 
                                        <span className="text-xs flex items-center text-[#8094ae]" > { laoding ? <ClipLoader color='white' /> :  `${userDatas?.accountBalance}$`}                                        </span>
                                    </p>
                                </div>
                                <button
                                        className="w-full h-max py-3 text-xs font-semibold rounded text-[#ffff] bg-[#a286f4] border border-gray-300 hover:bg-[#bca6fd] hover:border-[#cfd4e3] hover:text-[#ffff] transition-all duration-200"
                                    >
                                        CHOOSE THIS PLAN
                                    </button>
                            </div>
                             )) : <span className="text-xs font-semibold rounded text-[grey]"> NO NOTIFICATIONS YET </span>
                              
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                open={openSideBar}
                onClose={() => setOpenSideBar(false)}
                placement="left"
                maskClosable={true}
                width={300}
                title={"MENU"}
            >
                <div className="seesidebar w-64 h-[100vh] bg-white overflow-y-auto ">
                <div className="w-full h-max px-5 flex flex-col gap-4">
                    <div
                        onClick={handleNavToPlan}
                        className={`${
                            location.pathname === "/dashboard"
                                ? "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                : "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                        } transition-all w-full text-sm h-12 cursor-pointer rounded-md flex items-center gap-4 font-bold px-2 `}
                    >
                        <FaHome className="w-5 h-5" />
                        <p className="">Dashboard</p>
                    </div>
                    <div className="w-full h-max flex flex-col gap-2 ">
                        <div
                            className="w-full h-12 flex text-sm transition-all hover:text-[0.90rem] hover:bg-gray-100  hover:text-[#0e4152] cursor-pointer items-center justify-between text-[#777777]"
                            onClick={handleDropInvestment}
                        >
                            <div className="w-full h-full flex items-center gap-4 font-bold px-2 ">
                                <FaCubes className="w-5 h-5" />
                                <p className="">HISTORY</p>
                            </div>
                            <div
                                className={`w-6 h-full  flex items-center transition-all duration-700 justify-center ${
                                    dropInvestment
                                        ? "transform -rotate-180"
                                        : ""
                                }`}
                            >
                                <FaCaretDown />
                            </div>
                        </div>
                        <div
                              className={`w-full h-max flex flex-col cursor-pointer gap-2 text-sm text-[#777777] ${
                                dropInvestment
                                  ? "max-h-[999px] overflow-hidden transition-all duration-700 ease-in-out"
                                  : "max-h-0 opacity-0 transition-all duration-700 pointer-events-none overflow-hidden"
                              }`}
                        >
                            <NavLink
                                to={"/dashboard/my-invest"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                < div onClick={()=>setOpenSideBar(false)} className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Investment</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/dashboard/profit"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                < div onClick={()=>setOpenSideBar(false)} className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Profit</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/dashboard/my-deposit"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded text-[#777] hover:text-[#0e4152]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div onClick={()=>setOpenSideBar(false)} className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Deposit</p>
                                </div>
                            </NavLink>
                            <NavLink
                                to={"/dashboard/my-withdrawal"}
                                className={({isActive}) =>
                                    !isActive
                                        ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded text-[#777] hover:text-[#0e4152]"
                                        : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                                }
                            >
                                <div onClick={()=>setOpenSideBar(false)} className="w-full  h-12 text-sm hover:text-[0.90rem] cursor-pointer transition-all  flex gap-2 items-center px-4">
                                    <span className="w-1 h-1 rounded-full bg-[#777777]"></span>
                                    <p className="">Withdrawal</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <NavLink
                        to={"/dashboard/deposit"}
                        className={({isActive}) =>
                            !isActive
                                ? "transition-all  hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                : "transition-all bg-[#0e4152]  hover:bg-[#0e4152] text-white hover:text-[0.90rem]"
                        }
                    >
                        <div onClick={()=>setOpenSideBar(false)} className="w-full h-12 text-sm rounded-md hover:text-[0.90rem] cursor-pointer transition-all flex items-center gap-4 font-bold px-2 ">
                            <FaUserCircle className="w-5 h-5" />
                            <p className="">DEPOSIT</p>
                        </div>
                    </NavLink>
                    {/* <NavLink
                        to={"/admin/dashboard/manage-deposits"}
                        className={({isActive}) =>
                            !isActive
                                ? "transition-all hover:text-[0.90rem] hover:bg-gray-100 rounded  hover:text-[#0e4152] text-[#777]"
                                : "transition-all bg-[#0e4152] hover:bg-[#0e4152] text-white"
                        }
                    >
                        <div className="w-full h-12 text-sm cursor-pointer hover:text-[0.90rem] transition-all rounded-md flex items-center gap-4 font-bold px-2 ">
                            <FaDownload className="w-5 h-5" />
                            <p className=""> His</p>
                        </div>
                    </NavLink> */}
                </div>
            </div>
            </Drawer>
        </>
    );
};

export default Header;
