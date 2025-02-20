import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, User, Settings, Users, Package, Home, Warehouse, ChevronDown, Building, FileText } from 'lucide-react';
import Notification from '../models/notification';
import Profile from '../models/profile';
import { Avatar } from '@mui/material';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notificationRef = React.useRef(null);
  const userMenuRef = React.useRef(null);

  const findActiveDropdown = () => {
    if (!isSidebarOpen && isDesktop) return null;
    
    const activeIndex = menuItems.findIndex(item =>
      item.isDropdown && item.items.some(subItem => subItem.path === location.pathname)
    );
    return activeIndex >= 0 ? activeIndex : null;
  };

  useEffect(() => {
    if (!isSidebarOpen && isDesktop) {
      setActiveDropdown(null);
      return;
    }

    const currentActive = findActiveDropdown();
    if (currentActive !== null) {
      setActiveDropdown(currentActive);
    }
  }, [location.pathname, isSidebarOpen, isDesktop]);

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);
      
      if (newIsDesktop && !isSidebarOpen) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  const menuItems = [
    { path: '/', icon: <Warehouse size={18} />, text: 'Profile of Company' },
    {
      text: 'Profile Of Farmer',
      icon: <FileText size={18} />,
      isDropdown: true,
      items: [
        { path: '/add-farmers', text: 'Add Farmer' },
      ]
    },
    {
      text: 'Enquiries',
      icon: <Package size={18} />,
      isDropdown: true,
      items: [
        { path: '/farmer-enquiry', text: 'Farmer Enquiry' },
        { path: '/Onboard-enquiry', text: 'Company Onboarded' },
      ]
    },

  ];

  const handleDropdownClick = (index) => {
    if (!isSidebarOpen && isDesktop) {
      return;
    }
    
    const newState = activeDropdown === index ? null : index;
    setActiveDropdown(newState);
  };

  const renderMenuItem = (item, index) => {
    const isActive = location.pathname === item.path;
    const isDropdownActive = activeDropdown === index;

    if (item.isDropdown) {
      return (
        <div key={item.text} className="relative group">
          <button
            onClick={() => handleDropdownClick(index)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
              ${isDropdownActive && (isSidebarOpen || !isDesktop) ? 'bg-[#e0f6f1] text-[#2ca58d]' : 'text-[#616161] hover:bg-[#f0faf7]'}
              ${!isSidebarOpen && isDesktop ? 'justify-center' : ''}`}
          >
            <div className="shrink-0">{item.icon}</div>
            {(isSidebarOpen || !isDesktop) && (
              <>
                <span className="whitespace-nowrap text-sm font-medium">
                  {item.text}
                </span>
                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform ${isDropdownActive ? 'rotate-180' : ''}`}
                />
              </>
            )}
            {!isSidebarOpen && isDesktop && (
              <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.text}
              </div>
            )}
          </button>
          {((isDropdownActive && (isSidebarOpen || !isDesktop)) || (!isSidebarOpen && isDesktop && item.isDropdown)) && (
            <div className={`mt-3 ${!isSidebarOpen && isDesktop
                ? 'absolute left-full top-0 ml-2 bg-white shadow-lg rounded-lg p-1 min-w-40 z-50 opacity-0 group-hover:opacity-100'
                : 'ml-4'}`}
            >
              {item.items.map((subItem) => {
                const isSubItemActive = location.pathname === subItem.path;
                return (
                  <div key={subItem.path} className="relative pl-6 mb-0.5 last:mb-0">
                       <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
                    <div className="absolute left-2 top-1/2 w-4 h-px bg-gray-200" />
                    <div className={`absolute left-[6px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full 
                      ${isSubItemActive ? 'bg-[#2ca58d]' : 'bg-gray-400'}`} />

                    <Link
                      to={subItem.path}
                      className={`block py-3 px-3 rounded-md transition-colors text-sm font-medium
                        ${isSubItemActive ? 'text-[#2ca58d] bg-[#e0f6f1]' : 'text-gray-700 hover:bg-[#f0faf7] hover:text-[#2ca58d]'}`}
                    >
                      {subItem.text}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
          ${isActive ? 'bg-[#e0f6f1] text-[#2ca58d]' : 'text-[#616161] hover:bg-[#f0faf7]'}
          ${!isSidebarOpen && isDesktop ? 'justify-center' : ''}`}
      >
        <div className="shrink-0">{item.icon}</div>
        {(isSidebarOpen || !isDesktop) && (
          <span className="whitespace-nowrap text-sm font-medium">
            {item.text}
          </span>
        )}
        {!isSidebarOpen && isDesktop && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {item.text}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white fixed w-full z-[60] px-4 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="https://finpartner.km-ira.com/static/media/KhetiMitra_Logo.99483d913ba831adfa800e50d5d1f53f.svg"
              alt="Kheti Mitra"
              className="h-15 hidden sm:inline"
            />
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 sm:p-2 bg-[#e0f6f1] rounded-md hover:bg-[#2ca58d] hover:text-white transition-colors group"
            >
              <Menu size={18} className="text-[#2ca58d] group-hover:text-white transition-colors sm:size-18" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span style={{
              fontWeight: 700,
              color: '#616161'
            }} className="hidden sm:inline text-sm font-semibold">
              COMPANY EXECUTIVE
            </span>
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsUserMenuOpen(false);
                }}
                className="p-1 sm:p-2 bg-[#e0f6f1] rounded-md hover:bg-[#2ca58d] hover:text-white transition-colors group"
              >
                <Bell size={18} className="text-[#2ca58d] group-hover:text-white transition-colors sm:size-18" />
              </button>
              <Notification
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsNotificationOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${isUserMenuOpen ? "bg-[#0A2342] text-white" : "bg-[#e4e8eb] hover:bg-[#0A2342] hover:text-white"
                  }`}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: isUserMenuOpen ? "white" : "gray",
                    color: isUserMenuOpen ? "#0A2342" : "white",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                />
                <Settings
                  size={20}
                  className={`transition-colors ${isUserMenuOpen ? "text-white" : "text-[#2d3c50] hover:text-white"
                    }`}
                />
              </button>
              <Profile isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[45]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-white transition-all duration-300 z-[50] pt-16
          ${isSidebarOpen ? 'w-72 translate-x-0' : `${isDesktop ? 'w-20' : 'w-72'} ${isDesktop ? 'translate-x-0' : '-translate-x-full'}`}`}
      >
        <nav className="p-5 space-y-2 mt-2">
          {(isSidebarOpen || !isDesktop) && (
            <div className="py-4 ">
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: 500
              }}>Dashboard</h2>
            </div>
          )}
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </nav>
      </aside>

      <main
        className={`transition-all duration-300 pt-16
          ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
          ml-0`}
      >
        <div className="p-5 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;