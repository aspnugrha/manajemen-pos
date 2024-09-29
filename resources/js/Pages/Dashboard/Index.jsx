import React from "react";
import DefaultAdmin from "../../Layouts/DefaultAdmin";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Index = ({
    totalChartTransactions,
    totalPaymentTransactions,
    totalDraftTransactions,
    dataTransactionByMonth,
    highest20OrderToday,
    countTodayTransaction,
    totalCategories,
    totalBrands,
    totalItems,
    totalVariations,
    totalUsers,
}) => {
    console.log(highest20OrderToday, countTodayTransaction);

    const totalTransactions =
        parseInt(totalChartTransactions) +
        parseInt(totalPaymentTransactions) +
        parseInt(totalDraftTransactions);
    const d = new Date();
    let year = d.getFullYear();

    const data = {
        labels: ["Cart", "Payment", "Draft"],
        datasets: [
            {
                data: [
                    totalChartTransactions,
                    totalPaymentTransactions,
                    totalDraftTransactions,
                ],
                backgroundColor: ["#3d405b", "#81b29a", "#f2cc8f"],
                borderWidth: 1,
            },
        ],
    };

    const dataLine = {
        // X-axis labels for each day of the week
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],

        // Dataset configuration for the Line chart
        datasets: [
            {
                // Label for the dataset
                label: "Total Transactions " + year,

                // Configuration for the appearance of the line
                fill: false, // Do not fill the area under the line
                lineTension: 0.1, // Tension of the line curve

                // Styling for the line and data points
                // chartjs background color
                backgroundColor: "#2f3249",
                borderColor: "#575d86",
                //... (other styling properties)

                data: dataTransactionByMonth,
            },
        ],
    };

    return (
        <DefaultAdmin>
            <div className="grid grid-cols-5 gap-2">
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-4 rounded-md mb-4">
                    <h4 className="text-gray-300 text-xl font-bold">
                        <i className="ri-archive-drawer-line text-2xl"></i>
                        Category Item
                    </h4>
                    <span className="text-lg font-bold text-gray-400">
                        {totalCategories}
                    </span>
                </div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-4 rounded-md mb-4">
                    <h4 className="text-gray-300 text-xl font-bold">
                        <i className="ri-building-2-line text-2xl"></i>
                        Brands
                    </h4>
                    <span className="text-lg font-bold text-gray-400">
                        {totalBrands}
                    </span>
                </div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-4 rounded-md mb-4">
                    <h4 className="text-gray-300 text-xl font-bold">
                        <i className="ri-archive-2-line text-2xl"></i>
                        Items
                    </h4>
                    <span className="text-lg font-bold text-gray-400">
                        {totalItems}
                    </span>
                </div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-4 rounded-md mb-4">
                    <h4 className="text-gray-300 text-xl font-bold">
                        <i className="ri-list-radio text-2xl"></i>
                        Variations
                    </h4>
                    <span className="text-lg font-bold text-gray-400">
                        {totalVariations}
                    </span>
                </div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-4 rounded-md mb-4">
                    <h4 className="text-gray-300 text-xl font-bold">
                        <i className="ri-group-line text-2xl"></i>
                        Users
                    </h4>
                    <span className="text-lg font-bold text-gray-400">
                        {totalUsers}
                    </span>
                </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md mb-4">
                <div className="flex justify-between mb-4 items-start">
                    <div className="font-medium">Transactions by Month</div>
                </div>
                <div className="overflow-x-auto">
                    <Line data={dataLine} width={75} height={25} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Transaction by Status</div>
                    </div>
                    <div className="overflow-x-auto">
                        <Pie data={data} />
                        <h4 className="text-gray-400 text-md font-bold mt-4">
                            Total Transactions : {totalTransactions}
                        </h4>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">
                            Today's Highest Transaction
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table
                            className="w-full min-h-[300px]"
                            data-tab-for="order"
                            data-page="active"
                        >
                            <thead>
                                <tr>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                                        Transaction No
                                    </th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {highest20OrderToday.length > 0 ? (
                                    highest20OrderToday.map((item, i) => (
                                        <tr key={i}>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">
                                                    {item.transaction_no}
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">
                                                    Rp{" "}
                                                    {item.total.toLocaleString(
                                                        "ID-id"
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="text-center">
                                            No transactions today
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <h4 className="text-gray-400 text-md font-bold mt-4">
                            Total Transactions Today : {countTodayTransaction}
                        </h4>
                    </div>
                </div>
            </div>
        </DefaultAdmin>
    );
};

export default Index;
