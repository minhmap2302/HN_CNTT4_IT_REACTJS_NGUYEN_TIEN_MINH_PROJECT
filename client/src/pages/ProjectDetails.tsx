import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import AddAndEditDetails from "../components/AddAndEditDetails";
import AddMember from "../components/AddMember";
import InforMember from "../components/InforMember";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../store/slices/managementSlice";
import type { Project } from "../utils/type";



export default function ProjectDetail() {
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [openMember, setOpenMember] = useState<boolean>(false);
  const [inforMember, setInforMember] = useState<boolean>(false);

  const { id } = useParams();
  console.log(id);

  // lấy data project
  const dispatch: any = useDispatch();
  const projects = useSelector((data: any) => {
    console.log("data ben deteial: ", data.management.project);
    return data.management.project;
  });
  
  const [projectDetail, setProjectDetail] = useState<Project | null>(() => {
    if(projects.length > 0){
      return projects.find((p : Project) => p.id === Number(id))
    }else {
      return null ;
    }
  });
  console.log(projectDetail);
  
  useEffect(() => {
     dispatch(getAllData());
     if(projects.length > 0){
      console.log(id);
      
      return setProjectDetail(projects.find((p : Project) => p.id === Number(id)));
    }
    
  }, [dispatch]);
  
  
  
  return (
    <div className="flex justify-center">
      <div className="p-10 space-y-7">
        {/* PHẦN 1: Thông tin task và member */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bên trái: Thông tin task */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {projectDetail?.projectName}
              {/* Xây dựng website thương mại điện tử 1 */}
            </h2>
            <div className="flex gap-4">
              {/* Ảnh minh họa */}
              <img
                src={projectDetail?.image}
                // src="data:image/jpeg;base64,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"
                alt="thumbnail"
                className="w-40 h-28 object-cover rounded-lg"
              />
              {/* Mô tả */}
              <p className="text-gray-600 text-sm max-w-xs">
                {projectDetail?.note}
                {/* Dự án nhằm phát triển một nền tảng thương mại điện tử với các tính năng như giỏ hàng, thanh toán và quản lý sản phẩm. */}
              </p>
            </div>
          </div>

          {/* Bên phải: Thành viên */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Thành viên</h3>
              <button
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg"
                onClick={() => setOpenMember(true)}
              >
                + Thêm thành viên
              </button>
            </div>

            <div className="space-y-3 flex  justify-between">
              <div className="flex gap-[15px]">
                {/* Member 1 */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    AN
                  </div>
                  <div>
                    <p className="font-medium">An Nguyễn</p>
                    <p className="text-xs text-gray-500">Project Owner</p>
                  </div>
                </div>

                {/* Member 2 */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    BA
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Bách Nguyễn</p>
                    <p className="text-xs text-gray-500">Frontend Developer</p>
                  </div>
                </div>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setInforMember(true)}
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* CONTROL GIỮA 2 PHẦN */}
        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              setOpenAddTask(true);
            }}
          >
            + Thêm nhiệm vụ
          </button>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sắp xếp theo</option>
              <option>Ngày bắt đầu</option>
              <option>Hạn chót</option>
              <option>Ưu tiên</option>
            </select>
            <input
              type="text"
              placeholder="Tìm kiếm nhiệm vụ"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* PHẦN 2: Bảng công việc */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4">Danh Sách Nhiệm Vụ</h3>
          <table className="w-full text-sm border border-gray-300 border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border border-gray-300">Tên Nhiệm Vụ</th>
                <th className="p-2 border border-gray-300">Người Phụ Trách</th>
                <th className="p-2 border border-gray-300">Ưu Tiên</th>
                <th className="p-2 border border-gray-300">Ngày Bắt Đầu</th>
                <th className="p-2 border border-gray-300">Hạn Chót</th>
                <th className="p-2 border border-gray-300">Tiến độ</th>
                <th className="p-2 border border-gray-300">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {/* Group: To do */}
              <tr>
                <td
                  colSpan={7}
                  className="bg-gray-50 p-2 font-semibold border border-gray-300"
                >
                  ▼ To do
                </td>
              </tr>
              <tr className="even:bg-gray-50">
                <td className="p-2 border border-gray-300">
                  Soạn thảo đề cương dự án
                </td>
                <td className="p-2 border border-gray-300">An Nguyễn</td>
                <td className="p-2 border border-gray-300">
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs">
                    Thấp
                  </span>
                </td>
                <td className="p-2 border border-gray-300">02-24</td>
                <td className="p-2 border border-gray-300">02-27</td>
                <td className="p-2 border border-gray-300">
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs">
                    Đúng tiến độ
                  </span>
                </td>
                <td className="p-2 border border-gray-300 flex gap-2">
                  <button
                    className="px-2 py-1 bg-yellow-400 text-white rounded"
                    onClick={() => setOpenMember(true)}
                  >
                    Sửa
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">
                    Xóa
                  </button>
                </td>
              </tr>

              {/* Group: In Progress */}
              <tr>
                <td
                  colSpan={7}
                  className="bg-gray-50 p-2 font-semibold border border-gray-300"
                >
                  ▼ In Progress
                </td>
              </tr>
              <tr className="even:bg-gray-50">
                <td className="p-2 border border-gray-300">
                  Lên lịch họp kickoff
                </td>
                <td className="p-2 border border-gray-300">An Nguyễn</td>
                <td className="p-2 border border-gray-300">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-xs">
                    Trung bình
                  </span>
                </td>
                <td className="p-2 border border-gray-300">02-24</td>
                <td className="p-2 border border-gray-300">02-27</td>
                <td className="p-2 border border-gray-300">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-xs">
                    Có rủi ro
                  </span>
                </td>
                <td className="p-2 border border-gray-300 flex gap-2">
                  <button className="px-2 py-1 bg-yellow-400 text-white rounded">
                    Sửa
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">
                    Xóa
                  </button>
                </td>
              </tr>

              {/* Group: Pending */}
              <tr>
                <td
                  colSpan={7}
                  className="bg-gray-50 p-2 font-semibold border border-gray-300"
                >
                  ▼ Pending
                </td>
              </tr>

              {/* Group: Done */}
              <tr>
                <td
                  colSpan={7}
                  className="bg-gray-50 p-2 font-semibold border border-gray-300"
                >
                  ▼ Done
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddAndEditDetails
        isOpen={openAddTask}
        onClose={() => setOpenAddTask(false)}
      ></AddAndEditDetails>
      <AddMember
        isOpen={openMember}
        onClose={() => setOpenMember(false)}
      ></AddMember>
      <InforMember
        isOpen={inforMember}
        onClose={() => setInforMember(false)}
      ></InforMember>
    </div>
  );
}
