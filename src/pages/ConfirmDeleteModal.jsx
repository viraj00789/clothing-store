import { FaTrashAlt } from "react-icons/fa";
import CommonModal from "../components/ui/CommonModal";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}) => {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
            <FaTrashAlt className="text-red-600" size={26} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-500 mb-6">{description}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default ConfirmModal;
