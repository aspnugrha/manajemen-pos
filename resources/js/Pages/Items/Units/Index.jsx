import React, { useState } from "react";
import DefaultAdmin from "../../../Layouts/DefaultAdmin";
import DataTableReact, { defaultThemes } from "react-data-table-component";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

const Index = ({ data }) => {
    console.log("units", data);

    const [search, setSearch] = useState("");
    const { session } = usePage().props;

    const columns = [
        {
            name: "No",
            selector: (row, i) => i + 1,
            // sortable: true,
            width: "80px",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            // button: true,
            right: true,
            cell: (row) => (
                <div className="btn-group">
                    <Link
                        href={`/A/manage-item-units/${row.id}/edit`}
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

    // filteredItems = filteredItems.filter(
    //     (item) =>
    //         item.email &&
    //         item.email.toLowerCase().includes(emailType.toLowerCase())
    // );

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
                Inertia.post(`/A/manage-item-units/active-nonactive`, {
                    id,
                    enabled,
                });
            }
        });
    };

    return (
        <>
            <Head>
                <title>Item Unit | Manajemen POS</title>
            </Head>
            <DefaultAdmin>
                <div className="w-100">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-2 items-start">
                            <div className="font-medium text-lg text-gray-600 mb-3">
                                Manage Item Units
                            </div>
                            <div className="btn-group">
                                <Link
                                    href={`/A/manage-item-units/create`}
                                    className="btn btn-primary btn-sm text-white"
                                >
                                    <i className="ri-add-line"></i>
                                    Tambah
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2 mb-4 grid grid-cols-3">
                            <div></div>
                            <div></div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="input input-bordered text-gray-600 bg-white w-full max-w-xs"
                            />
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
