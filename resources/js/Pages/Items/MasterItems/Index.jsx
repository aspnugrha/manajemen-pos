import React, { useState } from "react";
import DefaultAdmin from "../../../Layouts/DefaultAdmin";
import DataTableReact, { defaultThemes } from "react-data-table-component";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import ReactSelect from "react-select";

const Index = ({ data }) => {
    // console.log("units", data);

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
            width: "120px",
            cell: (row) => (
                <div className="btn-group">
                    <Link
                        href={`/A/manage-items/${row.id}/edit`}
                        className="btn btn-outline btn-default btn-sm"
                        title="Edit Data"
                    >
                        <i className="ri-edit-line"></i>
                    </Link>
                    <button
                        className={
                            "btn btn-outline " +
                            (row.enabled ? "btn-error" : "btn-success") +
                            " btn-sm"
                        }
                        onClick={() => hapusData(row.id, row.enabled)}
                        title="Hapus Data"
                    >
                        {row.enabled ? (
                            <i className="ri-delete-bin-line"></i>
                        ) : (
                            <i className="ri-refresh-line"></i>
                        )}
                    </button>
                </div>
            ),
        },
    ];

    const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
        <div className="form-check py-2">
            <input
                htmlFor="booty-check"
                type="checkbox"
                className="checkbox checkbox-sm"
                ref={ref}
                onClick={onClick}
                {...rest}
            />
        </div>
    ));

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

    // const addData = () => {
    //     document.getElementById("modal-data").showModal();
    //     document.getElementById("modal-title").innerHTML = "Ad Unit";
    // };

    const hapusData = (id, enabled) => {
        Swal.fire({
            title: "Peringatan!",
            text:
                "Apakah anda yakin ingin " +
                (enabled ? "menghapus" : "merestore") +
                " data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, " + (enabled ? "hapus" : "restore"),
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(`/A/manage-items/active-nonactive`, {
                    id,
                    enabled,
                });
            }
        });
    };

    return (
        <>
            <Head>
                <title>Items | Manajemen POS</title>
            </Head>
            <DefaultAdmin>
                <div className="w-100">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-2 items-start">
                            <div className="font-medium text-lg text-gray-600 mb-3">
                                Manage Items
                            </div>
                            <div className="btn-group">
                                <Link
                                    href={`/A/manage-items/create`}
                                    className="btn btn-primary btn-sm text-white"
                                >
                                    <i className="ri-add-line"></i>
                                    Tambah
                                </Link>
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
