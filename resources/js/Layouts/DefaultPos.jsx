import React, { useEffect } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

const DefaultPos = ({ children }) => {
    const { auth } = usePage().props;
    const { session } = usePage().props;

    useEffect(() => {
        if (session.success) {
            toast.success(session.success);
        }
    }, [session.success]);

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
        <>
            <main className="w-full bg-gray-50 min-h-screen transition-all">
                <div className="py-2 px-6 bg-base-50 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 bg-base-100">
                    <div className="flex-1">
                        <Link
                            href="/A/dashboard"
                            className="btn btn-ghost text-xl"
                        >
                            POS
                        </Link>
                    </div>
                    <div className="flex-none">
                        <Link
                            href="/POS/transactions"
                            className="btn btn-ghost text-white"
                        >
                            <i className="ri-bank-card-line text-md"></i>{" "}
                            Transactions
                        </Link>

                        <Link
                            href="/POS/transactions-draft"
                            className="btn btn-ghost text-white"
                        >
                            <i className="ri-draft-line text-md"></i> Draft
                        </Link>

                        <Link
                            href="/POS/orders"
                            className="btn btn-ghost text-white"
                        >
                            <i className="ri-shopping-cart-2-line text-md"></i>{" "}
                            Orders
                        </Link>

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
                                    <a href="#" onClick={() => logoutAct()}>
                                        <i className="ri-logout-box-line"></i>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>

                <div className="p-4">{children}</div>
            </main>
            <Toaster></Toaster>
        </>
    );
};

export default DefaultPos;
