import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdOutlineShoppingCart,
  MdOutlineDashboard,
  MdOutlineSettings,
  MdStorefront,
} from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiChevronDown, FiUsers, FiTag, FiExternalLink } from 'react-icons/fi';
import { IoCardOutline, IoExitOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <h1 className="text-2xl font-bold text-primaryBrand tracking-wide">
          DEALP🛒RT
        </h1>
        <NavLink to="/"></NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-subleText">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText hover:text-white
                  duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                    pathname === '/' &&
                    'bg-primaryBrand text-white dark:bg-meta-4'
                  }`}
                >
                  <MdOutlineDashboard className="text-lg" />
                  Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Dashboard --> */}
              {/* <!-- Menu Item OrderManagement --> */}
              <li>
                <NavLink
                  to="/OrderManagement"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText hover:text-white
                   duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                     pathname.includes('OrderManagement') &&
                     'bg-primaryBrand text-white dark:bg-meta-4'
                   }`}
                >
                  <MdOutlineShoppingCart className="text-lg" />
                  Order Management
                </NavLink>
              </li>
              {/* <!-- Menu Item OrderManagement --> */}

              {/* <!-- Menu Item customer details--> */}
              <li>
                <NavLink
                  to="/CustomerDetails"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText 
                  hover:text-white duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                    pathname.includes('CustomerDetails') &&
                    'text-white bg-primaryBrand dark:bg-meta-4'
                  }`}
                >
                  <FiUsers className="text-lg" />
                  Customer Details
                </NavLink>
              </li>
              {/* <!-- Menu Item customer detail --> */}

              {/* <!-- Menu Item Category --> */}
              <li>
                <NavLink
                  to="/Categories"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText 
                  hover:text-white duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                    pathname.includes('Categories') &&
                    'text-white bg-primaryBrand dark:bg-meta-4'
                  }`}
                >
                  <FiTag className="text-lg" />
                  Categories
                </NavLink>
              </li>
              {/* <!-- Menu Item Category --> */}

              {/* <!-- Menu Item Transaksi --> */}
              <li>
                <NavLink
                  to="/Transaction"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText 
                  hover:text-white duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                    pathname.includes('Transaction') &&
                    'bg-primaryBrand text-white  dark:bg-meta-4'
                  }`}
                >
                  <IoCardOutline className=" text-lg" />
                  Transaction
                </NavLink>
              </li>
              {/* <!-- Menu Item Transaksi --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-subleText">
              PRODUCT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Product --> */}
              <li>
                <NavLink
                  to="/AddProduct"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText hover:text-white
                   duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                     pathname.includes('AddProduct') &&
                     'bg-primaryBrand text-white dark:bg-meta-4'
                   }`}
                >
                  <IoMdAdd className=" text-lg" />
                  Add Product
                </NavLink>
              </li>
              {/* <!-- Menu Item Product --> */}
              {/* <!-- Menu Item Type Product --> */}
              <li>
                <NavLink
                  to="/AddType"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText hover:text-white
                   duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                     pathname.includes('AddType') &&
                     'bg-primaryBrand text-white dark:bg-meta-4'
                   }`}
                >
                  <IoMdAdd className=" text-lg" />
                  Add Type Product
                </NavLink>
              </li>
              {/* <!-- Menu Item Type Product --> */}
            </ul>
          </div>
          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-subleText">
              ADMIN
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Product --> */}
              <li>
                <NavLink
                  to="/AdminRole"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText hover:text-white
                   duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                     pathname.includes('AdminRole') &&
                     'bg-primaryBrand text-white dark:bg-meta-4'
                   }`}
                >
                  <FaRegUserCircle className=" text-lg" />
                  Admin Role
                </NavLink>
              </li>
              {/* <!-- Menu Item Product --> */}
              {/* <!-- Menu Item Setting --> */}
              <li>
                <NavLink
                  to="/Settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText hover:text-white
                   duration-300 ease-in-out hover:bg-primaryBrand dark:hover:bg-meta-4 ${
                     pathname.includes('Settings') &&
                     'bg-primaryBrand text-white dark:bg-meta-4'
                   }`}
                >
                  <MdOutlineSettings className=" text-lg" />
                  Settings
                </NavLink>
              </li>
              {/* <!-- Menu Item Setting --> */}
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-subleText font-lato duration-300 ease-in-out hover:bg-primaryBrand hover:text-white dark:hover:bg-meta-4 ${
                          (pathname === '/auth' || pathname.includes('auth')) &&
                          'bg-graydark  dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9814)">
                            <path
                              d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                              fill=""
                            />
                            <path
                              d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9814">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Authentication
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/auth/signin"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-black dark:hover:text-white ' +
                                (isActive && '!text-black dark:text-white')
                              }
                            >
                              Sign In
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/auth/signup"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-black dark:hover:text-white ' +
                                (isActive && '!text-black dark:text-white')
                              }
                            >
                              Sign Up
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
          {/* <!-- Sidebar User Info --> */}
          <div className="mt-auto border-gray-200 dark:border-gray-700 pt-5 px-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40" // Ganti dengan path avatar user
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Malsky
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Malsky@matrixsync
                  </p>
                </div>
              </div>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <IoExitOutline className="text-lg text-subleText" />
              </a>
            </div>

            <NavLink
              to="/YourShop"
              className="flex items-center justify-between gap-2 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm font-medium text-subleText hover:bg-primaryBrand/10 transition-colors"
            >
              <div className="flex items-center gap-2 dark:text-gray text-secondaryBrand">
                <MdStorefront className="text-xl" />
                Your Shop
              </div>
              <FiExternalLink className="text-base" />
            </NavLink>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
