import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import { addUser, getAllAccount } from "../store/slices/accountSlice";
import type { User } from "../utils/type";
import Swal from "sweetalert2";

export default function Register() {
  // useState
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  // loi
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");

  // lấy data
  const getData = useSelector((data: any) => {
    console.log(data.account.users);
    return data.account.users;
  });
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPass) {
      setNameError("Vui lòng nhập họ tên");
      setEmailError("Vui lòng nhập email");
      setPasswordError("Vui lòng nhập mật khẩu");
      setConfirmPassError("Vui lòng nhập xác nhận mật khẩu");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Vui lòng nhập email đùng định dạng");
      return;
    }
    const findEmail = getData.findIndex((i: User) => i.email === email);
    if (findEmail != -1) {
      setEmailError("Email đã tồn tại");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Mật khẩu phải lớn hơn 8 kí tự");
      return;
    }
    if (password !== confirmPass) {
      setConfirmPassError("Mật khẩu không trùng khớp");
      return;
    }
    const newUser: any = {
      id: Date.now(),
      fullName: name,
      email: email,
      password: password,
    };
    dispatch(addUser(newUser));
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Đăng kí thành công",
      showConfirmButton: false,
      timer: 1000,
    }).then(() => {
      setEmail("");
      setName("");
      setConfirmPass("");
      setPassword("");
      navigate(`/${newUser.id}/management`);
    });
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center py-16 sm:py-24">
        <div className="w-full max-w-md mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            Đăng ký
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  name="name"
                  placeholder="Họ và tên"
                  className={`w-full px-4 py-3 rounded-lg border text-center focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    nameError ? "border-red-500" : "border-gray-200"
                  }`}
                  onChange={(e) => setName(e.target.value)}
                  onClick={() => {
                    setConfirmPassError("");
                    setEmailError("");
                    setNameError("");
                    setPasswordError("")
                  }}
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>

              <div>
                <input
                  name="email"
                  // type="email"
                  placeholder="Địa chỉ email"
                  className={`w-full px-4 py-3 rounded-lg border text-center focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    emailError ? "border-red-500" : "border-gray-200"
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={() => {
                    setConfirmPassError("");
                    setEmailError("");
                    setNameError("");
                    setPasswordError("")
                  }}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  className={`w-full px-4 py-3 rounded-lg border text-center  focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    passwordError ? "border-red-500" : "border-gray-200"
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={() => {
                    setConfirmPassError("");
                    setEmailError("");
                    setNameError("");
                    setPasswordError("")
                  }}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <div>
                <input
                  name="confirm"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  className={`w-full px-4 py-3 rounded-lg border text-center focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    confirmPassError ? "border-red-500" : "border-gray-200"
                  }`}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  onClick={() => {
                    setConfirmPassError("");
                    setEmailError("");
                    setNameError("");
                    setPasswordError("")
                  }}
                />
                {confirmPassError && (
                  <p className="text-red-500 text-sm mt-1">
                    {confirmPassError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition"
              >
                Đăng ký
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Đã có tài khoản?{" "}
              <NavLink
                to={"/login"}
                className="text-blue-600 font-medium hover:underline"
              >
                Đăng nhập
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
