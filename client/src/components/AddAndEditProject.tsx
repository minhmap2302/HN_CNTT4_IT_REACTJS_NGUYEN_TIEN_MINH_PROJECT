import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addProject, editProject } from "../store/slices/managementSlice";
import axios from "axios";
import type { Project } from "../utils/type";

interface AddAndEditProjectProps {
  isOpen: boolean;
  onClose: () => void;
  edit: Project | null;
}

export default function AddAndEditProject({
  isOpen,
  onClose,
  edit,
}: AddAndEditProjectProps) {
  const [nameProject, setNameProject] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState("");

  const dispatch: any = useDispatch();

  // ✅ Cập nhật dữ liệu khi "edit" thay đổi
  useEffect(() => {
    if (edit && typeof edit === "object") {
      setNameProject(edit.projectName || "");
      setUrl(edit.image || "");
      setNote(edit.note || "");
    } else {
      setNameProject("");
      setImage(null);
      setNote("");
      setUrl("");
    }
  }, [edit]);

  const handleInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_image");
    formData.append("cloud_name", "di8bnnkmd");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/di8bnnkmd/image/upload",
        formData
      );
      setUrl(response.data.secure_url);
    } catch (error) {
      console.error("Lỗi upload:", error);
    }
  };

  const handleAddProject = () => {
    if (!nameProject || !url) {
      setError("Không được để trống");
      return;
    }

    if (edit) {
      // ✅ Sửa dự án
      const newproject = {
        id: edit.id,
        projectName: nameProject,
        image: url,
        note: note,
        members: [...(edit.members || [])],
      };
      dispatch(editProject(newproject));
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Sửa thành công",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        resetForm();
        onClose();
      });
    } else {
      // ✅ Thêm dự án
      const newproject = {
        projectName: nameProject,
        image: url,
        note: note,
        members: [],
      };
      dispatch(addProject(newproject));
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Thêm dự án thành công",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        resetForm();
        onClose();
      });
    }
  };

  const resetForm = () => {
    setImage(null);
    setNameProject("");
    setNote("");
    setError("");
    setUrl("");
  };

  return (
    // ✅ Không return null nữa — luôn render nhưng ẩn/hiện bằng CSS
    <div
      className={`fixed inset-0 bg-black/30 z-50 items-center justify-center ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {edit ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Tên dự án */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên dự án</label>
            <input
              type="text"
              placeholder="Nhập tên dự án"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              value={nameProject}
              onChange={(e) => setNameProject(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hình ảnh dự án
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleInputImage}
            />
            {url && (
              <div className="mt-2 w-32">
                <img
                  src={url}
                  alt="Ảnh dự án"
                  className="rounded shadow-sm border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả dự án</label>
            <textarea
              rows={3}
              placeholder="Nhập mô tả dự án"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleAddProject}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
