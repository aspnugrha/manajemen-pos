import React, { useState } from "react";
import DefaultAdmin from "../../../Layouts/DefaultAdmin";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const FormData = () => {
    const { items } = usePage().props;
    const { details } = usePage().props;
    const { images } = usePage().props;
    const [dataVariation, setDataVariation] = useState(details ? details : []);

    console.log("data variation ", dataVariation);

    const saveStockPrice = () => {
        Inertia.put(`/A/stock-and-price/${items.id}`, {
            data_variation: dataVariation,
        });
    };

    const setVariationValue = (value, index, name) => {
        const objData = dataVariation[index];
        const newData = () => {
            let newId = objData.id;
            let newName = objData.name;
            let newDesc = objData.description;
            let newItemCode = objData.item_code;
            let newWeight = objData.weight;
            let newStock = objData.stock;
            let newHPP = objData.hpp;
            let newAmount = objData.amount;
            let newDiscount = objData.discount;
            let newTotal = objData.total;

            if (name == "id") {
                newId = value;
            } else if (name == "stock") {
                newStock = value;
            } else if (name == "amount") {
                newAmount = value;
            } else if (name == "discount") {
                newDiscount = value;
            }

            let amount2 = newAmount ? parseFloat(newAmount) : 0;
            let discount2 = newDiscount ? parseFloat(newDiscount) : 0;
            newTotal = amount2 - discount2;

            let newDataValue = {
                id: newId ? newId : null,
                name: newName,
                description: newDesc,
                item_code: newItemCode,
                weight: newWeight,
                hpp: newHPP,
                stock: newStock ? newStock : null,
                amount: newAmount ? newAmount : null,
                discount: newDiscount ? newDiscount : null,
                total: newTotal ? newTotal : null,
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

    const renderVariationData = () => {
        return dataVariation.length > 0 ? (
            dataVariation.map((item, i) => (
                <div className="card border p-4 rounded-md mb-2" key={i}>
                    <h4 className="text-gray-500 text-md">
                        {item.name ? item.name : ""}
                    </h4>
                    <p className="text-gray-500">
                        {item.description ? item.description : ""}
                    </p>

                    <div className="mt-3">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="w-24">Item Code</td>
                                    <td className="w-2 text-denter">:</td>
                                    <td>
                                        {item.item_code ? item.item_code : ""}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td className="text-center">:</td>
                                    <td>
                                        {item.weight ? item.weight : "0"} gram
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">HPP</td>
                                    <td className="text-center">:</td>
                                    <td className="font-bold">
                                        {" "}
                                        {item.hpp
                                            ? "Rp " +
                                              item.hpp.toLocaleString("ID-id")
                                            : "Rp 0"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <input
                        type="hidden"
                        value={item.id}
                        onChange={(e) =>
                            setVariationValue(e.target.value, i, "id")
                        }
                        className="bg-white hover:bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-200"
                        placeholder="ID"
                    />

                    <div className="grid grid-cols-[16%_28%_28%_28%] gap-2 mt-2 pb-2">
                        <input
                            type="number"
                            value={item.stock ? item.stock : ""}
                            onChange={(e) =>
                                setVariationValue(e.target.value, i, "stock")
                            }
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                            placeholder="Stock"
                        />
                        <div className="join w-full mt-1">
                            <span className="btn bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-slate-300 join-item rounded-md">
                                Rp
                            </span>
                            <input
                                type="number"
                                value={item.amount ? item.amount : ""}
                                onChange={(e) =>
                                    setVariationValue(
                                        e.target.value,
                                        i,
                                        "amount"
                                    )
                                }
                                className="join-item block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                placeholder="Amount"
                            />
                        </div>
                        <div className="join w-full mt-1">
                            <span className="btn bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-slate-300 join-item rounded-md">
                                Rp
                            </span>
                            <input
                                type="number"
                                value={item.discount ? item.discount : ""}
                                onChange={(e) =>
                                    setVariationValue(
                                        e.target.value,
                                        i,
                                        "discount"
                                    )
                                }
                                className="join-item block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                placeholder="Discount"
                            />
                        </div>
                        <div className="w-full mt-1">
                            <span className="inline-block align-text-top text-gray-500 font-bold text-lg">
                                Rp{" "}
                                {item.total
                                    ? item.total.toLocaleString("ID-id")
                                    : "0"}
                            </span>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <h4 className="text-gray-500 text-md">No Variation Found</h4>
        );
    };

    return (
        <>
            <Head>
                <title>Set Stock & Price | Manajemen POS</title>
            </Head>
            <DefaultAdmin>
                <div className="w-100">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium text-lg text-gray-600 mb-3">
                                Form Set Stock & Price
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-[60%_40%]">
                                <div>
                                    <h3 className="text-gray-500 text-md font-bold">
                                        Data Item
                                    </h3>

                                    <table className="w-full mb-4 text-gray-500 mt-1">
                                        <tbody>
                                            <tr>
                                                <td className="w-1/4">
                                                    Category
                                                </td>
                                                <td className="text-start w-2">
                                                    :
                                                </td>
                                                <td>
                                                    {items
                                                        ? items.category_name
                                                        : ""}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/4">Unit</td>
                                                <td className="text-start w-2">
                                                    :
                                                </td>
                                                <td>
                                                    {items
                                                        ? items.unit_name
                                                        : ""}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-1/4">Brand</td>
                                                <td className="text-start w-2">
                                                    :
                                                </td>
                                                <td>
                                                    {items
                                                        ? items.brand_name
                                                        : ""}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td className="text-start">
                                                    :
                                                </td>
                                                <td>
                                                    {items ? items.name : ""}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td className="text-start">
                                                    :
                                                </td>
                                                <td>
                                                    {items
                                                        ? items.description
                                                        : ""}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-md font-bold">
                                        Image
                                    </h3>

                                    <div className="mt-1 mb-4 w-full">
                                        {images.length > 0 ? (
                                            <div className="grid grid-cols-3 gap-2">
                                                {images.map((item, i) => (
                                                    <img
                                                        key={i}
                                                        className="w-full h-full object-cover"
                                                        src={`/assets/upload/items/image/${item.image}`}
                                                        alt="Shoes"
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No Image Found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-gray-500 text-md font-bold mt-4">
                                Data Variation
                            </h3>
                            <div className="mt-4">{renderVariationData()}</div>

                            <div className="pt-4 mt-2 flex justify-end">
                                {details.length > 0 ? (
                                    <button
                                        className="btn btn-primary text-white"
                                        onClick={() => saveStockPrice()}
                                    >
                                        <i className="ri-save-line"></i>
                                        Simpan Data
                                    </button>
                                ) : (
                                    <button className="btn" disabled>
                                        <i className="ri-save-line"></i>
                                        Simpan Data
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultAdmin>
        </>
    );
};

export default FormData;
