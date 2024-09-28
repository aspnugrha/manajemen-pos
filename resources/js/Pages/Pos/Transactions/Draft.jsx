import React, { useState } from "react";
import DefaultPos from "../../../Layouts/DefaultPos";
import DataTableReact, { defaultThemes } from "react-data-table-component";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";

const Draft = () => {
    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const dataFilterStatus = [
        {
            value: "cart",
            label: "Cart",
        },
        {
            value: "payment",
            label: "Payment",
        },
    ];
    const { data } = usePage().props;

    const columns = [
        {
            name: "No",
            selector: (row, i) => i + 1,
            // sortable: true,
            width: "50px",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Transaction No",
            selector: (row) => row.transaction_no,
        },
        {
            name: "transaction Date",
            center: true,
            selector: (row) => row.trans_date,
        },
        {
            name: "Customer Name",
            selector: (row) => row.customer_name,
        },
        {
            name: "Customer Email",
            selector: (row) => row.customer_email,
        },
        {
            name: "Qty",
            center: true,
            width: "65px",
            selector: (row) => row.total_qty,
        },
        {
            name: "Cashier",
            center: true,
            selector: (row) => row.created_name,
        },
        {
            name: "Total",
            right: true,
            cell: (row) => {
                return "Rp " + row.total.toLocaleString("ID-id");
            },
        },
        {
            // button: true,
            left: true,
            width: "100px",
            cell: (row) => (
                <div className="btn-group flex">
                    <Link
                        href={`/POS/transactions-draft/back-to-orders/${row.id}`}
                        className="btn btn-info btn-sm text-white"
                        title="Show Transaction"
                    >
                        Kembali Transaksi
                    </Link>
                </div>
            ),
        },
    ];

    const customStyles = {
        header: {
            style: {
                minHeight: "56px",
            },
        },
        headRow: {
            style: {
                borderTopStyle: "solid",
                borderTopWidth: "1px",
                borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
        cells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
    };

    const clearFilter = () => {
        setFilterDate("");
        setSearch("");
    };

    let filteredItems = data;

    if (search) {
        filteredItems = filteredItems.filter(
            (item) =>
                item.transaction_no &&
                item.transaction_no.toLowerCase().includes(search.toLowerCase())
        );
    }
    if (filterDate) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        const date1 = filterDate.toLocaleDateString("ID-id", options);
        let split_date = date1.split("/");
        const date =
            split_date[2] +
            "-" +
            (split_date[1].length == 1 ? "0" + split_date[1] : split_date[1]) +
            "-" +
            (split_date[0].length == 1 ? "0" + split_date[0] : split_date[0]);

        // console.log(filterDate, date);

        filteredItems = filteredItems.filter(
            (item) =>
                item.transaction_date &&
                item.transaction_date.toLowerCase().includes(date.toLowerCase())
        );
    }

    return (
        <>
            <Head>
                <title>Transactions Draft | Point Of Sales</title>
            </Head>
            <DefaultPos>
                <div className="w-100">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-2 items-start">
                            <div className="font-medium text-lg text-gray-600 mb-3">
                                Transactions Draft
                            </div>
                        </div>
                        <div className="mt-2 mb-4 grid grid-cols-[50%_20%_20%_10%] gap-2">
                            <div></div>
                            <div>
                                <DatePicker
                                    className="mt-2 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full"
                                    selected={filterDate}
                                    onChange={(date) => setFilterDate(date)}
                                    placeholderText="Transaction Date"
                                />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Transaction No"
                                className="input input-bordered input-sm text-gray-600 bg-white w-full max-w-xs"
                            />
                            <button
                                className="btn btn-info btn-sm text-white w-3/4"
                                onClick={() => clearFilter()}
                            >
                                Clear
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <DataTableReact
                                // title="Data Satuan"
                                columns={columns}
                                data={filteredItems}
                                pagination
                                customStyles={customStyles}
                                // selectableRows
                                // selectableRowsComponent={BootyCheckbox}
                                dense
                            ></DataTableReact>
                        </div>
                    </div>
                </div>
            </DefaultPos>
        </>
    );
};

export default Draft;
