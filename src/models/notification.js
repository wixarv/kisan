import React, { useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";

const Notification = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg"
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">

            <div className="p-4 border-b hover:bg-gray-50">
              <p style={{textAlign:'center'}} className="text-sm font-medium">No Notification</p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
