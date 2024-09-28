import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Swal from "sweetalert2";

const ProfileDropdown = () => {
    const { auth } = usePage().props;
    console.log("profile", auth.user.name);

    const logoutAct = () => {
        Swal.fire({
            title: "Peringatan!",
            text: "Apakah anda yakin ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, keluar",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(`/logout`);
            }
        });
    };

    return (
        <ul className="ml-auto flex items-center">
            <details className="dropdown dropdown-end">
                <summary className="btn m-1 btn-ghost">
                    <span className="hidden lg:block">
                        {auth.user.name} &nbsp;
                    </span>
                    <div className="avatar">
                        <div className="ring-gray-300 ring-offset-slate-100 w-8 lg:w-9 rounded-full ring ring-offset-2">
                            <img
                                src={
                                    auth.user.image
                                        ? "/assets/upload/image/" +
                                          auth.user.image
                                        : "/assets/image/kosong/profile-l.png"
                                }
                            />
                        </div>
                    </div>
                </summary>
                <ul className="menu dropdown-content bg-white rounded-box z-[1] w-52 p-2 shadow mt-3">
                    <div className="p-4">
                        <h4 className="text-md">
                            <b>
                                <i>{auth.user.name}</i>
                            </b>
                        </h4>
                        <p>{auth.user.email}</p>
                    </div>
                    <hr />
                    <li>
                        <a>
                            <i className="ri-user-settings-line"></i>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a>
                            <i className="ri-settings-4-line"></i>
                            Setting
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a href="#" onClick={() => logoutAct()}>
                            <i className="ri-logout-box-line"></i>
                            Logout
                        </a>
                    </li>
                </ul>
            </details>
        </ul>
    );
};

export default ProfileDropdown;
