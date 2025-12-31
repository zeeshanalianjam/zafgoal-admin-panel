import React from 'react'

const OrderData = () => {
    const stocks = [
        {
            ID: "#ORD-9901",
            Title: "Weekly Grocery Bundle (12 items)",
            ["Date and time"]: "Oct 12, 09:30 AM",
            ["Shipping Condition"]: "Picked Up",
        },
        {
            ID: "#ORD-9902",
            Title: "Fresh Vegetables Pack (8 items)",
            ["Date and time"]: "Oct 12, 11:15 AM",
            ["Shipping Condition"]: "In Transit",
        },
        {
            ID: "#ORD-9903",
            Title: "Monthly Kitchen Essentials",
            ["Date and time"]: "Oct 13, 02:40 PM",
            ["Shipping Condition"]: "Delivered",
        },
        {
            ID: "#ORD-9904",
            Title: "Organic Fruits Box (10 items)",
            ["Date and time"]: "Oct 13, 06:20 PM",
            ["Shipping Condition"]: "Picked Up",
        },
        {
            ID: "#ORD-9905",
            Title: "Dairy Products Combo",
            ["Date and time"]: "Oct 14, 09:10 AM",
            ["Shipping Condition"]: "Cancelled",
        },
        {
            ID: "#ORD-9906",
            Title: "Bakery Special Pack",
            ["Date and time"]: "Oct 14, 12:55 PM",
            ["Shipping Condition"]: "Delivered",
        },
        {
            ID: "#ORD-9907",
            Title: "Snacks & Beverages Bundle",
            ["Date and time"]: "Oct 15, 10:30 AM",
            ["Shipping Condition"]: "In Transit",
        },
        {
            ID: "#ORD-9908",
            Title: "Frozen Food Pack (6 items)",
            ["Date and time"]: "Oct 15, 04:45 PM",
            ["Shipping Condition"]: "Picked Up",
        },
        {
            ID: "#ORD-9909",
            Title: "Household Cleaning Supplies",
            ["Date and time"]: "Oct 16, 08:20 AM",
            ["Shipping Condition"]: "Delivered",
        },
        {
            ID: "#ORD-9910",
            Title: "Personal Care Essentials",
            ["Date and time"]: "Oct 16, 01:35 PM",
            ["Shipping Condition"]: "In Transit",
        },
        {
            ID: "#ORD-9911",
            Title: "Breakfast Combo Pack",
            ["Date and time"]: "Oct 17, 09:00 AM",
            ["Shipping Condition"]: "Delivered",
        },
        {
            ID: "#ORD-9912",
            Title: "Lunch Ready Meals (5 items)",
            ["Date and time"]: "Oct 17, 12:20 PM",
            ["Shipping Condition"]: "Picked Up",
        },
        {
            ID: "#ORD-9913",
            Title: "Dinner Family Pack",
            ["Date and time"]: "Oct 18, 07:10 PM",
            ["Shipping Condition"]: "Delivered",
        },
        {
            ID: "#ORD-9914",
            Title: "Seafood Special Box",
            ["Date and time"]: "Oct 18, 03:45 PM",
            ["Shipping Condition"]: "In Transit",
        },
        {
            ID: "#ORD-9915",
            Title: "Meat & Poultry Pack",
            ["Date and time"]: "Oct 19, 10:25 AM",
            ["Shipping Condition"]: "Picked Up",
        },
        {
            ID: "#ORD-9916",
            Title: "Baby Care Products",
            ["Date and time"]: "Oct 19, 02:50 PM",
            ["Shipping Condition"]: "Delivered",
        },
        {
            ID: "#ORD-9917",
            Title: "Pet Food Bundle",
            ["Date and time"]: "Oct 20, 11:40 AM",
            ["Shipping Condition"]: "In Transit",
        },
        {
            ID: "#ORD-9918",
            Title: "Office Pantry Essentials",
            ["Date and time"]: "Oct 20, 04:10 PM",
            ["Shipping Condition"]: "Delivered",
        },
        {
            ID: "#ORD-9919",
            Title: "Healthy Diet Combo",
            ["Date and time"]: "Oct 21, 09:50 AM",
            ["Shipping Condition"]: "Picked Up",
        },
        {
            ID: "#ORD-9920",
            Title: "Weekend Party Snacks Box",
            ["Date and time"]: "Oct 21, 06:30 PM",
            ["Shipping Condition"]: "Delivered",
        },

    ];

    const getAvailabilityClass = (status) => {
        if (status.includes("In Stock")) return "text-green-600 font-semibold";
        if (status.includes("Low Stock")) return "text-orange-600 font-semibold";
        if (status.includes("Out of Stock")) return "text-red-600 font-semibold";
        return "";
    };

    return (
        <div className='rounded-[14px] px-6 py-2 border border-[#F1F3F4]'>
            {/* Table */}
            <table className="w-full text-left border-collapse ">
                <thead>
                    <tr className="border-b border-[#F1F3F4] text-[14px]">
                        <th className="py-2 px-4 font-medium text-gray-700">ID</th>
                        <th className="py-2 px-4 font-medium text-gray-700">Title</th>
                        <th className="py-2 px-4 font-medium text-gray-700">Date and time</th>
                        <th className="py-2 px-4 font-medium text-gray-700">Shipping Condition</th>
                        {/* <th className="py-2 px-4 font-medium text-gray-700">
                            <div className="flex justify-center">
                                <span className="text-left w-full max-w-[100px]">
                                    Shipping Condition
                                </span>
                            </div>
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, index) => (
                        <tr key={index} className=" hover:bg-gray-50 text-[12px]">
                            <td className="py-1 px-4">{stock.ID}</td>
                            <td className="py-1 px-4">{stock.Title}</td>
                            <td className="py-1 px-4">{stock["Date and time"]}</td>
                            <td className="py-1 px-4">
                                {stock["Shipping Condition"]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default OrderData
