import React from "react";
import { Head } from "@inertiajs/inertia-react";
import DefaultAdmin from "../../Layouts/DefaultAdmin";

const Show = ({ transactions, transactionDetails }) => {
    const transactionStatus = () => {
        if (transactions.status == "cart") {
            return (
                <span className="text-white bg-yellow-400 rounded-xl py-1 px-2">
                    Cart
                </span>
            );
        } else if (transactions.status == "payment") {
            return (
                <span className="text-white bg-blue-400 rounded-xl py-1 px-2">
                    Payment
                </span>
            );
        } else if (transactions.status == "done") {
            return (
                <span className="text-white bg-green-400 rounded-xl py-1 px-2">
                    Done
                </span>
            );
        }
    };

    const printInvoice = () => {
        window.open(`/POS/transactions/${transactions.transaction_no}/invoice`);
    };

    return (
        <>
            <Head>
                <title>Manage Transaction Detail | Point Of Sales</title>
            </Head>
            <DefaultAdmin>
                <div className="card py-4 px-4 border-2 border-gray-200 rounded-md">
                    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
                        <div>
                            <div className="mb-4">
                                <h5 className="text-gray-500 text-md font-bold mb-3">
                                    Customer
                                </h5>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-1/4">Nama</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>
                                                {transactions.customer_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>
                                                {transactions.customer_email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>
                                                {transactions.customer_phone}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mb-4">
                                <h5 className="text-gray-500 text-md font-bold mb-3">
                                    Transactions
                                </h5>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-1/4">
                                                Transaction No
                                            </td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td className="text-md font-bold">
                                                {transactions.transaction_no}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Transaction Date</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>
                                                {transactions.trans_date +
                                                    " " +
                                                    transactions.trans_time}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Payment Date</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>
                                                {transactions.trans_pay_date +
                                                    " " +
                                                    transactions.trans_pay_time}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Qty</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>{transactions.total_qty}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Amount</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>
                                                {transactions.total_amount
                                                    ? "Rp " +
                                                      transactions.total_amount.toLocaleString(
                                                          "ID-id"
                                                      )
                                                    : "Rp 0"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Discount</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>
                                                {transactions.total_discount
                                                    ? "Rp " +
                                                      transactions.total_discount.toLocaleString(
                                                          "ID-id"
                                                      )
                                                    : "Rp 0"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td className="font-bold text-md">
                                                {transactions.total
                                                    ? "Rp " +
                                                      transactions.total.toLocaleString(
                                                          "ID-id"
                                                      )
                                                    : "Rp 0"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>{transactionStatus()}</td>
                                        </tr>
                                        <tr>
                                            <td>Cashier</td>
                                            <td className="w-4 text-center">
                                                :
                                            </td>
                                            <td>{transactions.created_name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h5 className="text-gray-500 text-md font-bold mb-3">
                                    Order List
                                </h5>
                                <button
                                    className="btn btn-info btn-sm text-white"
                                    onClick={() => printInvoice()}
                                >
                                    <i className="ri-upload-2-line"></i> Print
                                    Invoice
                                </button>
                            </div>
                            <div className="p-2 border-2 border-gray-200 rounded-t-md">
                                <table className="w-full">
                                    <tbody className="">
                                        {transactionDetails ? (
                                            transactionDetails.map(
                                                (item, i) => (
                                                    <tr key={i}>
                                                        <td className="w-1/2">
                                                            {item.item_name}
                                                        </td>
                                                        <td className="w-10 text-center">
                                                            x {item.qty}
                                                        </td>
                                                        <td className="text-md text-end">
                                                            Rp{" "}
                                                            {item.total.toLocaleString(
                                                                "ID-id"
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <small className="text-gray-400 text-center">
                                                No Order List Found.
                                            </small>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="border-2 border-gray-200 rounded-b-md">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-1/2"></td>
                                            <td className="w-10 text-center">
                                                x {transactions.total_qty}
                                            </td>
                                            <td className="text-lg text-end font-bold p-2">
                                                Rp{" "}
                                                {transactions.total.toLocaleString(
                                                    "ID-id"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultAdmin>
        </>
    );
};

export default Show;
