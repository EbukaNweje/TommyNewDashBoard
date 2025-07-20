const Referral = () => {
    return (
        <div className="w-full h-max px-48 phone:px-6 py-10 phone:py-6 flex flex-col gap-8 ">
            <p className="w-full h-max flex flex-col gap-2 text-2xl font-semibold text-[#364a63]">
                Referral List
                <span className="text-sm font-normal text-[#526484] ">
                    You can refer users by sharing your referral link:
                    https://swifteatrnprime.vercel.app/ref/
                </span>
            </p>
            <div className="w-full h-max flex flex-col p-4 bg-white rounded border border-gray-300 gap-2">
                <div className="w-full h-max flex gap-4 items-center border-b border-b-gray-300 p-1">
                    <button className="w-max h-max p-2 bg-sky-600 text-white font-semibold text-sm rounded">
                        Your Sponsor
                    </button>
                    <p className="text-sm font-semibold text-[#526484]">None</p>
                </div>
                <div className="w-full h-max flex justify-between items-center font-semibold text-lg text-[#364a63] phone:text-sm">
                    <div>#</div>
                    <div>Client name</div>
                    <div>Ref. level</div>
                    <div>Parent</div>
                    <div>Date registered</div>
                    <div>Client status</div>
                </div>
            </div>
        </div>
    );
};

export default Referral;
