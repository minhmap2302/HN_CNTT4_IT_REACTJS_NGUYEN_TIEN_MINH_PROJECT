import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1e1e1e] text-white px-6 py-3 flex items-center justify-around border-b border-gray-700">
      <h1 className="text-lg font-medium">Quản Lý Dự Án</h1>
      <nav className="flex items-center space-x-6 text-sm">
        <NavLink to="/management" className="hover:text-blue-400">Dự Án</NavLink>
        <NavLink to="" className="hover:text-blue-400">Nhiệm Vụ của tôi</NavLink>
        <NavLink to="/login" className="hover:text-blue-400">Đăng Xuất</NavLink>
      </nav>
    </header>
  );
}
