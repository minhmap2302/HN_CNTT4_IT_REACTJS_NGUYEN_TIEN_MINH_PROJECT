import { useState } from "react";
import type { Project } from "../utils/type";
import { useSelector } from "react-redux";


interface PropsAddandEdit {
  isOpen : boolean;
  onClose: () => void;
  project: Project | null;
}


export default function AddAndEditDetails({isOpen , onClose , project} : PropsAddandEdit) {
  if(!isOpen) return null;
  //
  const [nameTask, setNameTask] = useState("");
  const [personTask, setPersonTask] = useState("");
  const [status, setStatus] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const [priority, setPriority] = useState("");
  const [progress , setProgress] = useState("");
  // error 
  const [nameTaskError, setNameTaskError] = useState("");
  const [personTaskError, setPersonTaskError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [dayStartError, setDayStartError] = useState("");
  const [dayEndError, setDayEndError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [progressError , setProgressError] = useState("");
  // lấy user 
  const users = useSelector((data: any) => {
    console.log("data ben details ve user :", data.account.users);
    return data.account.users;
  });
 
  
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-70">
      <div className="bg-white w-[500px]  rounded-lg shadow-lg p-5">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Thêm/Sửa nhiệm vụ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Tên nhiệm vụ</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {/* lỗi validate */}
          </div>
          <div>
            <label className="block mb-1 font-medium">Người phụ trách</label>
            <select className="w-full border rounded px-3 py-2">
              <option value={"0"}>Chọn người...</option>
              {project?.members.map((member:any , index : number) => {
                const user = users.find((i:any) => i.id === member.userId);
                if(!user) return null;
                return (
                  <option key={index} value={user.fullName}>{user.fullName}</option>
                )
              })}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Trạng thái</label>
            <select className="w-full border rounded px-3 py-2">
              <option value="0">Chọn trạng thái nhiệm vụ</option>
              <option value={"to do"}>to do</option> 
              <option value={"in progress"}>in  progress </option>
              <option value={"pending"}>pending</option>
              <option value={"done"}>done</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Ngày bắt đầu</label>
            <input type="date" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Hạn cuối</label>
            <input type="date" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Độ ưu tiên</label>
            <select className="w-full border rounded px-3 py-2">
              <option value={"0"}>Chọn độ ưu tiên nhiệm vụ</option>
              <option value={"thấp"}>Thấp</option>
              <option value={"trung bình"}>Trung bình</option>
              <option value={"cao"}>Cao</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Tiến độ</label>
            <select className="w-full border rounded px-3 py-2">
              <option value={"0"}>Chọn tiến độ dự án</option>
              <option value={"đúng tiến độ"}>Đúng tiến độ</option>
              <option value={"có rủi ro"}>Có rủi ro</option>
              <option value={"chậm tiến độ"}>Chậm tiến độ</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Hủy
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
