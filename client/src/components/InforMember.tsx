import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { Project } from "../utils/type";
import { User } from "lucide-react";
import { updateProjectMembers, editProject } from "../store/slices/managementSlice";

interface PropsInfor {
  isOpen: boolean;
  onClose: () => void;
}

export default function InforMember({ isOpen, onClose }: PropsInfor) {
  if (!isOpen) return null;

  const dispatch: any = useDispatch();
  const { projectId } = useParams();

  const projects = useSelector((data: any) => data.management.project);
  const users = useSelector((data: any) => data.account.users);

  const project: Project | undefined = Array.isArray(projects)
    ? projects.find((p: Project) => p.id === Number(projectId))
    : undefined;

  const [members, setMembers] = useState<any[]>(project?.members || []);

  // Hàm xóa thành viên
  const handleDelete = (index: number) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  // Hàm thay đổi vai trò
  const handleRoleChange = (index: number, newRole: string) => {
    const updated = members.map((m, i) =>
      i === index ? { ...m, role: newRole } : m
    );
    setMembers(updated);
  };

  // Hàm lưu thay đổi
  const handleSave = async () => {
    if (!project) return;
    const updatedProject = { ...project, members };
    // Cập nhật Redux
    dispatch(updateProjectMembers({ projectId: project.id, members }));
    // Cập nhật API
    await dispatch(editProject(updatedProject));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[750px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Thành viên</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 font-medium px-2 mb-2">
          <div>Thành viên</div>
          <div>Vai trò</div>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[300px]">
          {members.map((member: any, index: number) => {
            const user = users.find((u: any) => u.id === member.userId);
            if (!user) return null;

            return (
              <div
                className="grid grid-cols-2 items-center border-b pb-2"
                key={index}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    className="border rounded px-3 py-1 w-full text-sm"
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(index)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
