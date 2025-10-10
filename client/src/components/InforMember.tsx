import React from "react";
import { useSelector } from "react-redux";

interface PropsInfor {
  isOpen : boolean;
  onClose : () => void;
}


export default function InforMember({isOpen , onClose} : PropsInfor) {
  if (!isOpen) return null;
  // lấy dữ liệu từ project
  const project = useSelector((data:any) =>{
    console.log(data.management.project);
    return data.management.project;
  })

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[750px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Thành viên</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>✕</button>
        </div>
        <div className="grid grid-cols-2 font-medium px-2 mb-2">
          <div>Thành viên</div>
          <div>Vai trò</div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                AN
              </div>
              <div>
                <p className="font-medium">An Nguyễn</p>
                <p className="text-sm text-gray-500">nguyenquangan@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                defaultValue="Project owner"
                className="border rounded px-3 py-1 w-full"
              />
              <button className="text-red-500 hover:text-red-700">🗑️</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Đóng
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
