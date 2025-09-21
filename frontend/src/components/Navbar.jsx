import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logoutHandler = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-5 md:px-10 py-4 font-medium">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-20 md:w-24 rounded-full hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm text-gray-700">
          {["/", "/collection", "/about", "/contect"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `relative flex flex-col items-center transition duration-300 hover:text-black ${isActive ? "text-black font-semibold" : "text-gray-600"
                }`
              }
            >
              <p>
                {path === "/"
                  ? "HOME"
                  : path.replace("/", "").toUpperCase()}
              </p>
              <span className="absolute -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            alt="Search"
            className="w-6 cursor-pointer hover:scale-110 transition"
          />

          {/* Profile */}
          {/* Profile */}
          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt="Profile"
              className="w-6 cursor-pointer"
            />

            {/* Dropdown */}
            {token && (
              <div
                className="absolute right-0 top-full hidden group-hover:flex 
                 flex-col gap-2 w-40 py-3 px-5 bg-white shadow-lg rounded-lg text-gray-600"
              >
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logoutHandler}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-6 min-w-6 hover:scale-110 transition"
            />
            <p className="absolute right-[-6px] bottom-[-6px] w-5 h-5 flex items-center justify-center bg-black text-white rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Button */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 cursor-pointer md:hidden hover:scale-110 transition"
            alt="Menu"
          />
        </div>
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${visible ? "w-3/4 sm:w-1/2" : "w-0"
          }`}
      >
        <div className="flex flex-col text-gray-700 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-5 rotate-180"
            />
            <p className="font-medium">Close</p>
          </div>
          {["/", "/collection", "/about", "/contect"].map((path, i) => (
            <NavLink
              key={i}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b transition duration-300 ${isActive
                  ? "bg-black text-white font-semibold"
                  : "hover:bg-gray-100"
                }`
              }
              to={path}
            >
              {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;