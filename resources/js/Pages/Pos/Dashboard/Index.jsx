import React from "react";
import DefaultPos from "../../../Layouts/DefaultPos";
import { Head, usePage } from "@inertiajs/inertia-react";

const Index = () => {
    const { auth } = usePage().props;

    return (
        <>
            <Head>
                <title>Dashboard | Point Of Sales</title>
            </Head>
            <DefaultPos>
                <div className="p-6">
                    <article className="px-20 m-10">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Ipsum eveniet obcaecati voluptate doloribus,
                        beatae dolorem animi dicta eligendi, omnis tenetur harum
                        molestias mollitia laudantium quaerat excepturi maxime
                        illum itaque sunt quis incidunt enim officiis
                        dignissimos! Aliquam cupiditate, ex ipsum quia tempore,
                        voluptatem optio dolorem ratione provident accusantium
                        nesciunt blanditiis. Recusandae deleniti ullam
                        repellendus obcaecati aliquid odit corporis vero veniam
                        corrupti, excepturi, amet et nihil temporibus, impedit
                        doloribus dignissimos ipsa facere atque. Eum minus
                        saepe, ut molestias dolorem nulla! Pariatur sequi
                        eveniet odit debitis expedita dignissimos minima dolorum
                        sit, inventore ratione esse beatae molestias iure,
                        blanditiis exercitationem accusantium aliquam illum qui.
                        Incidunt, sapiente consequatur. Amet explicabo quo
                        sapiente doloribus distinctio officiis architecto vitae
                        pariatur voluptates praesentium omnis fuga dolorem
                        dignissimos minus nihil possimus voluptatum dolor est,
                        impedit consequuntur hic perspiciatis? Repellat
                        voluptate eaque beatae pariatur nemo inventore
                        voluptatibus ab, odit ea dolorem minus fugiat nobis
                        dolore quos. Illo consequatur deleniti veniam nobis
                        modi, sapiente odio placeat facilis fugiat officia vel
                        voluptatibus corporis alias ratione velit quis, quisquam
                        eos nostrum laboriosam? Cupiditate repellendus adipisci
                        voluptatum pariatur tenetur totam atque! Quia temporibus
                        provident accusamus magnam corporis hic voluptates
                        cupiditate rem error, facere inventore quasi aperiam non
                        soluta voluptatum sed porro quis voluptatibus ut.
                    </article>
                </div>
            </DefaultPos>
        </>
    );
};

export default Index;
