import React, { useState } from "react";
import DefaultAdmin from "../../../Layouts/DefaultAdmin";
import DataTableReact, { defaultThemes } from "react-data-table-component";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import ReactSelect from "react-select";

const Index = ({ data }) => {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterUnit, setFilterUnit] = useState("");
    const [filterBrand, setFilterBrand] = useState("");
    const { session } = usePage().props;
    const { categories } = usePage().props;
    const { units } = usePage().props;
    const { brands } = usePage().props;

    console.log(search, filterCategory, filterUnit, filterBrand);

    const columns = [
        {
            name: "No",
            selector: (row, i) => i + 1,
            // sortable: true,
            width: "60px",
            center: true,
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Category",
            width: "120px",
            center: true,
            selector: (row) => row.category_name,
        },
        {
            name: "Unit",
            width: "120px",
            center: true,
            selector: (row) => row.unit_name,
        },
        {
            name: "Brand",
            width: "120px",
            center: true,
            selector: (row) => row.brand_name,
        },
        {
            name: "Name",
            width: "160px",
            selector: (row) => row.name,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            name: "Created By",
            width: "130px",
            center: true,
            selector: (row) => row.created_name,
        },
        {
            // button: true,
            right: true,
            width: "100px",
            cell: (row) => (
                <div className="btn-group">
                    <Link
                        href={`/A/stock-and-price/${row.id}`}
                        className="btn btn-outline btn-info btn-sm"
                        title="Set Stock & Price"
                    >
                        <i className="ri-price-tag-line"></i>
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

    let filteredItems = data;

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

    return (
        <>
            <Head>
                <title>Stock & Price | Manajemen POS</title>
            </Head>
            <DefaultAdmin>
                <div className="w-100">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-2 items-start">
                            <div className="font-medium text-lg text-gray-600 mb-3">
                                Data Items (Set Stock)
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="collapse bg-white rounded-md border overflow-visible">
                                <input type="checkbox" />
                                <div className="collapse-title text-md text-gray-500 font-medium">
                                    Filter
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
                                            onChange={(item) =>
                                                setFilterUnit(item)
                                            }
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
            </DefaultAdmin>
        </>
    );
};

export default Index;
