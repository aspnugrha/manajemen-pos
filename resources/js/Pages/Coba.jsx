import React from "react";
import { useState } from "react";
import {
    HomeModernIcon,
    ChartPieIcon,
    BellAlertIcon,
    ChatBubbleLeftIcon,
    ClipboardDocumentIcon,
    UsersIcon,
    EnvelopeIcon,
    PowerIcon,
    CursorArrowRippleIcon,
    FaceFrownIcon,
    CogIcon,
} from "@heroicons/react/24/solid";

function App() {
    const menu1 = [
        {
            name: "Dashboard",
            icon: <HomeModernIcon width={18} className="text-blue-500" />,
            isActive: true,
            multiple: false,
        },
        {
            name: "Analytics",
            isActive: false,
            multiple: true,
            icon: <ChartPieIcon width={18} className="text-gray-600" />,
        },
        {
            name: "Notification",
            isActive: false,
            multiple: false,
            icon: <BellAlertIcon width={18} className="text-gray-600" />,
        },
    ];

    const menu2 = [
        {
            name: "Chat",
            icon: <ChatBubbleLeftIcon width={18} className="text-gray-600 " />,
            isActive: false,
            multiple: false,
        },
        {
            name: "Notes",
            isActive: false,
            multiple: false,
            icon: (
                <ClipboardDocumentIcon width={18} className="text-gray-600" />
            ),
        },
        {
            name: "Customers",
            isActive: false,
            multiple: false,
            icon: <UsersIcon width={18} className="text-gray-600" />,
        },
        {
            name: "Mail",
            isActive: false,
            multiple: false,
            icon: <EnvelopeIcon width={18} className="text-gray-600" />,
        },
    ];

    const menu3 = [
        {
            name: "Login",
            icon: <PowerIcon width={18} className="text-gray-600" />,
            isActive: false,
            multiple: false,
        },
        {
            name: "Register",
            isActive: false,
            multiple: false,
            icon: (
                <CursorArrowRippleIcon width={18} className="text-gray-600" />
            ),
        },
        {
            name: "Error",
            isActive: false,
            multiple: false,
            icon: <FaceFrownIcon width={18} className="text-gray-600" />,
        },
    ];

    function dropDown() {
        document.querySelector("#submenu").classList.toggle("hidden");
        document.querySelector("#arrow").classList.toggle("rotate-0");
    }

    function openBar() {
        document.querySelector(".sidebar").classList.toggle("left-[-300px]");
    }

    return (
        <>
            {/* <div className="drawer">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-primary drawer-button"
                    >
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li>
                            <a>Sidebar Item 1</a>
                        </li>
                        <li>
                            <a>Sidebar Item 2</a>
                        </li>
                    </ul>
                </div>
            </div> */}
            <div className="grid grid-cols-2 gap-0">
                <div>
                    <div
                        className={`sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] duration-1000
    p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen`}
                    >
                        <div className="text-gray-100 text-xl">
                            <div className="p-2.5 mt-1 flex items-center rounded-md ">
                                <i className="bi bi-app-indicator px-2 py-1 bg-blue-600 rounded-md"></i>
                                <h1 className="text-[15px]  ml-3 text-xl text-gray-200 font-bold">
                                    Tailwindbar
                                </h1>
                                <i
                                    className="bi bi-x ml-20 cursor-pointer lg:hidden"
                                    // onclick="Openbar()"
                                ></i>
                            </div>
                            <hr className="my-2 text-gray-600" />

                            <div>
                                <div
                                    className="p-2.5 mt-3 flex items-center rounded-md 
        px-4 duration-300 cursor-pointer  bg-gray-700"
                                >
                                    <i className="bi bi-search text-sm"></i>
                                    <input
                                        className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                                        placeholder="Serach"
                                    />
                                </div>

                                <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                                    <i className="bi bi-house-door-fill"></i>
                                    <span className="text-[15px] ml-4 text-gray-200">
                                        Home
                                    </span>
                                </div>
                                <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                                    <i className="bi bi-bookmark-fill"></i>
                                    <span className="text-[15px] ml-4 text-gray-200">
                                        Bookmark
                                    </span>
                                </div>
                                <hr className="my-4 text-gray-600" />
                                <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                                    <i className="bi bi-envelope-fill"></i>
                                    <span className="text-[15px] ml-4 text-gray-200">
                                        Messages
                                    </span>
                                </div>
                                <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                                    <i className="bi bi-chat-left-text-fill"></i>
                                    <div
                                        className="flex justify-between w-full items-center"
                                        onClick={() => dropDown()}
                                    >
                                        <span className="text-[15px] ml-4 text-gray-200">
                                            Chatbox
                                        </span>
                                        <span
                                            className="text-sm rotate-180"
                                            id="arrow"
                                        >
                                            <i className="bi bi-chevron-down"></i>
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"
                                    id="submenu"
                                >
                                    <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                                        Social
                                    </h1>
                                    <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                                        Personal
                                    </h1>
                                    <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                                        Friends
                                    </h1>
                                </div>
                                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    <span className="text-[15px] ml-4 text-gray-200">
                                        Logout
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span
                        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                        // onclick="Openbar()"
                        onClick={() => openBar()}
                    >
                        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
                    </span>
                    <div className="carousel w-full">
                        <div
                            id="slide1"
                            className="carousel-item relative w-full"
                        >
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                                className="w-full"
                            />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide2" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                        <div
                            id="slide2"
                            className="carousel-item relative w-full"
                        >
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                                className="w-full"
                            />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide1" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide3" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                        <div
                            id="slide3"
                            className="carousel-item relative w-full"
                        >
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                                className="w-full"
                            />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide2" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide4" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                        <div
                            id="slide4"
                            className="carousel-item relative w-full"
                        >
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                                className="w-full"
                            />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide3" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide1" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Menus({ menu, title }) {
    console.log(menu, title);

    return (
        <div className="py-5">
            <h6 className="mb-4 text-[10px] sm:text-sm text-center sm:text-left sm:px-5 ">
                <span className="sm:hidden">{title.xs}</span>
                <span className="hidden sm:block">{title.sm}</span>
            </h6>
            <ul>
                {menu.map((val, index) => {
                    const menuActive = val.isActive
                        ? "bg-blue-300 bg-opacity-10 px-3 border border-blue-100 py-2 rounded-md text-blue-400 flex"
                        : "px-3 py-2 flex";

                    const textActive = val.isActive
                        ? "text-blue-500"
                        : "text-gray-700";

                    return val.multiple ? (
                        <li
                            key={index}
                            className={`${menuActive} cursor-pointer mx-5`}
                        >
                            <details
                                className={`ml-2 ${textActive} hidden sm:block`}
                            >
                                <summary className="flex">
                                    {val.icon} {val.name}
                                </summary>
                                <ul>
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    ) : (
                        <li
                            key={index}
                            className={`${menuActive} cursor-pointer mx-5`}
                        >
                            {val.icon}
                            <div
                                className={`ml-2 ${textActive} hidden sm:block`}
                            >
                                {val.name}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
