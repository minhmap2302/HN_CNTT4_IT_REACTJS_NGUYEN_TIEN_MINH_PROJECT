import React from "react";

export default function Header() {
  return (
    <div className="w-full bg-[#1e1e1e] text-white px-6 py-3 flex items-center justify-around border-b">
      {/* Bên trái */}
      <h1 className="text-lg font-medium">Quản Lý Dự Án</h1>

      {/* Bên phải */}
      <nav className="flex items-center space-x-6 text-sm">
        <a href="#" className="hover:text-blue-400">Dự Án</a>
        <a href="#" className="hover:text-blue-400">Nhiệm Vụ của tôi</a>
        <a href="#" className="hover:text-blue-400">Đăng Xuất</a>
      </nav>
    </div>
  );
}
