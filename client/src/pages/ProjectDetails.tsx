import { MoreHorizontal, User} from "lucide-react";
import { useEffect, useState } from "react";
import AddAndEditDetails from "../components/AddAndEditDetails";
import AddMember from "../components/AddMember";
import InforMember from "../components/InforMember";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../store/slices/managementSlice";
import type { Project} from "../utils/type";
import DeleteDetails from "../components/DeleteDetails";
import { getAllAccount } from "../store/slices/accountSlice";

export default function ProjectDetail() {
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [openMember, setOpenMember] = useState<boolean>(false);
  const [inforMember, setInforMember] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { projectId } = useParams();
  console.log("details id ", projectId);

  // lấy data project
  const dispatch: any = useDispatch();
  const projects = useSelector((data: any) => {
    console.log("data ben deteial ve project : ", data.management.project);
    return data.management.project;
  });
  // lấy data user
  const users = useSelector((data: any) => {
    console.log("data ben details ve user :", data.account.users);
    return data.account.users;
  });
  const [projectDetail, setProjectDetail] = useState<Project | null>(null);
  useEffect(() => {
    dispatch(getAllData());
    dispatch(getAllAccount());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      const project = projects.find((p: Project) => p.id === Number(projectId));
      if (project) {
        setProjectDetail(project);
      }
    }
  }, [projects, projectId]);
  useEffect(() => {
    if (projectDetail?.members && users.length > 0) {
      for (let i = 0; i < projectDetail.members.length; i++) {
        for (let j = 0; j < users.length; j++) {
          if (Number(projectDetail.members[i].userId) === Number(users[j].id)) {
          }
        }
      }
    }
  });

  return (
    <div className="flex justify-center">
      <div className="p-10 space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {projectDetail?.projectName}
            </h2>
            <div className="flex gap-4">
              <img
                src={projectDetail?.image}
                alt="thumbnail"
                className="w-40 h-28 object-cover rounded-lg"
              />

              <p className="text-gray-600 text-sm max-w-xs">
                {projectDetail?.note}
              </p>
            </div>
          </div>

          <div>
            {/* Thêm thành viên */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Thành viên</h3>
              <button
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg"
                onClick={() => setOpenMember(true)}
              >
                + Thêm thành viên
              </button>
            </div>
            {/* in thanh vien */}
            <div className="space-y-3 flex  justify-between flex-wrap">
              <div className="flex gap-[20px]">
                {projectDetail?.members.map((member: any, i: number) => {
                  const user = users.find((u: any) => u.id === member.userId);
                  if (!user) return null;

                  return (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                          <User/>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                {/*  */}
                <td className="p-2 border border-gray-300 flex gap-2">
                  <button
                    className="px-2 py-1 bg-yellow-400 text-white rounded"
                    onClick={() => setOpenAddTask(true)}
                  >
                    Sửa
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => setOpenDelete(true)}
                  >
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
        project={projectDetail}
      ></AddAndEditDetails>
      <AddMember
        isOpen={openMember}
        onClose={() => setOpenMember(false)}
        project={projectDetail}
      ></AddMember>
      <InforMember
        isOpen={inforMember}
        onClose={() => setInforMember(false)}
      ></InforMember>
      <DeleteDetails
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
      ></DeleteDetails>
    </div>
  );
}
