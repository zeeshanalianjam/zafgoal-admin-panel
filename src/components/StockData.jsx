import React from 'react'

const StockData = () => {
  const stocks = [
    {
      title: "Organic Whole Milk",
      section: "Dairy & Eggs",
      availability: "In Stock",
    },
    {
      title: "Laundry Detergent Pods",
      section: "Household",
      availability: "Low Stock (5 left)",
    },
    { title: "Basmati Rice (5kg)", section: "Pantry", availability: "In Stock" },
    {
      title: "Organic Whole Milk",
      section: "Dairy & Eggs",
      availability: "In Stock",
    },
    {
      title: "Organic Whole Milk",
      section: "Dairy & Eggs",
      availability: "In Stock",
    },
    {
      title: "Organic Whole Milk",
      section: "Dairy & Eggs",
      availability: "In Stock",
    },
    {
      title: "Organic Whole Milk",
      section: "Dairy & Eggs",
      availability: "In Stock",
    },
    {
      title: "Greek Yogurt (Plain)",
      section: "Dairy & Eggs",
      availability: "Out of Stock",
    },
    {
      title: "Greek Yogurt (Plain)",
      section: "Dairy & Eggs",
      availability: "Out of Stock",
    },
    {
      title: "Greek Yogurt (Plain)",
      section: "Dairy & Eggs",
      availability: "Out of Stock",
    },
    {
      title: "Greek Yogurt (Plain)",
      section: "Dairy & Eggs",
      availability: "Out of Stock",
    },
    {
      title: "Greek Yogurt (Plain)",
      section: "Dairy & Eggs",
      availability: "Out of Stock",
    },
    {
      title: "Greek Yogurt (Plain)",
      section: "Dairy & Eggs",
      availability: "Out of Stock",
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
            <th className="py-2 px-4 font-medium text-gray-700">Title</th>
            <th className="py-2 px-4 font-medium text-gray-700">Sections</th>
            <th className="py-2 px-4 font-medium text-gray-700">
              <div className="flex justify-center">
                <span className="text-left w-full max-w-[100px]">
                  Availability
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index} className=" hover:bg-gray-50 text-[12px]">
              <td className="py-1 px-4">{stock.title}</td>
              <td className="py-1 px-4">{stock.section}</td>
              <td className="py-1 px-4">
                <div className="flex justify-center">
                  <span
                    className={`text-left w-full max-w-[100px] ${getAvailabilityClass(
                      stock.availability
                    )}`}
                  >
                    {stock.availability}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default StockData
