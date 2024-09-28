import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";

const ModalData = () => {
    const { errors } = usePage().props;
    const { session } = usePage().props;
    const [valName, setValName] = useState("");
    const [valDesc, setValDesc] = useState("");

    const saveData = () => {
        document.getElementById("overlay").classList.add("block");

        Inertia.post("manage-item-units", {
            name: valName,
            description: valDesc,
        });

        setTimeout(() => {
            setValName("");
            setValDesc("");
            document.getElementById("overlay").classList.remove("block");
        }, 1000);
    };

    return (
        <dialog id="modal-data" className="modal">
            <div className="modal-box bg-white">
                <h3
                    className="font-bold text-lg text-gray-600"
                    id="modal-title"
                ></h3>
                <div className="py-4">
                    <div className="mb-2">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700">
                                Name
                            </span>
                            <input
                                type="text"
                                value={valName}
                                onChange={(e) => setValName(e.target.value)}
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
                                onChange={(e) => setValDesc(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                            ></textarea>
                        </label>
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-ghost">Close</button>
                        <button
                            className="btn btn-success text-white"
                            onClick={() => saveData()}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ModalData;
