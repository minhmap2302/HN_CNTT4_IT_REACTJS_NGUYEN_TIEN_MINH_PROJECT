import { useDispatch } from "react-redux";
import { deleteProject } from "../store/slices/managementSlice";

interface DeleteProjectProps {
  isOpen: boolean;
  onClose: () => void;
  deleteProject2 : any
}
export default function DeleteProject({ isOpen, onClose , deleteProject2 }: DeleteProjectProps) {
  const dispatch : any= useDispatch();
  if (!isOpen) return null;
  const handleDelete = () => {
    dispatch(deleteProject(deleteProject2));
    onClose();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-lg font-semibold">Xác nhận xoá</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-6">
          <p>Bạn chắc chắn muốn xoá dự án này?</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-4 py-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
