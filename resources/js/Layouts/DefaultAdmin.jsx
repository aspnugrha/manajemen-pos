import React, { useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import { usePage } from "@inertiajs/inertia-react";
import Sidebar from "./Sidebar";
import ProfileDropdown from "./ProfileDropdown";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

const DefaultAdmin = ({ children }) => {
    const { breadcrumb } = usePage().props;
    const { activeMenu } = usePage().props;
    const { activeSubmenu } = usePage().props;
    const { session } = usePage().props;

    useEffect(() => {
        if (session.success) {
            toast.success(session.success);
        }
    }, [session.success]);

    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const main = document.querySelector(".main");

    useEffect(() => {
        (async function () {
            if (window.innerWidth < 768) {
                main.classList.toggle("active");
                sidebarOverlay.classList.toggle("hidden");
                sidebarMenu.classList.toggle("-translate-x-full");
            }
        });
    }, []);

    const clickSidebarToggle = async (e) => {
        // sidebarToggle.addEventListener("click", function (e) {
        e.preventDefault();
        main.classList.toggle("active");
        sidebarOverlay.classList.toggle("hidden");
        sidebarMenu.classList.toggle("-translate-x-full");
        // });
    };

    document
        .querySelectorAll(".sidebar-dropdown-toggle")
        .forEach(function (item) {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                const parent = item.closest(".group");
                if (parent.classList.contains("selected")) {
                    parent.classList.remove("selected");
                } else {
                    document
                        .querySelectorAll(".sidebar-dropdown-toggle")
                        .forEach(function (i) {
                            i.closest(".group").classList.remove("selected");
                        });
                    parent.classList.add("selected");
                }
            });
        });

    return (
        <>
            <Sidebar
                activeMenu={activeMenu}
                activeSubmenu={activeSubmenu}
            ></Sidebar>

            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                    <button
                        type="button"
                        className="text-lg text-gray-600 sidebar-toggle"
                        onClick={(e) => clickSidebarToggle(e)}
                    >
                        <i className="ri-menu-line"></i>
                    </button>
                    <Breadcrumb data={breadcrumb}></Breadcrumb>
                    <ProfileDropdown></ProfileDropdown>
                </div>

                <div className="p-6">{children}</div>
            </main>

            <Toaster></Toaster>
        </>
    );
};

export default DefaultAdmin;
