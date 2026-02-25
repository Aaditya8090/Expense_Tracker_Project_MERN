import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { SiAuthy } from "react-icons/si";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Add Transaction", href: "/add-transaction" },
    { name: "Categories", href: "/categories" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">

              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="p-2 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <SiAuthy className="h-6 w-6 text-white" />
                  </div>
                  <span className="hidden sm:block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-800 tracking-tight">
                    XpenseX
                  </span>
                </Link>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:ml-8 md:flex md:space-x-1 flex-1 justify-center">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={classNames(
                        isActive
                          ? "bg-teal-50 text-teal-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Right Menu (Profile & Logout) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={logoutHandler}
                  type="button"
                  className="hidden md:flex relative items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 focus:outline-none transition-all duration-200"
                >
                  <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                  <span>Logout</span>
                </button>

                {/* Avatar */}
                <div className="hidden md:ml-2 md:flex md:flex-shrink-0 md:items-center">
                  <Link to="/profile" className="relative ml-1 group">
                    <div className="relative flex rounded-full bg-gradient-to-tr from-teal-100 to-blue-100 p-1 text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform duration-300 group-hover:scale-110">
                      <div className="h-8 w-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold bg-teal-500 text-white">
                        U
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          <Disclosure.Panel className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
            <div className="space-y-1 pb-4 pt-2 px-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link key={link.name} to={link.href} className="block">
                    <Disclosure.Button
                      as="div"
                      className={classNames(
                        isActive
                          ? "bg-teal-50 text-teal-700 border-l-4 border-teal-500"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent",
                        "block py-3 pl-3 pr-4 text-base font-medium rounded-r-lg transition-colors"
                      )}
                    >
                      {link.name}
                    </Disclosure.Button>
                  </Link>
                );
              })}

              <div className="border-t border-gray-100 pt-4 mt-2">
                <Disclosure.Button
                  as="button"
                  onClick={logoutHandler}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-100 transition-colors"
                >
                  <IoLogOutOutline className="h-6 w-6" />
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
