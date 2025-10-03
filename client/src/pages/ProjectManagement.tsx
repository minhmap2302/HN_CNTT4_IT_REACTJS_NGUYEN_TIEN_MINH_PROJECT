import React, { useState } from "react";
import AddAndEditProject from "../components/AddAndEditProject";
import { Outlet, useNavigate } from "react-router-dom";
import DeleteProject from "../components/DeleteProject";


export default function ProjectManagement() {
  const projects = [
    { id: 1, name: "Xây dựng website thương mại điện tử" },
    { id: 2, name: "Phát triển ứng dụng di động" },
    { id: 3, name: "Quản lý dữ liệu khách hàng" },
    { id: 4, name: "Xây dựng website thương mại điện tử" },
    { id: 5, name: "Phát triển ứng dụng di động" },
    { id: 6, name: "Quản lý dữ liệu khách hàng" },
    { id: 7, name: "Xây dựng website thương mại điện tử" },
    { id: 8, name: "Phát triển ứng dụng di động" },
    
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const navi = useNavigate();

  return (
    <>
      <div className="p-6 flex flex-col items-center">
        {/* Khung trắng */}
        <div className="w-full max-w-6xl bg-white shadow rounded p-6">
          {/* Header: Tiêu đề + Nút + Tìm kiếm */}
          <div className="flex flex-col mb-6 gap-[30px]">
            <h2 className="text-xl font-semibold">Quản Lý Dự Án Nhóm</h2>
            <div className="flex space-x-4 justify-between">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setIsOpen(true)}
              >
                + Thêm Dự Án
              </button>
              <input
                type="text"
                placeholder="Tìm kiếm dự án"
                className="border border-gray-300 rounded px-3 py-2 w-120 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Danh sách dự án */}
          <h3 className="text-lg font-semibold mb-2">Danh Sách Dự Án</h3>
          <table className="w-full border border-gray-300 rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 w-16 border-r border-gray-300">ID</th>
                <th className="px-4 py-2 border-r border-gray-300 text-left">
                  Tên Dự Án
                </th>
                <th className="px-4 py-2 w-60 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-gray-300">
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    {p.id}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300">
                    {p.name}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      className="bg-yellow-400 text-black px-3 py-1 rounded w-20 hover:bg-yellow-500"
                      onClick={() => setIsOpen(true)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded w-20 hover:bg-red-600"
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      Xóa
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded w-20 hover:bg-blue-600"
                      onClick={() => {navi(`/management/${p.id}`)}}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang ở ngoài khung trắng */}
        <div className="flex justify-center items-center space-x-1 mt-6">
          <button className="px-3 py-1 border border-gray-300 rounded-l text-gray-400 bg-gray-100">
            ‹
          </button>
          <button className="px-3 py-1 border border-gray-300 bg-blue-500 text-white">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300">2</button>
          <button className="px-3 py-1 border border-gray-300">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded-r bg-gray-100">
            ›
          </button>
        </div>
        <AddAndEditProject
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        ></AddAndEditProject>
        <DeleteProject
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        ></DeleteProject>
      </div>
      {/* <Outlet></Outlet> */}
    </>
  );
}
