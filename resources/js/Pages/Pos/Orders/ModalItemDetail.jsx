import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ModalItemDetail = ({ data, transaction }) => {
    const dataItem = data ? data.data : "";
    const dataItemDetail = data ? data.data_detail : "";
    const dataItemImage = data ? data.data_image : "";

    const transaction_id = transaction ? transaction.id : "";
    const [selectedVariation, setSelectedVariation] = useState("");
    const [qtyVariation, setQtyVariation] = useState(1);
    const [stockVariation, setStockVariation] = useState(0);
    const [errorAddOrderItem, setErrorAddOrderItem] = useState("");

    const setSelectedVariationStock = (variation_id, stock) => {
        setSelectedVariation(variation_id);
        setStockVariation(stock);
    };

    const addOrderItem = () => {
        if (selectedVariation) {
            if (stockVariation >= qtyVariation) {
                setErrorAddOrderItem("");

                Inertia.post("/POS/orders/add-order-item", {
                    transaction_id: transaction_id,
                    variation_id: selectedVariation,
                    qty: qtyVariation,
                });
            } else {
                let message = "Error";
                if (stockVariation <= 0) {
                    message = "Stock habis!";
                } else {
                    message =
                        "Qty anda terlalu banyak, stock " +
                        stockVariation +
                        " item";
                }
                setErrorAddOrderItem(message);
            }
        } else {
            setErrorAddOrderItem("Piih Variasi terlebih dauhulu.");
        }
    };

    const renderItemDetail = () => {
        if (data) {
            return (
                <>
                    <table className="w-full mb-4 text-gray-400">
                        <tbody>
                            <tr>
                                <td className="w-1/4">Category</td>
                                <td className="text-start w-2">:</td>
                                <td>
                                    {dataItem ? dataItem.category_name : ""}
                                </td>
                            </tr>
                            <tr>
                                <td className="w-1/4">Unit</td>
                                <td className="text-start w-2">:</td>
                                <td>{dataItem ? dataItem.unit_name : ""}</td>
                            </tr>
                            <tr>
                                <td className="w-1/4">Brand</td>
                                <td className="text-start w-2">:</td>
                                <td>{dataItem ? dataItem.brand_name : ""}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td className="text-start">:</td>
                                <td>{dataItem ? dataItem.name : ""}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td className="text-start">:</td>
                                <td>{dataItem ? dataItem.description : ""}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5 className="text-gray-500 text-md font-bold">Images</h5>
                    <div className="mt-3 mb-4 w-full">
                        {dataItemImage.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2">
                                {dataItemImage.map((item, i) => (
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

                    <h5 className="text-gray-500 text-md font-bold">
                        Variation
                    </h5>
                    <div className="mt-3 w-full">
                        {dataItemDetail.length > 0 ? (
                            dataItemDetail.map((item, i) => (
                                <div
                                    className="form-control py-1 px-4 border-2 rounded-md div-label-variation-items"
                                    key={i}
                                >
                                    <label className="label cursor-pointer">
                                        <div className="label-text">
                                            <h3 className="text-gray-400 text-md font-bold">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-400 mt-4">
                                                {item.description
                                                    ? item.description
                                                    : ""}
                                            </p>
                                            <div className="flex justify-between mt-3">
                                                <span className="w-full text-gray-500">
                                                    Stock :{" "}
                                                    {item.stock
                                                        ? item.stock
                                                        : ""}
                                                </span>
                                                <span className="w-full text-gray-500 text-lg text-end font-bold">
                                                    {item.discount && (
                                                        <small className="text-red-500">
                                                            <s>
                                                                {item.discount &&
                                                                    item.amount.toLocaleString(
                                                                        "ID-id"
                                                                    )}
                                                            </s>
                                                            &nbsp;
                                                        </small>
                                                    )}
                                                    Rp
                                                    {item.amount ? (
                                                        <i>
                                                            {item.discount
                                                                ? (
                                                                      parseInt(
                                                                          item.amount
                                                                      ) -
                                                                      parseInt(
                                                                          item.discount
                                                                      )
                                                                  ).toLocaleString(
                                                                      "ID-id"
                                                                  )
                                                                : item.amount.toLocaleString(
                                                                      "ID-id"
                                                                  )}
                                                        </i>
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="radio-10"
                                            value={item.id}
                                            onChange={(e) =>
                                                setSelectedVariationStock(
                                                    item.id,
                                                    item.stock
                                                )
                                            }
                                            className="radio checked:bg-gray-500 radio-variation-items hidden"
                                            // defaultChecked
                                        />
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No Variation Found.</p>
                        )}
                    </div>
                </>
            );
        } else {
            return "";
        }
    };

    return (
        <>
            <dialog id="modalDataItemDetail" className="modal">
                <div className="modal-box modal-lg bg-white h-full overflow-y-hidden">
                    <h3 className="font-bold text-lg text-gray-500">
                        Item Detail
                    </h3>
                    <div className="pt-4 pb-2 h-4/5 relative overflow-y-scroll">
                        {renderItemDetail()}
                    </div>
                    {errorAddOrderItem && (
                        <small className="text-red-600 text-sm">
                            {errorAddOrderItem}
                        </small>
                    )}
                    <div className="modal-action grid grid-cols-[30%_70%] pb-4 mt-1">
                        <form method="dialog">
                            <button className="btn bg-gray-100 border-gray-300 hover:bg-gray-200 hover:border-gray-300 text-gray-500">
                                Close
                            </button>
                        </form>
                        {dataItemDetail && dataItemDetail.length > 0 ? (
                            <div className="flex justify-end">
                                <div>
                                    <input
                                        type="number"
                                        value={qtyVariation}
                                        onChange={(e) =>
                                            setQtyVariation(e.target.value)
                                        }
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                    />
                                </div>
                                &nbsp;
                                <form method="dialog">
                                    <button
                                        className="btn btn-primary text-white"
                                        onClick={() => addOrderItem()}
                                    >
                                        Add
                                    </button>
                                </form>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ModalItemDetail;
