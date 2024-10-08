//import React
import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Login({ errors }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const storeLogin = async (e) => {
        e.preventDefault();

        Inertia.post("/login", {
            email,
            password,
        });
    };

    const tryDemoAccount = () => {
        setEmail("admin");
        setPassword("admin");
    };

    return (
        <section className="gradient-form h-full bg-slate-100">
            <div className="container h-full p-10">
                <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full py-5">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-gray-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            {/* <img
                                                className="mx-auto w-48"
                                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                alt="logo"
                                            /> */}
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold p-10 lg:p-2">
                                                Manajemen POS
                                            </h4>
                                        </div>

                                        <form onSubmit={storeLogin}>
                                            <p className="mb-5 text-slate-100">
                                                Login untuk melanjutkan
                                            </p>
                                            <div
                                                className="relative mb-4"
                                                data-twe-input-wrapper-init
                                            >
                                                <input
                                                    type="text"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="inputEmail"
                                                    placeholder="Email / Username"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                                <label
                                                    htmlFor="inputEmail"
                                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                                >
                                                    Username
                                                </label>
                                                {errors.email && (
                                                    <small className="pl-3 text-red-600">
                                                        {errors.email}
                                                    </small>
                                                )}
                                            </div>

                                            <div
                                                className="relative mb-4"
                                                data-twe-input-wrapper-init
                                            >
                                                <input
                                                    type="password"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="inputPassword"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="********"
                                                />
                                                <label
                                                    htmlFor="inputPassword"
                                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                                >
                                                    Password
                                                </label>
                                                {errors.password && (
                                                    <small className="pl-3 text-red-600">
                                                        {errors.password}
                                                    </small>
                                                )}
                                            </div>

                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <button
                                                    className="btn btn-info mb-3 inline-block w-full rounded-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                                    type="submit"
                                                    data-twe-ripple-init
                                                    data-twe-ripple-color="light"
                                                    // style={{
                                                    //     background:
                                                    //         "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                                    // }}
                                                >
                                                    Log in
                                                </button>

                                                <a href="#!">
                                                    Forgot password?
                                                </a>
                                            </div>

                                            {/* <div className="flex items-center justify-between pb-6">
                                                <p className="mb-0 me-2">
                                                    Don't have an account?
                                                </p>
                                                <button
                                                    type="button"
                                                    className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                                                    data-twe-ripple-init
                                                    data-twe-ripple-color="light"
                                                >
                                                    Register
                                                </button>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                                    style={{
                                        // background:
                                        //     "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                        backgroundImage: "url()",
                                    }}
                                >
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-xl font-semibold">
                                            Simple Managemen POS
                                        </h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Quia
                                            magnam sapiente sunt, alias minima
                                            laboriosam sed eaque obcaecati, fuga
                                            molestiae aspernatur, totam ipsa
                                            porro nisi at similique ullam! Ea
                                            doloribus, nisi veritatis maiores
                                            voluptates, et harum distinctio
                                            earum perspiciatis sint laboriosam
                                            inventore minima, commodi architecto
                                            necessitatibus soluta. Excepturi,
                                            corporis doloremque.
                                        </p>
                                        <span
                                            className="btn btn-default text-white italic mt-4"
                                            onClick={() => tryDemoAccount()}
                                        >
                                            Coba akun demo
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
