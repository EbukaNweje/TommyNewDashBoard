import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";


const Investmentpay = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0.0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  // const [userPlan, setUserPlan] = useState([]);
  // const [selectedPackage, setSelectedPackage] = useState(null);
  const [planPrice, setPlanPrice] = useState(0);
  const [laoding, setLoading] = useState(false)

  const userId = useSelector((state) => state.id)
  const selectedPackage = useSelector((state) => state.userPlan)
  console.log(userId)

  const User = z.object({
    check: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(User),
  });

  // useEffect(() => {
  //   axios
  //     .get("https://api.coindesk.com/v1/bpi/currentprice.json")
  //     .then((response) => {
  //       const rate = response.data.bpi.USD.rate.replace(",", "");
  //       setExchangeRate(parseFloat(rate));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching exchange rate:", error);
  //     });
  // }, []);

  const bitcoinValue = amount / exchangeRate;
  const roundedNumber = parseFloat(bitcoinValue.toFixed(8));

  // const getAllPlan = () => {
  //   const url =
  //     "https://new-swifteatrn-back-end-nine.vercel.app/api/getallplan";
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setUserPlan(response?.data?.data || []);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getAllPlan();
  // }, []);

  // const handlePlanChange = (e) => {
  //   const selectedPlan = userPlan.find(
  //     (plan) => plan.planName === e.target.value
  //   );
  //   setSelectedPackage(selectedPlan);
  // };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleOpenModal = handleSubmit(() => {
    if (amount > 0 && selectedPackage) {
      setOpenModal(true);
    } else {
      toast.error("Plan and amount are required");
    }
  });
  
  const data = {
    amount: amount,
    planId: selectedPackage?._id,
    
  }

  const handleProceed = async() => {
    const url = `https://unixswap-coin-api.vercel.app/api/invest/${userId}`
      setLoading(true)
      axios.post(url, data)
      .then(res => {
          setLoading(false)
          toast.success(res.data.message)
          setOpenModal(false)
          Nav(-1)
      }).catch((err)=>{
          setLoading(false)
          toast.error(err.response.data.message)
        console.log("eee",err)
      })
    
  };

  return (
    <div className="w-full h-max flex bg-[#f5f6fa] px-48 phone:gap-6 phone:px-6 phone:flex-col py-4">
      <div className="w-[60%] phone:w-full h-max flex flex-col gap-2">
        <div
          className="w-max h-max flex items-center gap-2 text-lg cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong />
          <p>Back to plan</p>
        </div>
        <p className="text-4xl font-semibold text-[#364a63]">
          Ready to get started?
        </p>
        <div className="w-full h-max flex flex-col gap-6 mt-4">
          {/* <div className="w-full h-max flex flex-col gap-2">
            <p className="text-sm">Choose a plan </p>
            <select
              onChange={handlePlanChange}
              className="w-full h-14 border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select a plan</option>
              {userPlan.map((plan) => (
                <option key={plan._id} value={plan.planName}>
                  {plan.planName}
                </option>
              ))}
            </select>
          </div> */}
          <div className="w-full h-max flex flex-col gap-2">
            <p className="text-sm">Enter your amount</p>
            <div className="w-full h-14 flex items-center border border-gray-300 rounded px-4 py-2 bg-white">
              <input
                type="number"
                className="w-[90%] border-r border-r-gray-200 h-full rounded-l outline-none"
                placeholder="100000"
                onChange={handleAmountChange}
              />
              <p className="w-[10%] h-full flex items-center justify-center">
                USD
              </p>
            </div>
          </div>
          <div className="w-full h-max flex items-center">
            <input
              type="checkbox"
              className="w-6 h-6"
              {...register("check")}
            />
            <p className="ml-2 text-sm">
              I agree to the terms and conditions
            </p>
            {errors?.check && (
              <span style={{ color: "red" }}>{errors.check.message}</span>
            )}
          </div>
        </div>
      </div>
      <div className="w-[40%] phone:w-full phone:p-0 h-max pl-24 pt-24">
        <div className="w-full h-max rounded border bg-white border-gray-300">
          <div className="w-full h-max flex flex-col p-6 gap-2">
            <div className="w-full h-max text-lg text-[#364a63] font-semibold">
              Your Investment Details
            </div>
            <div className="w-full h-max flex flex-col justify-between">
              <p className="w-full h-max text-xs gap-1 text-[#8094ae]">
                Selected Plan
                <span className="text-[#526484] text-sm"> {selectedPackage?.planName || "None"}</span>
              </p>
            </div>
          </div>
          <div className="w-full h-max flex justify-between p-6 border-b border-b-gray-300">
            <p className="w-[70%] text-xs text-[#8094ae]">Minimum Deposit</p>
            <p className="w-[30%] text-sm text-[#526484]">
              {selectedPackage?.minimumDeposit || "0"}
            </p>
          </div>
          <div className="w-full h-max flex justify-between p-6 border-b border-b-gray-300">
            <p className="w-[70%] text-xs text-[#8094ae]">Maximum Deposit</p>
            <p className="w-[30%] text-sm text-[#526484]">
              {selectedPackage?.maximumDeposit || "0"}
            </p>
          </div>
          <div className="w-full h-max flex justify-between p-6 border-b border-b-gray-300">
            <p className="w-[70%] text-xs text-[#8094ae]">Percentage Interest</p>
            <p className="w-[30%] text-sm text-[#526484]">
              {selectedPackage?.percentageInterest || "0"}%
            </p>
          </div>
          <div className="w-full h-max flex justify-between p-6 border-b border-b-gray-300">
            <p className="w-[70%] text-xs text-[#8094ae]">Durationc Days</p>
            <p className="w-[30%] text-sm text-[#526484]">{selectedPackage?.durationDays} {selectedPackage?.durationDays > 1 ? "Days" : "Day"}</p>
          </div>
          <div className="w-full h-20 flex items-center justify-center bg-[#f5f6fa]">
            <button
              className="px-5 py-2 rounded text-white font-semibold bg-[#a286f4]"
              onClick={handleOpenModal}
            >
              Confirm & Invest
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{ hidden: true }}
        maskClosable={true}
        closeIcon={false}
      >
        <div className="flex flex-col items-center gap-4">
          <p>Confirm Your Investment</p>
          <p className="text-center">
            This is to confirm your investment of ${amount} {" "}
             {selectedPackage?.planName || "None"}. Please cancel
            if you did not initiate the transaction.
          </p>
          <button
            className="px-5 py-2 rounded text-white font-semibold bg-[#a286f4]"
            onClick={handleProceed}
          >
             { laoding ? <ClipLoader color='white' className="hover:bg-#a286f4" /> :
                               " Proceed" 
                               } 
          </button>
          <button
            className="px-5 py-2 rounded border border-[#a286f4] text-[#a286f4]"
            onClick={() => setOpenModal(false)}
          >
            Cancel and return
          </button>
        </div>
      </Modal>
      <Toaster position="top-center" />
    </div>
  );
};

export default Investmentpay;
