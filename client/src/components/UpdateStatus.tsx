import { useState } from "react";

interface UpdateStatus {
  isOpen: boolean;
  onClose: () => void;
}
export default function UpdateStatus({isOpen , onClose }: UpdateStatus) {
    if(!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-white rounded-lg shadow-lg w-[400px] animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center px-5 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Cập nhật trạng thái
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-6 text-gray-700">
            Xác nhận cập nhật trạng thái nhiệm vụ
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-5 py-3 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Huỷ
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
