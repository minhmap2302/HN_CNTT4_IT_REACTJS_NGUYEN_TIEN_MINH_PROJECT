import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { Project } from "../utils/type";
import { User } from "lucide-react";

interface PropsInfor {
  isOpen: boolean;
  onClose: () => void;
}

export default function InforMember({ isOpen, onClose }: PropsInfor) {
  if (!isOpen) return null;

  
  const project = useSelector((data: any) => {
    return data.management.project;
  });

  
  const users = useSelector((data: any) => {
    return data.account.users;
  });
  
  
  const { projectId } = useParams();
  console.log("projectId:", projectId);

  
  const arrProject: Project  = Array.isArray(project)
    ? project.find((i: Project) => i.id === Number(projectId))
    : null;

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

        
        <div className="space-y-4 overflow-y-auto max-h-[100px]">
          {arrProject?.members?.map((member: any, index: number) => {
            const user = users.find((u: any) => u.id === member.userId);
            if (!user) return null;

            return (
              <div className="grid grid-cols-2 items-center " key={index}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    <User />
                  </div>
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    defaultValue={member.role || "Member"}
                    className="border rounded px-3 py-1 w-full"
                  />
                  <button className="text-red-500 hover:text-red-700">
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
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
