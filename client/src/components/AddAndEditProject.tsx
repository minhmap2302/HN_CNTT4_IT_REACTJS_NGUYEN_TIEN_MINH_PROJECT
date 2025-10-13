import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addProject, editProject } from "../store/slices/managementSlice";
import axios from "axios";
import type { Project } from "../utils/type";

interface AddAndEditProjectProps {
  isOpen: boolean;
  onClose: () => void;
  edit: Project | null;
  id: string | undefined;
}

export default function AddAndEditProject({
  isOpen,
  onClose,
  edit,
  id,
}: AddAndEditProjectProps) {
  if(!isOpen) return null;
  const [nameProject, setNameProject] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [url, setUrl] = useState<string>("");
  const [errorName, setErrorName] = useState("");
  const [errorImg , setErrorImg] = useState("");
  const [errorNote , setErrorNote] = useState("");
  const dispatch: any = useDispatch();

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
  const resetForm = () => {
    setImage(null);
    setNameProject("");
    setNote("");
    setErrorImg("");
    setErrorName("");
    setUrl("");
    
  };
  const project = useSelector((data:any) =>{
    return data.management.project;
  })
  const findProject = project.find((i:Project) => i.projectName === nameProject);
  const handleAddProject = () => {
    if (!nameProject || !url) {
      setErrorName("Không được để trống");
      setErrorImg("Không được để trống");
      return;
    }
    if(nameProject.length > 30){
      setErrorName("Tên dự án chỉ được tối đa 30 kí tự");
      return;
    }
    if(note.length>50){
      setErrorNote("Mô tả dự án chỉ tối đa 50 kí tự");
      return;
    }
    if(findProject != undefined && !edit){
      setErrorName("Dự án này đã tồn tại");
      return;
    }

    if (edit) {
      //  Sửa dự án
      const editproject = {
        id: Number(edit.id),
        idUser: Number(edit.idUser),
        projectName: nameProject,
        image: url,
        note: note,
        members: [...(edit.members || [])],
      };
      dispatch(editProject(editproject));
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
      //  Thêm dự án
      const newproject = {
        projectName: nameProject,
        idUser: id != undefined ? Number(id) : "",
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

  return (
    //  Không return null nữa — luôn render nhưng ẩn/hiện bằng CSS
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
    >
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {edit ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
          </h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-500 hover:text-black"
          >
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
                errorName ? "border-red-500" : "border-gray-300"
              }`}
              value={nameProject}
              onChange={(e) => setNameProject(e.target.value)}
            />
            {errorName && <p className="text-red-500 text-sm mt-1">{errorName}</p>}
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hình ảnh dự án
            </label>
            <input
              type="file"
              className={`w-full border border-gray-300 rounded px-3 py-2 ${
                errorImg ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleInputImage}
            />
            {errorImg && <p className="text-red-500 text-sm mt-1">{errorImg}</p>}
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
            <label className="block text-sm font-medium mb-1">
              Mô tả dự án
            </label>
            <textarea
              rows={3}
              placeholder="Nhập mô tả dự án"
              className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                errorNote ? "border-red-500" : "border-gray-300"
              }`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          {errorNote && <p className="text-red-500 text-sm mt-1">{errorNote}</p>}
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
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
