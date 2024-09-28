import React, { useEffect, useState } from "react";
import DefaultPos from "../../../Layouts/DefaultPos";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import ReactSelect from "react-select";
import { Inertia } from "@inertiajs/inertia";
import ModalItemDetail from "./ModalItemDetail";
import Swal from "sweetalert2";
import Datepicker from "react-tailwindcss-datepicker";
import DatePicker from "react-datepicker";

const Index = ({ transaction }) => {
    const { auth } = usePage().props;
    const { errors } = usePage().props;
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterUnit, setFilterUnit] = useState("");
    const [filterBrand, setFilterBrand] = useState("");
    const { session } = usePage().props;
    const { dataItems } = usePage().props;
    const { categories } = usePage().props;
    const { units } = usePage().props;
    const { brands } = usePage().props;
    // const { transaction } = usePage().props;
    const { transactionDetail } = usePage().props;
    const [dataItemDetails, setDataItemDetail] = useState(null);

    const [transactionNo, setTransactionNo] = useState(
        transaction ? transaction.transaction_no : ""
    );
    const [transactionDate, setTransactionDate] = useState(
        transaction ? transaction.transaction_date : ""
    );
    const [customerName, setCustomerName] = useState(
        transaction ? transaction.customer_name : ""
    );
    const [customerEmail, setCustomerEmail] = useState(
        transaction
            ? transaction.customer_email
                ? transaction.customer_email
                : ""
            : ""
    );
    const [customerPhone, setCustomerPhone] = useState(
        transaction
            ? transaction.customer_phone
                ? transaction.customer_phone
                : ""
            : ""
    );
    const total = transaction ? transaction.total : 0;
    const [totalPayment, setTotalPayment] = useState(
        transaction
            ? transaction.total_payment
                ? transaction.total_payment
                : ""
            : ""
    );
    const [changeAmount, setChangeAmount] = useState(
        transaction
            ? transaction.total_change
                ? transaction.total_change
                : 0
            : 0
    );

    useEffect(() => {
        if (transaction) {
            setTransactionNo(transaction.transaction_no);
            setTransactionDate(transaction.transaction_date);
            setCustomerName(transaction.customer_name);
            setCustomerEmail(
                transaction.customer_email ? transaction.customer_email : ""
            );
            setCustomerPhone(
                transaction.customer_phone ? transaction.customer_phone : ""
            );
        }
    }, [transaction]);

    // const [dataOrder, setDataOrder] = useState([]);
    const [errorPayment, setErrorPayment] = useState("");
    const [disabledBtnBayar, setDisabledBtnBayar] = useState(true);

    console.log("ini", dataItems, transaction, transactionDetail, session);
    console.log("ini valuenya", transactionNo, transactionDate, customerName);

    let filteredItems = dataItems;

    filteredItems = filteredItems.filter(
        (item) =>
            item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filterCategory) {
        filteredItems = filteredItems.filter(
            (item) =>
                item.category_id &&
                item.category_id
                    .toLowerCase()
                    .includes(filterCategory.value.toLowerCase())
        );
    }
    if (filterUnit) {
        filteredItems = filteredItems.filter(
            (item) =>
                item.unit_id &&
                item.unit_id
                    .toLowerCase()
                    .includes(filterUnit.value.toLowerCase())
        );
    }
    if (filterBrand) {
        filteredItems = filteredItems.filter(
            (item) =>
                item.brand_id &&
                item.brand_id
                    .toLowerCase()
                    .includes(filterBrand.value.toLowerCase())
        );
    }

    const clearFilter = () => {
        setFilterCategory("");
        setFilterUnit("");
        setFilterBrand("");
        setSearch("");
    };

    const renderItems = () => {
        return filteredItems
            ? filteredItems.map((item, i) => (
                  <div
                      className="card card-compact bg-white w-full shadow-xl mb-2"
                      key={i}
                  >
                      <figure>
                          <img
                              className="w-full h-44 object-cover"
                              src={
                                  item.has_images.length > 0
                                      ? "/assets/upload/items/image/" +
                                        item.has_images[0].image
                                      : "/assets/image/kosong/kosong.jpg"
                              }
                              alt="Shoes"
                          />
                      </figure>
                      <div className="card-body">
                          <h2
                              className="card-title text-gray-400"
                              title={item.name ? item.name : "Unnamed item"}
                          >
                              {item.name
                                  ? item.name.length > 24
                                      ? item.name.substring(0, 24) + "..."
                                      : item.name
                                  : "Unnamed item"}
                          </h2>
                          <small className="text-md text-gray-350 font-bold">
                              <i className="ri-archive-2-line text-md"></i>{" "}
                              &nbsp; Stock :{" "}
                              {item.total_stock ? item.total_stock : 0}
                          </small>
                          <div className="card-actions justify-between">
                              <button
                                  className="btn btn-info btn-sm w-full text-white"
                                  onClick={() => showItem(item.id)}
                              >
                                  Buy Now
                              </button>
                          </div>
                      </div>
                  </div>
              ))
            : "";
    };

    const renderCustomerOrderInfo = () => {
        return (
            <div>
                <input
                    type="text"
                    value={transactionNo}
                    onChange={(e) => setTransactionNo(e.target.value)}
                    className="mt-1 mb-2 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-sm text-gray-400 tracking-wide shadow-sm placeholder-slate-400
focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600 font-bold
"
                    placeholder="Transaction Code"
                    readOnly
                />
                <DatePicker
                    className="mt-2 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full"
                    selected={transactionDate}
                    onChange={(date) => setTransactionDate(date)}
                    placeholderText="Transaction Date"
                />
                {errors.transaction_date && (
                    <small className="text-red-600">
                        {errors.transaction_date}
                    </small>
                )}
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                    placeholder="Customer Name"
                />
                {errors.customer_name && (
                    <small className="text-red-600">
                        {errors.customer_name}
                    </small>
                )}
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                        <input
                            type="text"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                            placeholder="Customer Email"
                        />
                        {errors.customer_email && (
                            <small className="text-red-600">
                                {errors.customer_email}
                            </small>
                        )}
                    </div>
                    <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                        placeholder="Customer Phone"
                    />
                </div>
            </div>
        );
    };

    const saveTransaction = () => {
        let date = null;
        if (transactionDate) {
            const options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            };
            const date1 = transactionDate.toLocaleDateString("ID-id", options);
            let split_date = date1.split("/");
            date =
                split_date[2] +
                "-" +
                (split_date[1].length == 1
                    ? "0" + split_date[1]
                    : split_date[1]) +
                "-" +
                (split_date[0].length == 1
                    ? "0" + split_date[0]
                    : split_date[0]);
        }

        Inertia.post("/POS/orders", {
            transaction_date: date,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
        });
    };

    const showItem = (item_id) => {
        console.log("show item");

        if (transaction) {
            fetch(`/POS/orders/get-item-detail/${item_id}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);

                    setDataItemDetail(data);

                    setTimeout(() => {
                        document
                            .getElementById("modalDataItemDetail")
                            .showModal();
                    }, 500);
                });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Buat transaksi sebelum menambah barang.",
                icon: "error",
            });
        }
    };

    const calculateTotalPayment = (value) => {
        setTotalPayment(value);

        if (value >= total) {
            setErrorPayment("");
            setDisabledBtnBayar(false);
        } else {
            setErrorPayment("Nominal bayar kurang!");
            setDisabledBtnBayar(true);
        }

        let change = parseInt(value) - parseInt(total);
        setChangeAmount(change);
    };

    const deleteItemOrder = (item_id) => {
        Inertia.post("/POS/orders/delete-order-item", {
            transaction_id: transaction.id,
            transaction_detail_id: item_id,
        });
    };

    const payOrder = () => {
        Swal.fire({
            title: "Konfirmasi!",
            text: "Apakah anda yakin ingin bayar transaksi ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, bayar",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post("/POS/orders/pay-order", {
                    transaction_id: transaction.id,
                    total_payment: totalPayment,
                    total_change: changeAmount,
                });
            }
        });
    };

    const saveToDraft = () => {
        Swal.fire({
            title: "Konfirmasi!",
            text: "Apakah anda yakin ingin simpan ke draft?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Simpan ke Draft",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post("/POS/orders/save-to-draft", {
                    transaction_id: transaction.id,
                });
            }
        });
    };

    return (
        <>
            <Head>
                <title>Orders | Point Of Sales</title>
            </Head>
            <DefaultPos>
                <div className="p-1">
                    <div className="mb-4">
                        <div className="collapse bg-white rounded-md border overflow-visible">
                            <input type="checkbox" />
                            <div className="collapse-title text-md text-gray-500 font-medium">
                                Filter Items
                            </div>
                            <div className="collapse-content">
                                <div className="grid grid-cols-[22%_22%_22%_22%_12%] gap-2">
                                    <ReactSelect
                                        value={filterCategory}
                                        onChange={(item) =>
                                            setFilterCategory(item)
                                        }
                                        className="mt-1 text-gray-600 text-sm"
                                        options={categories}
                                        placeholder="Select Category"
                                    ></ReactSelect>
                                    <ReactSelect
                                        value={filterUnit}
                                        onChange={(item) => setFilterUnit(item)}
                                        className="mt-1 text-gray-600 text-sm"
                                        options={units}
                                        placeholder="Select Unit"
                                    ></ReactSelect>
                                    <ReactSelect
                                        value={filterBrand}
                                        onChange={(item) =>
                                            setFilterBrand(item)
                                        }
                                        className="mt-1 text-gray-600 text-sm"
                                        options={brands}
                                        placeholder="Select Brand"
                                    ></ReactSelect>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search"
                                        className="input input-bordered input-sm text-gray-600 bg-white w-full max-w-xs"
                                    />
                                    <button
                                        className="btn btn-info btn-sm text-white w-3/4"
                                        onClick={() => clearFilter()}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[50%_50%] gap-2">
                        <div className="border-2 px-2 py-4 rounded">
                            <div className="w-full h-dvh overflow-scroll">
                                <div className="grid grid-cols-3 gap-3 relative px-4">
                                    {renderItems()}
                                    <span className="clear-both"></span>
                                </div>
                            </div>
                        </div>
                        <div className="border-2 p-4 rounded">
                            <div className="flex justify-between">
                                <h5 className="text-gray-500 text-md font-bold mb-3">
                                    Order Customer
                                </h5>
                                <Link
                                    href={"/POS/transactions-draft"}
                                    className="btn btn-primary btn-sm text-white"
                                >
                                    <i className="ri-draft-line"></i>
                                    Select from draft
                                </Link>
                            </div>

                            <form className="p-2">
                                {renderCustomerOrderInfo()}

                                <div className="mt-4 h-4/5">
                                    <h5 className="text-gray-600 text-md">
                                        List Order
                                    </h5>
                                </div>
                                <div className="border mt-4 p-2 h-96 overflow-y-scroll">
                                    <div className="grid grid-cols-1">
                                        {transactionDetail ? (
                                            transactionDetail.map((item, i) => (
                                                <div
                                                    className="px-2 border-2 border-transparent border-b-gray-200"
                                                    key={i}
                                                >
                                                    <div className="grid grid-cols-[35%_25%_30%_10%] text-gray-400 pb-2">
                                                        <div>
                                                            <p className="text-gray-400 font-bold">
                                                                {item.item_name}
                                                            </p>
                                                            <small className="text-sm italic">
                                                                {
                                                                    item.variation_name
                                                                }
                                                            </small>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <p className="text-gray-400">
                                                                x{item.qty}
                                                            </p>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <p>
                                                                Rp{" "}
                                                                {item.total.toLocaleString(
                                                                    "ID-id"
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <span
                                                                className="btn btn-error btn-sm text-white p-2 rounded"
                                                                onClick={() =>
                                                                    deleteItemOrder(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                x
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h4 className="text-gray-400 text-center">
                                                No order item.
                                            </h4>
                                        )}
                                    </div>
                                </div>

                                {transaction && (
                                    <div className="mt-4">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="text-end px-2">
                                                        Total Order
                                                    </td>
                                                    <td className="text-center w-4">
                                                        :
                                                    </td>
                                                    <td className="text-gray-400 text-md text-end font-bold w-2/4">
                                                        Rp{" "}
                                                        {transaction
                                                            ? transaction.total.toLocaleString(
                                                                  "ID-id"
                                                              )
                                                            : 0}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-end px-2">
                                                        Nominal Payment
                                                    </td>
                                                    <td className="text-center w-2">
                                                        :
                                                    </td>
                                                    <td>
                                                        <div className="join w-full mt-1">
                                                            <span className="btn btn-sm px-1 bg-slate-100 hover:bg-slate-200 border-slate-300 hover:border-slate-300 join-item rounded-md">
                                                                Rp
                                                            </span>
                                                            <input
                                                                type="number"
                                                                value={
                                                                    totalPayment
                                                                }
                                                                onChange={(e) =>
                                                                    calculateTotalPayment(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="join-item input-sm block w-full px-1 py-1 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-end
"
                                                                placeholder="Nominal Bayar"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-end px-2">
                                                        Change Amount
                                                    </td>
                                                    <td className="text-center w-2">
                                                        :
                                                    </td>
                                                    <td className="text-gray-400 text-md text-end font-bold">
                                                        Rp {changeAmount}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        colSpan={3}
                                                        className="text-end text-red-500"
                                                    >
                                                        {errorPayment}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </form>

                            {transaction ? (
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="btn bg-gray-300 border-gray-400 hover:bg-gray-400 hover:border-gray-400 text-gray-500"
                                        onClick={() => saveToDraft()}
                                    >
                                        <i className="ri-draft-line"></i>
                                        Draft
                                    </button>
                                    {disabledBtnBayar ? (
                                        <button
                                            className="btn btn-success text-white"
                                            disabled
                                        >
                                            <i className="ri-bank-card-line"></i>
                                            Bayar
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success text-white"
                                            onClick={() => payOrder()}
                                        >
                                            <i className="ri-bank-card-line"></i>
                                            Bayar
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="btn btn-success text-white"
                                        onClick={() => saveTransaction()}
                                    >
                                        <i className="ri-save-line"></i>
                                        Simpan Transaksi
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ModalItemDetail
                    data={dataItemDetails}
                    transaction={transaction}
                ></ModalItemDetail>
            </DefaultPos>
        </>
    );
};

export default Index;
