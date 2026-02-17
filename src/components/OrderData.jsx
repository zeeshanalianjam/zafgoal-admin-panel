import React, { useEffect, useState } from 'react'
import { handleApiError } from '../utils/handleApiError'
import { Axios } from '../common/Axios'
import { summaryApi } from '../common/summaryApi'
import { motion } from 'framer-motion'

const OrderData = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
                const response = await Axios({
                    ...summaryApi.getAllOrders
                })

                console.log(response.data.data)

                if (response.data.success) {
                    setData(response.data.data)
                }

            } catch (error) {
                handleApiError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])


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
                {loading && <tr><td colSpan={4} className="py-2 px-4 text-center"><> <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-t-2 border-black border-solid rounded-full mx-auto"
                /> </> </td></tr>}
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className=" hover:bg-gray-50 text-[12px]">
                            <td className="py-1 px-4">{item.orderId}</td>
                            <td className="py-1 px-4">{item.products.map((product) => product.productId?.name)}</td>
                            <td className="py-1 px-4">{item.createdAt.slice(0, 10)}</td>
                            <td className="py-1 px-4">
                                {item.deliveryStatus}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default OrderData
