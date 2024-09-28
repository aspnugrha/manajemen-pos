import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Breadcrumb = ({ data }) => {
    const brLength = data ? data.length : 0;

    return data ? (
        <ul className="flex items-center text-sm ml-4">
            {data?.map((item, i) => (
                <li
                    key={i}
                    className={
                        item.link ? "mr-2" : "text-gray-600 mr-2 font-medium"
                    }
                >
                    {item.link ? (
                        <Link
                            className="text-gray-400 hover:text-gray-600 font-medium"
                            href={item.link}
                        >
                            {item.name}
                        </Link>
                    ) : (
                        item.name
                    )}
                </li>
            ))}
        </ul>
    ) : (
        <small className="mx-4">Navigasi tidak ditemukan.</small>
    );
};

export default Breadcrumb;
