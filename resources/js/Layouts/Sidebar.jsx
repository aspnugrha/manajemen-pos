import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Sidebar = ({ activeMenu, activeSubmenu }) => {
    console.log("submenu", activeMenu, activeSubmenu);

    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const main = document.querySelector(".main");

    const clickSidebarOverlay = async (e) => {
        // sidebarOverlay.addEventListener("click", function (e) {
        e.preventDefault();
        main.classList.add("active");
        sidebarOverlay.classList.add("hidden");
        sidebarMenu.classList.add("-translate-x-full");
        // });
    };

    return (
        <>
            <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
                <a
                    href="#"
                    className="flex items-center pb-4 border-b border-b-gray-800"
                >
                    {/* <img
                        src="https://placehold.co/32x32"
                        alt=""
                        className="w-8 h-8 rounded object-cover"
                    /> */}
                    <span className="text-lg font-bold text-white ml-3">
                        Manajemen POS
                    </span>
                </a>
                <ul className="mt-4">
                    <li
                        className={
                            "mb-1 group " +
                            (activeMenu == "dashboard" ? "active" : "")
                        }
                    >
                        <Link
                            href="/A/dashboard"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                        >
                            <i className="ri-home-office-line mr-3 text-lg"></i>
                            <span className="text-sm">Dashboard</span>
                        </Link>
                    </li>
                    <li
                        className={
                            "mb-1 group " +
                            (activeMenu == "item-settings"
                                ? "active selected"
                                : "")
                        }
                    >
                        <a
                            href="#"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                        >
                            <i className="ri-instance-line mr-3 text-lg"></i>
                            <span className="text-sm">Item Settings</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-4 mt-2 hidden group-[.selected]:block">
                            <li
                                className={
                                    `mb-1 pl-3 ` +
                                    (activeSubmenu == "units"
                                        ? "bg-gray-800 rounded"
                                        : "")
                                }
                            >
                                <Link
                                    href={"/A/manage-item-units"}
                                    className="text-gray-300 p-1 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Units
                                </Link>
                            </li>
                            <li
                                className={
                                    `mb-1 pl-3 ` +
                                    (activeSubmenu == "categories"
                                        ? "bg-gray-800 rounded"
                                        : "")
                                }
                            >
                                <Link
                                    href="/A/manage-item-categories"
                                    className="text-gray-300 p-1 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li
                                className={
                                    `mb-1 pl-3 ` +
                                    (activeSubmenu == "brands"
                                        ? "bg-gray-800 rounded"
                                        : "")
                                }
                            >
                                <Link
                                    href="/A/manage-item-brands"
                                    className="text-gray-300 p-1 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Brands
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            "mb-1 group " +
                            (activeMenu == "items" ? "active selected" : "")
                        }
                    >
                        <a
                            href="#"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                        >
                            <i className="ri-shopping-cart-2-line mr-3 text-lg"></i>
                            <span className="text-sm">Items</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-4 mt-2 hidden group-[.selected]:block">
                            <li
                                className={
                                    `mb-1 pl-3 ` +
                                    (activeSubmenu == "master-items"
                                        ? "bg-gray-800 rounded"
                                        : "")
                                }
                            >
                                <Link
                                    href="/A/manage-items"
                                    className="text-gray-300 p-1 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Master Items
                                </Link>
                            </li>
                            <li
                                className={
                                    `mb-1 pl-3 ` +
                                    (activeSubmenu == "stock-&-price-items"
                                        ? "bg-gray-800 rounded"
                                        : "")
                                }
                            >
                                <Link
                                    href="/A/stock-and-price"
                                    className="text-gray-300 p-1 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Stock & Price
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            "mb-1 group " +
                            (activeMenu == "transactions"
                                ? "active selected"
                                : "")
                        }
                    >
                        <a
                            href="#"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                        >
                            <i className="ri-shopping-cart-2-line mr-3 text-lg"></i>
                            <span className="text-sm">Transactions</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-4 mt-2 hidden group-[.selected]:block">
                            <li
                                className={
                                    `mb-1 pl-3 ` +
                                    (activeSubmenu == "manage-transactions"
                                        ? "bg-gray-800 rounded"
                                        : "")
                                }
                            >
                                <Link
                                    href="/A/manage-transactions"
                                    className="text-gray-300 p-1 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Manage Transaction
                                </Link>
                            </li>
                            <li
                                className={
                                    `mb-1 pl-3 ` +
                                    (activeSubmenu ==
                                    "manage-transactions-draft"
                                        ? "bg-gray-800 rounded"
                                        : "")
                                }
                            >
                                <Link
                                    href="/A/manage-transactions-draft"
                                    className="text-gray-300 p-1 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Manage Transaction Draft
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            "mb-1 group " +
                            (activeMenu == "pos" ? "active" : "")
                        }
                    >
                        <Link
                            onClick={() => {
                                window.open("/POS/orders");
                            }}
                            rel="noopener noreferrer"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                        >
                            <i className="ri-store-2-line mr-3 text-lg"></i>
                            <span className="text-sm">POS</span>
                        </Link>
                    </li>
                    {/* <li
                        className={
                            "mb-1 group " +
                            (activeMenu == "access" ? "active" : "")
                        }
                    >
                        <a
                            href="#"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                        >
                            <i className="ri-shield-user-line mr-3 text-lg"></i>
                            <span className="text-sm">Access</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                            <li className="mb-4">
                                <a
                                    href="#"
                                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Manage Role
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                >
                                    Manage Users
                                </a>
                            </li>
                        </ul>
                    </li> */}
                    <li
                        className={
                            "mb-1 group " +
                            (activeMenu == "settings" ? "active" : "")
                        }
                    >
                        <a
                            href="#"
                            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
                        >
                            <i className="ri-settings-2-line mr-3 text-lg"></i>
                            <span className="text-sm">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div
                className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
                onClick={(e) => clickSidebarOverlay(e)}
            ></div>
        </>
    );
};

export default Sidebar;
