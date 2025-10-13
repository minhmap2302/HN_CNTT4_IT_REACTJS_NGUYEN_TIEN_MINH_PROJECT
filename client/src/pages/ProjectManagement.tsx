import { useEffect, useState } from "react";
import AddAndEditProject from "../components/AddAndEditProject";
import DeleteProject from "../components/DeleteProject";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../store/slices/managementSlice";
import type { Project } from "../utils/type";
import { Pagination } from "antd";

export default function ProjectManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [edit, setEdit] = useState<Project | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [deleteProject, setDeleteProject] = useState<number>();
  const navi = useNavigate();
  const dispatch: any = useDispatch();

  // const [currentPage, setCurrentPage] = useState(1); // 👈 trang hiện tại
  // const pageSize = 5;

  const projects: Project[] = useSelector(
    (state: any) => state.management.project || []
  );
  const { userId } = useParams();
  console.log("User ID ở ProjectManagement:", userId);

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const handleEdit = (p: Project) => {
    setEdit(p);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setIsDeleteOpen(true);
    setDeleteProject(id);
  };

  const handleDetail = (projectId: number) => {
    navi(`/${userId}/management/${projectId}`);
  };

  const searchJob = projects.filter(
    (p) =>
      p.projectName?.toLowerCase().includes(searchInput.toLowerCase()) &&
      p.idUser === Number(userId)
  );

  
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(searchJob.length / itemsPerPage);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = searchJob.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow rounded p-6">
        <div className="flex flex-col mb-6 gap-[30px]">
          <h2 className="text-xl font-semibold">Quản Lý Dự Án Nhóm</h2>
          <div className="flex space-x-4 justify-between">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setIsOpen(true);
                setEdit(null);
              }}
            >
              + Thêm Dự Án
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm dự án"
              className="border border-gray-300 rounded px-3 py-2 w-120 focus:ring focus:ring-blue-300"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Danh Sách Dự Án</h3>
        <table className="w-full border border-gray-300 rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 w-16 border-r">ID</th>
              <th className="px-4 py-2 border-r text-left">Tên Dự Án</th>
              <th className="px-4 py-2 w-60 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.length > 0 ? (
              currentProjects.map((p, i) => (
                <tr key={p.id || i} className="border-t border-gray-300">
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    {p.id}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-300">
                    {p.projectName}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      className="bg-yellow-400 text-black px-3 py-1 rounded w-20 hover:bg-yellow-500"
                      onClick={() => handleEdit(p)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded w-20 hover:bg-red-600"
                      onClick={() => handleDelete(p.id)}
                    >
                      Xóa
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded w-20 hover:bg-blue-600"
                      onClick={() => handleDetail(p.id)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  {/* Không tìm thấy dự án nào */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* PHÂN TRANG */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-1 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-300 rounded-l ${
                currentPage === 1 ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "bg-white"
              }`}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border border-gray-300 ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-300 rounded-r ${
                currentPage === totalPages
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
            >
              ›
            </button>
          </div>
        )}

      <AddAndEditProject
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        edit={edit}
        id={userId}
      />
      <DeleteProject
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        deleteProject2={deleteProject}
      />
    </div>
  );
}
