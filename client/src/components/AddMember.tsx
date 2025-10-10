import { useEffect, useState } from "react";
import type { Project, User } from "../utils/type";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../store/slices/accountSlice";
import { editProject } from "../store/slices/managementSlice";
import Swal from "sweetalert2";

interface PropsMember {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function AddMember({ isOpen, onClose, project }: PropsMember) {
  if (!isOpen) return null;
  if (project != null) {
    console.log("addMember", project);
  }
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorRole, setErrorRole] = useState<string>("");
  // lay dataUser
  const getData = useSelector((data: any) => {
    console.log("user ben add member", data.account.users);
    return data.account.users;
  });
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, []);

  const handleSave = () => {
    if (!email || !role) {
      setErrorEmail("Hãy điền đầy đủ thông tin");
      setErrorRole("Hãy điền đầy đủ thông tin");
      return;
    }
    // tim email
    const findEmail = getData.find((i: User) => i.email === email);
    console.log("tim email", findEmail);
    // check email trong project da co chua
    if (project?.members.find((i: any) => i.userId === findEmail.id)) {
      setErrorEmail("email đã tồn tại");
      return;
    }
    // check email da dang ki tai khoan chua
    if (findEmail == undefined) {
      setErrorEmail("email này chưa được đăng kí");
      return;
    }
    // them member vao project
    const newMember = {
      userId: findEmail.id,
      role: role,
    };

    if (project) {
      const projectUpdate = {
        ...project,
        members: [...project.members, newMember],
      };
      dispatch(editProject(projectUpdate));
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Thêm thành viên thành công",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        setEmail("");
        setRole("");
        setErrorEmail("");
        setErrorRole("");
        onClose();
      });
      
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
                  errorEmail ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Nhập email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errorEmail && (
                <p className="text-red-500 text-sm mt-1">{errorEmail}</p>
              )}
            </div>

            {/* Vai trò */}
            <div>
              <label className="block mb-1 font-medium">Vai trò</label>
              <input
                type="text"
                placeholder="Nhập vai trò"
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errorRole ? "border-red-500" : "border-gray-200"
                }`}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
              {errorRole && (
                <p className="text-red-500 text-sm mt-1">{errorRole}</p>
              )}
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
