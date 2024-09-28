import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Swal from "sweetalert2";

const FormDataDetail = ({ dataVariation, setDataVariation, kondisi }) => {
    const addVariation = () => {
        let newVariationData = {
            id: null,
            name: null,
            description: null,
            item_code: null,
            weight: null,
            hpp: null,
        };
        let newVariation = [...dataVariation, newVariationData];
        setDataVariation(newVariation);
    };

    console.log("data variation ", dataVariation, kondisi);

    const deleteVariation = (index) => {
        console.log("index", index, dataVariation.length);

        let newVariation = dataVariation.filter((item, i) => {
            return i != index;
        });

        setDataVariation(newVariation);
    };

    const deleteVariationDetail = (item_detail_id, index) => {
        console.log("delete variation detail", item_detail_id, index);

        Swal.fire({
            title: "Peringatan!",
            text: "Apakah anda yakin ingin menghapus data variation ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/A/manage-item-details/${item_detail_id}`);

                let newVariation = dataVariation.filter((item, i) => {
                    return i != index;
                });

                setDataVariation(newVariation);
            }
        });
    };

    const setVariationValue = (value, index, name) => {
        const objData = dataVariation[index];
        const newData = () => {
            let newId = objData.id;
            let newName = objData.name;
            let newDescription = objData.description;
            let newItem_code = objData.item_code;
            let newWeight = objData.weight;
            let newHpp = objData.hpp;

            if (name == "id") {
                newId = value;
            } else if (name == "name") {
                newName = value;
            } else if (name == "description") {
                newDescription = value;
            } else if (name == "item_code") {
                newItem_code = value;
            } else if (name == "weight") {
                newWeight = value;
            } else if (name == "hpp") {
                newHpp = value;
            }

            let newDataValue = {
                id: newId ? newId : null,
                name: newName ? newName : null,
                description: newDescription ? newDescription : null,
                item_code: newItem_code ? newItem_code : null,
                weight: newWeight ? newWeight : null,
                hpp: newHpp ? newHpp : null,
            };

            return newDataValue;
        };

        const newVariation = dataVariation.map((item, i) => {
            if (i == index) {
                return newData();
            } else {
                return item;
            }
        });
        setDataVariation(newVariation);
    };

    const renderVariation = () => {
        return (
            <>
                {dataVariation.length &&
                    dataVariation.map((item, i) => (
                        <div key={i}>
                            <div className="mt-4 grid grid-cols-[80%_20%] lg:grid-cols-[93%_7%]">
                                <div>
                                    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">
                                        <div className="pr-0 lg:pr-4">
                                            <input
                                                type="hidden"
                                                className="bg-white text-gray-800 border-2"
                                                value={item.id ? item.id : ""}
                                                onChange={(e) =>
                                                    setVariationValue(
                                                        e.target.value,
                                                        i,
                                                        "id"
                                                    )
                                                }
                                            />
                                            <input
                                                type="text"
                                                value={
                                                    item.name ? item.name : ""
                                                }
                                                onChange={(e) =>
                                                    setVariationValue(
                                                        e.target.value,
                                                        i,
                                                        "name"
                                                    )
                                                }
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                                placeholder="Name"
                                            />
                                            <textarea
                                                rows={7}
                                                value={
                                                    item.description
                                                        ? item.description
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setVariationValue(
                                                        e.target.value,
                                                        i,
                                                        "description"
                                                    )
                                                }
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                        invalid:border-pink-500 invalid:text-pink-600
                                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        "
                                                placeholder="Description"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={
                                                    item.item_code
                                                        ? item.item_code
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setVariationValue(
                                                        e.target.value,
                                                        i,
                                                        "item_code"
                                                    )
                                                }
                                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                                placeholder="Item Code"
                                            />
                                            <div className="join w-full mt-1">
                                                <input
                                                    type="number"
                                                    value={
                                                        item.weight
                                                            ? item.weight
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        setVariationValue(
                                                            e.target.value,
                                                            i,
                                                            "weight"
                                                        )
                                                    }
                                                    className="join-item block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                                    placeholder="Weight"
                                                />
                                                <span className="btn bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-slate-300 join-item rounded-md">
                                                    Gram
                                                </span>
                                            </div>
                                            <div className="join w-full mt-1">
                                                <span className="btn bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-slate-300 join-item rounded-md">
                                                    Rp
                                                </span>
                                                <input
                                                    type="number"
                                                    value={
                                                        item.hpp ? item.hpp : ""
                                                    }
                                                    onChange={(e) =>
                                                        setVariationValue(
                                                            e.target.value,
                                                            i,
                                                            "hpp"
                                                        )
                                                    }
                                                    className="join-item block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                                    placeholder="HPP"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center align-bottom mt-1">
                                    <span
                                        className="btn btn-error btn-sm text-white"
                                        onClick={() => {
                                            if (kondisi == "create") {
                                                deleteVariation(i);
                                            } else {
                                                if (item.id) {
                                                    deleteVariationDetail(
                                                        item.id,
                                                        i
                                                    );
                                                } else {
                                                    deleteVariation(i);
                                                }
                                            }
                                        }}
                                    >
                                        x
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </>
        );
    };

    return (
        <div className="pt-4">
            <div className="flex justify-start">
                <span
                    className="btn btn-primary text-white"
                    onClick={() => addVariation()}
                >
                    Add Variation
                </span>
            </div>

            <div>{dataVariation.length ? renderVariation() : ""}</div>
        </div>
    );
};

export default FormDataDetail;
