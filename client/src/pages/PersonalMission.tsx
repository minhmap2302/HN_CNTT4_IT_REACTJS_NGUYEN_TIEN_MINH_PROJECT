
import { SquarePen, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import type { Project, Task } from "../utils/type";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllData } from "../store/slices/managementSlice";
import { getDataTask } from "../store/slices/detailsSlice";
import UpdateStatus from "../components/UpdateStatus";




export default function PersonalMission() {
  const { userId } = useParams();
  const dispatch: any = useDispatch();
  const [isOpen , setIsOpen] = useState<boolean>(false)

  // lấy project
  const projects = useSelector((data: any) => {
    return data.management.project;
  });
  // lấy task
  const tasks = useSelector((data: any) => {
    return data.details.task;
  });

  useEffect(() => {
    dispatch(getAllData());
    dispatch(getDataTask());
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 mx-[15%]"> Quản lý nhiệm vụ</h1>
      <div className="flex justify-end mb-4 mx-[15%] gap-3">
        <div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm bg-white text-sm">
            <option value="">Sắp xếp theo</option>
            <option value="date">Ngày bắt đầu</option>
            <option value="priority">Độ ưu tiên</option>
            <option value="status">Trạng thái</option>
          </select>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Tìm kiếm nhiệm vụ"
            className="border pl-8 pr-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-5 overflow-y-auto mx-[15%]">
        <h3 className="text-lg font-semibold mb-4">Danh Sách Nhiệm Vụ</h3>

        <table className="w-full text-sm border border-gray-200 border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border border-gray-200">Tên Nhiệm Vụ</th>
              <th className="p-3 border border-gray-200">Độ Ưu Tiên</th>
              <th className="p-3 border border-gray-200">Trạng Thái</th>
              <th className="p-3 border border-gray-200">Ngày Bắt Đầu</th>
              <th className="p-3 border border-gray-200">Hạn Chót</th>
              <th className="p-3 border border-gray-200">Tiến độ</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((valueP: Project, indexP: number) => {
              if (Number(valueP.idUser) === Number(userId)) {
                return (
                  <>
                    <tr key={`project-${indexP}`}>
                      <td colSpan={6} className="p-3 font-semibold"
                      >
                        {valueP.projectName}
                      </td>
                    </tr>

                    {tasks.map((valueT: Task, indexT: number) => {
                      if (Number(valueT.projectId) === Number(valueP.id)) {
                        return (
                          <tr key={`task-${indexP}-${indexT}`}>
                            <td className="p-3 border border-gray-400">
                              {valueT.taskName}
                            </td>
                            <td className="p-3 border border-gray-400"
                            >
                              <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-medium w-fit">
                                {valueT.priority}
                              </span>
                            </td>
                            <td className="p-3 border border-gray-400" onClick={() => setIsOpen(true)}>
                              <div className="flex items-center gap-1 text-gray-600">
                                <SquarePen size={16} /> {valueT.status}
                              </div>
                            </td>
                            <td className="p-3 border border-gray-400">
                              {valueT.assgnDate}
                            </td>
                            <td className="p-3 border border-gray-400">
                              {valueT.dueDate}
                            </td>
                            <td className="p-3 border border-gray-400">
                              <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-medium w-fit">
                                {valueT.progress}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <UpdateStatus
        isOpen={isOpen}
        onClose = {() => setIsOpen(false)}
      >

      </UpdateStatus>
    </div>
  );
}
