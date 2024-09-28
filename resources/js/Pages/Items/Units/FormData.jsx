import React, { useEffect, useState } from "react";
import DefaultAdmin from "../../../Layouts/DefaultAdmin";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const FormData = ({ data }) => {
    const { errors } = usePage().props;
    const { session } = usePage().props;
    const [valName, setValName] = useState(data ? data.name : "");
    const [valDesc, setValDesc] = useState(data ? data.description : "");

    const saveData = (e) => {
        e.preventDefault();

        if (data) {
            Inertia.put(`/A/manage-item-units/${data.id}`, {
                name: valName,
                description: valDesc,
            });
        } else {
            Inertia.post("/A/manage-item-units", {
                name: valName,
                description: valDesc,
            });
        }
    };

    return (
        <>
            <Head>
                <title>Item Unit Edit | Manajemen POS</title>
            </Head>
            <DefaultAdmin>
                <div className="w-100">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium text-lg text-gray-600 mb-3">
                                Form Item Units
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <form onSubmit={saveData}>
                                <div className="mb-2">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Name
                                        </span>
                                        <input
                                            type="text"
                                            value={valName}
                                            onChange={(e) =>
                                                setValName(e.target.value)
                                            }
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                        />
                                    </label>
                                    {errors.name && (
                                        <small className="text-red-600">
                                            {errors.name}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-slate-700">
                                            Description
                                        </span>
                                        <textarea
                                            value={valDesc}
                                            onChange={(e) =>
                                                setValDesc(e.target.value)
                                            }
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                        ></textarea>
                                    </label>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button className="btn btn-primary text-white">
                                        <i className="ri-save-line"></i>
                                        {data ? "Update" : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DefaultAdmin>
        </>
    );
};

export default FormData;
