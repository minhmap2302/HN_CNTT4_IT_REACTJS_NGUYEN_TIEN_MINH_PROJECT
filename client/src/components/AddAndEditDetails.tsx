import { useEffect, useState } from "react";
import type { Project, Task, User } from "../utils/type";
import { useDispatch, useSelector } from "react-redux";
import { addDataTask, editDataTask } from "../store/slices/detailsSlice";
import { getAllData } from "../store/slices/managementSlice";
import { getAllAccount } from "../store/slices/accountSlice";

interface PropsAddandEdit {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  edit: Task | null;
}

export default function AddAndEditDetails({
  isOpen,
  onClose,
  project,
  edit,
}: PropsAddandEdit) {
  if (!isOpen) return null;
  if (edit != null) console.log("edit ben addAndEdit :", edit);

  const [nameTask, setNameTask] = useState("");
  const [personTask, setPersonTask] = useState("");
  const [status, setStatus] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const [priority, setPriority] = useState("");
  const [progress, setProgress] = useState("");
  // error
  const [nameTaskError, setNameTaskError] = useState("");
  const [personTaskError, setPersonTaskError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [dayStartError, setDayStartError] = useState("");
  const [dayEndError, setDayEndError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [progressError, setProgressError] = useState("");
  const dispatch: any = useDispatch();
  // lấy user
  const users = useSelector((data: any) => {
    return data.account.users;
  });
  // laasy project
  const projects = useSelector((data: any) => {
    return data.management.project;
  });
  useEffect(() => {
    dispatch(getAllAccount());
    dispatch(getAllData());
  }, []);
  useEffect(() => {
    if (edit) {
      const user = users.find((i: any) => i.id === edit.assingeeId);
      console.log(user.id);
      console.log(edit.assgnDate);
      setNameTask(edit.taskName);
      setPersonTask(user.fullName);
      setStatus(edit.status);
      setDayStart(edit.assgnDate);
      setDayEnd(edit.dueDate);
      setPriority(edit.priority);
      setProgress(edit.progress);
    } else {
      setNameTask("");
      setPersonTask("");
      setStatus("");
      setDayStart("");
      setDayEnd("");
      setPriority("");
      setProgress("");
    }
  }, [edit, projects, users]);

  // luuw
  const handleSave = () => {
    if (
      !nameTask ||
      !personTask ||
      status == "0" ||
      !dayStart ||
      !dayEnd ||
      priority == "0" ||
      progress == "0"
    ) {
      setNameTaskError("hãy nhập tên dự án");
      setPersonTaskError("hãy chọn thành viên");
      setStatusError("hãy chọn trạng thái");
      setDayStartError("hãy chọn ngày bắt đầu dự án");
      setDayEndError("hãy chọn ngày kết thúc dự án");
      setPriorityError("hãy chọn độ ưu tiên dự án");
      setProgressError("hãy chọn tiến độ dự án");
      return;
    }

    if (dayStart > dayEnd) {
      setDayEndError("nhày kết thúc phải sau ngày bắt đầu");
      return;
    }
    // lấy id member
    const nameMember = users.find((i: any) => i.fullName === personTask);
    const idMember = project?.members.find(
      (i: any) => i.userId === nameMember.id
    );
    if (edit) {
      const editTask = {
        id: Number(edit.id),
        taskName: nameTask,
        assingeeId: idMember != undefined ? Number(idMember.userId) : "",
        projectId: Number(project?.id),
        assgnDate: dayStart,
        dueDate: dayEnd,
        priority: priority,
        progress: progress,
        status: status,
      };
      dispatch(editDataTask(editTask));
      onClose();
    } else {
      const newTask = {
        taskName: nameTask,
        assingeeId: idMember != undefined ? idMember.userId : "",
        projectId: project?.id,
        assgnDate: dayStart,
        dueDate: dayEnd,
        priority: priority,
        progress: progress,
        status: status,
      };
      dispatch(addDataTask(newTask));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-70">
      <div className="bg-white w-[600px] max-h-[800px] overflow-y-auto rounded-lg shadow-lg p-5">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-semibold mb-1">Thêm/Sửa nhiệm vụ</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block mb-1 font-medium">Tên nhiệm vụ</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                nameTaskError ? "border-red-500" : "border-gray-200"
              }`}
              onChange={(e) => setNameTask(e.target.value)}
              value={nameTask}
            />
            {/* lỗi validate */}
            {nameTaskError && (
              <p className="text-red-500 text-sm mt-1">{nameTaskError}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Người phụ trách</label>
            <select
              className={`w-full border rounded px-3 py-2 ${
                personTaskError ? "border-red-500" : "border-gray-200"
              }`}
              onChange={(e) => setPersonTask(e.target.value)}
              value={personTask}
            >
              <option value={"0"}>Chọn người...</option>
              {project?.members.map((member: any, index: number) => {
                const user = users.find((i: any) => i.id === member.userId);
                if (!user) return null;
                return (
                  <option key={index} value={user.fullName}>
                    {user.fullName}
                  </option>
                );
              })}
            </select>
            {personTaskError && (
              <p className="text-red-500 text-sm mt-1">{personTaskError}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Trạng thái</label>
            <select
              className={`w-full border rounded px-3 py-2 ${
                statusError ? "border-red-500" : "border-gray-200"
              }`}
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="0">Chọn trạng thái nhiệm vụ</option>
              <option value={"todo"}>to do</option>
              <option value={"inprogress"}>in progress </option>
              <option value={"pending"}>pending</option>
              <option value={"done"}>done</option>
            </select>
            {statusError && (
              <p className="text-red-500 text-sm mt-1">{statusError}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Ngày bắt đầu</label>
            <input
              type="date"
              className={`w-full border rounded px-3 py-2 ${
                dayStartError ? "border-red-500" : "border-gray-200"
              }`}
              onChange={(e) => setDayStart(e.target.value)}
              value={dayStart}
            />
            {dayStartError && (
              <p className="text-red-500 text-sm mt-1">{dayStartError}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Hạn cuối</label>
            <input
              type="date"
              className={`w-full border rounded px-3 py-2 ${
                dayEndError ? "border-red-500" : "border-gray-200"
              }`}
              onChange={(e) => setDayEnd(e.target.value)}
              value={dayEnd}
            />
            {dayEndError && (
              <p className="text-red-500 text-sm mt-1">{dayEndError}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Độ ưu tiên</label>
            <select
              className={`w-full border rounded px-3 py-2 ${
                priorityError ? "border-red-500" : "border-gray-200"
              }`}
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
            >
              <option value={"0"}>Chọn độ ưu tiên nhiệm vụ</option>
              <option value={"thấp"}>Thấp</option>
              <option value={"trung bình"}>Trung bình</option>
              <option value={"cao"}>Cao</option>
            </select>
            {priorityError && (
              <p className="text-red-500 text-sm mt-1">{priorityError}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Tiến độ</label>
            <select
              className={`w-full border rounded px-3 py-2 ${
                progressError ? "border-red-500" : "border-gray-200"
              }`}
              onChange={(e) => setProgress(e.target.value)}
              value={progress}
            >
              <option value={"0"}>Chọn tiến độ dự án</option>
              <option value={"đúng tiến độ"}>Đúng tiến độ</option>
              <option value={"có rủi ro"}>Có rủi ro</option>
              <option value={"chậm tiến độ"}>Chậm tiến độ</option>
            </select>
            {progressError && (
              <p className="text-red-500 text-sm mt-1">{progressError}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
