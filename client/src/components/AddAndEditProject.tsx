import React from "react";


interface AddAndEditProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAndEditProject({ isOpen, onClose }: AddAndEditProjectProps) {
  if (!isOpen) return null;

 




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Thêm/sửa dự án</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Tên dự án */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên dự án</label>
            <input
              type="text"
              placeholder="Nhập tên dự án"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Hình ảnh dự án */}
          <div>
            <label className="block text-sm font-medium mb-1">Hình ảnh dự án</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Mô tả dự án */}
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả dự án</label>
            <textarea
              rows={3}
              placeholder="Nhập mô tả dự án"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
