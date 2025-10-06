

interface PropsAddandEdit {
  isOpen : boolean;
  onClose: () => void;
}


export default function AddAndEditDetails({isOpen , onClose} : PropsAddandEdit) {

  if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Thêm/Sửa nhiệm vụ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4">

          {/* Tên nhiệm vụ */}
          <div>
            <label className="block mb-1 font-medium">Tên nhiệm vụ</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {/* <p className="text-red-500 text-sm mt-1">Lỗi validate ở đây (nếu có)</p> */}
          </div>

          {/* Người phụ trách */}
          <div>
            <label className="block mb-1 font-medium">Người phụ trách</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Chọn người...</option>
              <option>Nguyễn Văn A</option>
              <option>Trần Thị B</option>
            </select>
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block mb-1 font-medium">Trạng thái</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Đang làm</option>
              <option>Hoàn thành</option>
              <option>Tạm dừng</option>
            </select>
          </div>

          {/* Ngày bắt đầu */}
          <div>
            <label className="block mb-1 font-medium">Ngày bắt đầu</label>
            <input type="date" className="w-full border rounded px-3 py-2" />
          </div>

          {/* Hạn cuối */}
          <div>
            <label className="block mb-1 font-medium">Hạn cuối</label>
            <input type="date" className="w-full border rounded px-3 py-2" />
          </div>

          {/* Độ ưu tiên */}
          <div>
            <label className="block mb-1 font-medium">Độ ưu tiên</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Thấp</option>
              <option>Trung bình</option>
              <option>Cao</option>
            </select>
          </div>

          {/* Tiến độ */}
          <div>
            <label className="block mb-1 font-medium">Tiến độ</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Đúng tiến độ</option>
              <option>Có rủi ro</option>
              <option>Chậm tiến độ</option>
            </select>
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
  );
}
