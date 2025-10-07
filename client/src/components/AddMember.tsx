import { useState } from "react";
import type { Project } from "../utils/type";

interface PropsMember {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function AddMember({ isOpen, onClose, project }: PropsMember) {
  if (!isOpen) return null;
  if(project!=null){
    console.log(project);
  }
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    if (!email || !role) {
      setError("Hãy điền đầy đủ thông tin");
      return;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
        <div className="bg-white w-[450px] rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Thêm thành viên</h2>
            <button
              className="text-gray-500 hover:text-black"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  error ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Nhập email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Vai trò */}
            <div>
              <label className="block mb-1 font-medium">Vai trò</label>
              <input
                type="text"
                placeholder="Nhập vai trò"
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  error ? "border-red-500" : "border-gray-200"
                }`}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          {/* Buttons */}
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
    </>
  );
}
