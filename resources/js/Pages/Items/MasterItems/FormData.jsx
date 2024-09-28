import React, { useEffect, useState } from "react";
import DefaultAdmin from "../../../Layouts/DefaultAdmin";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import ReactSelect from "react-select";
import { useDropzone } from "react-dropzone";
import FormDataDetail from "./FormDataDetail";
import Swal from "sweetalert2";

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
};

const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
};

const img = {
    display: "block",
    width: "auto",
    height: "100%",
};

const FormData = ({ data }) => {
    const { errors } = usePage().props;
    const { session } = usePage().props;
    const { categories } = usePage().props;
    const { units } = usePage().props;
    const { brands } = usePage().props;
    const { val_category } = usePage().props;
    const { val_unit } = usePage().props;
    const { val_brand } = usePage().props;
    const { details } = usePage().props;
    const { images } = usePage().props;

    const [valCategories, setValCategories] = useState(
        data ? val_category : ""
    );
    const [valUnits, setValUnits] = useState(data ? val_unit : "");
    const [valBrands, setValBrands] = useState(data ? val_brand : "");
    const [valName, setValName] = useState(data ? data.name : "");
    const [valDesc, setValDesc] = useState(data ? data.description : "");
    const [dataVariation, setDataVariation] = useState(data ? details : []);
    const [files, setFiles] = useState([]);
    const [dataImages, setDataImages] = useState(data ? images : "");

    const saveData = (e) => {
        e.preventDefault();

        const dataSave = {
            category_id: valCategories ? valCategories.value : null,
            unit_id: valUnits ? valUnits.value : null,
            brand_id: valBrands ? valBrands.value : null,
            name: valName,
            description: valDesc,
            images: files,
            data_variation: dataVariation,
            forceFormData: true,
        };

        console.log(dataSave);

        if (data) {
            Inertia.post(`/A/manage-items/${data.id}`, {
                category_id: valCategories ? valCategories.value : null,
                unit_id: valUnits ? valUnits.value : null,
                brand_id: valBrands ? valBrands.value : null,
                name: valName,
                description: valDesc,
                images: files,
                data_variation: dataVariation,
                forceFormData: true,
                _method: "PUT",
            });
        } else {
            Inertia.post("/A/manage-items", {
                category_id: valCategories ? valCategories.value : null,
                unit_id: valUnits ? valUnits.value : null,
                brand_id: valBrands ? valBrands.value : null,
                name: valName,
                description: valDesc,
                images: files,
                data_variation: dataVariation,
                forceFormData: true,
            });
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    const deleteImage = (item_id, id, index) => {
        Swal.fire({
            title: "Peringatan!",
            text: "Apakah anda yakin ingin menghapus image ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/A/manage-item-images/${item_id}/${id}`);

                const newDataImages = dataImages.filter((item, i) => {
                    return i != index;
                });

                setDataImages(newDataImages);
            }
        });
    };

    const renderDataImages = () => {
        return dataImages ? (
            <>
                <div className="grid grid-cols-3 gap-3">
                    {dataImages.map((item, i) => (
                        <div key={i} className="p-2 border">
                            <div className="avatar w-full">
                                <div className="w-32 rounded">
                                    <img
                                        src={`/assets/upload/items/image/${item.image}`}
                                    />
                                </div>
                            </div>
                            <span
                                className="btn btn-error btn-sm text-white w-full"
                                onClick={() => deleteImage(data.id, item.id, i)}
                            >
                                <i className="ri-delete-bin-6-line text-md"></i>
                            </span>
                        </div>
                    ))}
                </div>
            </>
        ) : (
            ""
        );
    };

    return (
        <>
            <Head>
                <title>Item Brands Form | Manajemen POS</title>
            </Head>
            <DefaultAdmin>
                <div className="w-100">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium text-lg text-gray-600 mb-3">
                                Form Item Brands
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <form onSubmit={saveData}>
                                <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">
                                    <div className="pr-0 lg:pr-4">
                                        <h4 className="mb-3 font-bold text-gray-700">
                                            Data
                                        </h4>
                                        <div className="mb-2">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Categories
                                                </span>
                                                <ReactSelect
                                                    value={valCategories}
                                                    onChange={(item) =>
                                                        setValCategories(item)
                                                    }
                                                    className="mt-1 text-gray-600"
                                                    options={categories}
                                                    placeholder="Select Category"
                                                ></ReactSelect>
                                            </label>
                                            {errors.category_id && (
                                                <small className="text-red-600">
                                                    {errors.category_id}
                                                </small>
                                            )}
                                        </div>
                                        <div className="mb-2">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Unit
                                                </span>
                                                <ReactSelect
                                                    value={valUnits}
                                                    onChange={(item) =>
                                                        setValUnits(item)
                                                    }
                                                    className="mt-1 text-gray-600"
                                                    options={units}
                                                    placeholder="Select Unit"
                                                ></ReactSelect>
                                            </label>
                                            {errors.unit_id && (
                                                <small className="text-red-600">
                                                    {errors.unit_id}
                                                </small>
                                            )}
                                        </div>
                                        <div className="mb-2">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Brands
                                                </span>
                                                <ReactSelect
                                                    value={valBrands}
                                                    onChange={(item) =>
                                                        setValBrands(item)
                                                    }
                                                    className="mt-1 text-gray-600"
                                                    options={brands}
                                                    placeholder="Select Brands"
                                                ></ReactSelect>
                                            </label>
                                            {errors.brand_id && (
                                                <small className="text-red-600">
                                                    {errors.brand_id}
                                                </small>
                                            )}
                                        </div>
                                        <div className="mb-2">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Name
                                                </span>
                                                <input
                                                    type="text"
                                                    value={valName}
                                                    onChange={(e) =>
                                                        setValName(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                                />
                                            </label>
                                            {errors.name && (
                                                <small className="text-red-600">
                                                    {errors.name}
                                                </small>
                                            )}
                                        </div>
                                        <div className="mb-2">
                                            <label className="block">
                                                <span className="block text-sm font-medium text-slate-700">
                                                    Description
                                                </span>
                                                <textarea
                                                    rows={8}
                                                    value={
                                                        valDesc ? valDesc : ""
                                                    }
                                                    onChange={(e) =>
                                                        setValDesc(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"
                                                ></textarea>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-3 font-bold text-gray-700">
                                            Images
                                        </h4>

                                        <section className="container p-4 border-2 border-slate-200 rounded">
                                            <div
                                                {...getRootProps({
                                                    className: "dropzone",
                                                })}
                                            >
                                                <input {...getInputProps()} />
                                                <p className="p-4 text-center">
                                                    Drag 'n' drop some files
                                                    here, or click to select
                                                    files
                                                </p>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                {thumbs}
                                            </aside>
                                        </section>

                                        <div className="mt-3">
                                            {renderDataImages()}
                                        </div>
                                    </div>
                                </div>

                                <FormDataDetail
                                    dataVariation={dataVariation}
                                    setDataVariation={setDataVariation}
                                    kondisi={data ? "update" : "create"}
                                ></FormDataDetail>

                                <div className="pt-4 flex justify-end">
                                    <button className="btn btn-primary text-white">
                                        <i className="ri-save-line"></i>
                                        {data ? "Update" : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DefaultAdmin>
        </>
    );
};

export default FormData;
