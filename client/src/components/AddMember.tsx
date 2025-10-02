
interface PropsMember {
  isOpen : boolean;
  onClose : () => void
}


export default function AddMember({isOpen,onClose} : PropsMember) {
  if(!isOpen) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Thêm thành viên</h2>
          <button  className="text-gray-500 hover:text-black"
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
            //   defaultValue="nguyenquangan318@gmail.com"
              className="w-full border rounded px-3 py-2 focus:outline-none"
              placeholder="Nhập email"
            />
            {/* <p className="text-red-500 text-sm mt-1">Thành viên đã tồn tại</p> */}
          </div>

          {/* Vai trò */}
          <div>
            <label className="block mb-1 font-medium">Vai trò</label>
            <input
              type="text"
              placeholder="Nhập vai trò"
              className="w-full border rounded px-3 py-2 focus:outline-none"
            />
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Lưu
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
