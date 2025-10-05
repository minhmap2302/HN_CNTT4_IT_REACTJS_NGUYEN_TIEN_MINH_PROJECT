import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllAccount } from "../store/slices/accountSlice";
import type { User } from "../utils/type";
import Swal from "sweetalert2";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  //lay
  // lấy data
  const getData = useSelector((data: any) => {
    console.log(data.account.users);
    return data.account.users;
  });
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, []);

  const navi = useNavigate();

  // submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setEmailError("Vui lòng nhập email");
      setPasswordError("Vui lòng nhập mật khẩu");
      return;
    }
    const search = getData.findIndex(
      (i: User) => i.email === email && i.password === password
    );
    if (search !== -1) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        navi("/management");
      });
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center py-16 sm:py-24">
        <div className="w-full max-w-md mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            Đăng nhập
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Địa chỉ email"
                  className={`w-full px-4 py-3 rounded-lg border text-center focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    emailError ? "border-red-500" : "border-gray-200"
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  className={`w-full px-4 py-3 rounded-lg border text-center focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    passwordError ? "border-red-500" : "border-gray-200"
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center text-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition"
              >
                Đăng nhập
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Chưa có tài khoản?{" "}
              <NavLink
                to={"/"}
                className="text-blue-600 font-medium hover:underline"
              >
                Đăng ký
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
