export default function LogIn() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center py-16 sm:py-24">
        <div className="w-full max-w-md mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            Đăng nhập
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Địa chỉ email"
                  className={`w-full px-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  //${errors.email ? "border-red-500" : "border-gray-200"}
                />
                {/* {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )} */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  //${errors.password ? "border-red-500" : "border-gray-200"} 
                />
                {/* {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )} */}
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition"
              >
                Đăng nhập
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Chưa có tài khoản?{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Đăng ký
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
