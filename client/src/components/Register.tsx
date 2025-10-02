export default function Register() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center py-16 sm:py-24">
        <div className="w-full max-w-md mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            Đăng ký
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <form className="space-y-4">
              <div>
                <input
                  name="name"
                  placeholder="Họ và tên"
                  className={`w-full px-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  //${errors.name ? 'border-red-500' : 'border-gray-200'}
                />
                {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>} */}
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Địa chỉ email"
                  className={`w-full px-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  //${errors.email ? 'border-red-500' : 'border-gray-200'}
                />
                {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
              </div>

              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  className={`w-full px-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  //${errors.password ? 'border-red-500' : 'border-gray-200'}
                />
                {/* {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>} */}
              </div>

              <div>
                <input
                  name="confirm"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  className={`w-full px-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  //${errors.confirm ? 'border-red-500' : 'border-gray-200'}
                />
                {/* {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>} */}
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
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Đăng nhập
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
