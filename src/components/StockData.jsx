import React from 'react'

const StockData = ({ view, filteredItems, data }) => {
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

  const getStatusColor = (status) => {
    if (status === "In Stock") return 'text-green-600'
    if (status === "Out of Stock") return 'text-red-600'
    if (status === "Low Stock") return 'text-orange-600'
    return 'text-gray-600'
  }


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
          {view === "items" ?
            (filteredItems.map((item, index) => (
              <tr key={item.id} className=" hover:bg-gray-50 text-[12px]">
                <td className="py-1 px-4">{item.name}</td>
                <td className="py-1 px-4">{item.section}</td>
                <td className="py-1 px-4">
                  <div className="flex justify-center">
                    <span
                      className={`text-left w-full max-w-[100px] font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status} {item.stock > 0 && item.status === 'Low Stock' ? `(${item.stock} left)` : ''}
                    </span>
                  </div>
                </td>
              </tr>
            ))) : (data.map((cat) => (

              <React.Fragment key={cat.categoryId}>
                <tr className="bg-blue-50">
                  <td colSpan="3" className="py-2 px-4 font-bold text-blue-800 text-[14px]">{cat.categoryName}</td>
                </tr>
                {cat.products.map(item => (
                  <tr key={item.id} className="border-b text-[12px]">
                    <td className="py-3 pl-8 ">{item.name}</td>
                    <td className="py-3 px-4 text-gray-400">--</td>
                    <td className={`py-3 font-medium ${getStatusColor(item.status)}`}>
                      <div className='flex justify-center'>
                        <span className='text-left w-full max-w-[100px]'>{item.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>

            )))}
        </tbody>
      </table>

    </div>
  )
}



export default StockData
