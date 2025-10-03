import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddAndEditDetails from "../components/AddAndEditDetails";
import AddMember from "../components/AddMember";
import InforMember from "../components/InforMember";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [openMember, setOpenMember] = useState<boolean>(false);
  const [inforMember, setInforMember] = useState<boolean>(false);

  const { id } = useParams();
  console.log(id);

  return (
    <div className="flex justify-center">
      <div className="p-10 space-y-7">
        {/* PHẦN 1: Thông tin task và member */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bên trái: Thông tin task */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Xây dựng website thương mại điện tử
            </h2>
            <div className="flex gap-4">
              {/* Ảnh minh họa */}
              <img
                src="data:image/jpeg;base64,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"
                alt="thumbnail"
                className="w-40 h-28 object-cover rounded-lg"
              />
              {/* Mô tả */}
              <p className="text-gray-600 text-sm max-w-xs">
                Dự án nhằm phát triển một nền tảng thương mại điện tử với các
                tính năng như giỏ hàng, thanh toán và quản lý sản phẩm.
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
    </div>
  );
}
