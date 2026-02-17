import React, { useEffect, useState } from 'react'

import { Pencil, Trash2 } from 'lucide-react'

const AdminsTable = ({ data, handleEdit, handleDelete }) => {


  return (
    <div className="rounded-2xl px-6 py-4 border border-[#F1F3F4] bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#F1F3F4] text-[13px] text-gray-600">
            <th className="py-3 px-4 font-semibold">Name</th>
            <th className="py-3 px-4 font-semibold">Email</th>
            <th className="py-3 px-4 font-semibold">Permissions</th>
            <th className="py-3 px-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="border-b last:border-b-0 hover:bg-gray-50 transition text-[13px]"
            >
              {/* Name */}
              <td className="py-3 px-4 font-medium text-gray-800">
                {item.name}
              </td>

              {/* Email */}
              <td className="py-3 px-4 text-gray-600">
                {item.email}
              </td>

              {/* Permissions */}
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-2">
                  {item.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </td>

              {/* Actions */}
              <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-3">
                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminsTable
