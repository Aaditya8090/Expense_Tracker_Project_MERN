import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200/50 shadow-sm transition-all duration-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">

              {/* Left Side - Logo */}
              <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="p-2 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <SiAuthy className="h-6 w-6 text-white" />
                  </div>
                  <span className="hidden sm:block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-blue-800 tracking-tight">
                    XpenseX
                  </span>
                </Link>
              </div>

              {/* Center/Right - Desktop Menu */}
              <div className="hidden md:flex flex-1 justify-end items-center gap-6">
                <Link
                  to="/login"
                  className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <RiLoginCircleLine className="h-5 w-5 text-gray-400 group-hover:text-teal-500 transition-colors" aria-hidden="true" />
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaRegUser className="h-4 w-4" aria-hidden="true" />
                  Sign up free
                </Link>
              </div>

              {/* Right - Mobile Menu Button */}
              <div className="flex md:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-lg p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
            <div className="space-y-2 px-4 pb-6 pt-4">
              <Link to="/login" className="block">
                <Disclosure.Button
                  as="div"
                  className="flex items-center justify-center gap-3 rounded-xl bg-gray-50 px-3 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <RiLoginCircleLine className="h-5 w-5 text-gray-500" />
                  Log in
                </Disclosure.Button>
              </Link>
              <Link to="/register" className="block">
                <Disclosure.Button
                  as="div"
                  className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 px-3 py-3 text-base font-bold text-white shadow-md"
                >
                  <FaRegUser className="h-5 w-5" />
                  Sign up for free
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

