import React, { useEffect, useRef } from "react";
import { UserCircle, Lock, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = ({ isOpen, onClose }) => {
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
          className="absolute right-0 mt-2 w-[300px] bg-white rounded-lg shadow-lg"
        >
          <div className="p-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <UserCircle size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">okoders</p>
                <p className="text-xs text-gray-500">okoders@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link to="/Change-password">
              <button className="w-full px-4 py-2 text-sm flex items-center gap-3 rounded-md hover:bg-[#e0f6f1] hover:text-[#2ca58d] transition-colors group">
                <Lock size={16} className="text-gray-600 group-hover:text-[#2ca58d]" />
                <span className="font-medium">Change Password</span>
              </button>
            </Link>
            <div className="border-t my-1"></div>
            <button className="w-full px-4 py-2 text-sm flex items-center gap-3 rounded-md hover:bg-[#e0f6f1] hover:text-[#2ca58d] transition-colors group">
              <LogOut size={16} className="text-red-600 group-hover:text-[#2ca58d]" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
