import Image from "next/image";
import Link from "next/link";
import React from "react";

import { GetPageByUrlResponse, Verse } from "@/Types";
import { getPoemFormat } from '../../helpers';
import Poem from './Poem';

type Props = {
    data: GetPageByUrlResponse;
}

const PoemDetail: React.FC<Props> = props => {

    const { poem } = props.data;
    const { poet } = poem.category;

    const versesArray: Verse[] = [];

    for (const verse of poem.verses) {
        if (versesArray.find(item => item.coupletIndex === verse.coupletIndex)) {
            const updatingItem = versesArray.find(item => item.coupletIndex === verse.coupletIndex);
            updatingItem?.verses.push({
                id: verse.id,
                text: verse.text,
                versePosition: verse.versePosition
            });
        } else {
            versesArray.push({
                vOrder: verse.vOrder,
                coupletIndex: verse.coupletIndex!,
                verses: [{ id: verse.id, text: verse.text, versePosition: verse.versePosition }]
            })
        }
    }

    return (
        <div>
            <div className='text-center'>
                <Link href={poet.fullUrl || ""} className="inline-block font-semibold text-md sm:text-lg text-center mb-2 sm:mb-4 text-gray-400">
                    <Image
                        src={"https://api.ganjoor.net" + poet.imageUrl}
                        alt={poet.name || ""}
                        className="rounded-full h-20 w-20 object-cover mb-2 mx-auto"
                        width={80}
                        height={80}
                    />
                    {poet.nickname}
                </Link>
            </div>
            <h2 className="font-bold text-lg sm:text-2xl text-center mb-4 sm:mb-8">{props.data.title}</h2>

            <div className="text-sm sm:text-base">

                <Poem verses={versesArray} />

                <div className="clearfix mt-4 sm:mt-10">

                    {!!poem.previous && <Link href={poem.category.cat.fullUrl + "/" + poem.previous.urlSlug} className="text-blue-500 float-right">
                        <i className="zmdi zmdi-chevron-right ml-2 align-middle text-2xl" />{poem.previous.title}: {poem.previous.excerpt}
                    </Link>}

                    {poem.next && <Link href={poem.category.cat.fullUrl + "/" + poem.next.urlSlug} className="text-blue-500 float-left">
                        {poem.next.title}: {poem.next.excerpt} <i className="zmdi zmdi-chevron-left mr-2 align-middle text-2xl" />
                    </Link>}

                </div>

                <div className="p-4 my-4 bg-violet-50 rounded border border-violet-200">
                    <h4 className="mb-4 text-lg">اطلاعات</h4>

                    {!!poem.sections[0]?.ganjoorMetre?.rhythm && <div className="mb-3">
                        وزن: {poem.sections[0].ganjoorMetre.rhythm}
                    </div>}

                    {!!getPoemFormat(poem.sections[0].poemFormat) && <div className="mb-3">
                        قالب شعری:	{getPoemFormat(poem.sections[0].poemFormat)}
                    </div>}

                    {!!poem.sourceName && <div className="mb-3">
                        منبع اولیه: {poem.sourceName}
                    </div>}

                    <p className="mt-6">* با انتخاب متن و لمس متن انتخابی می‌توانید آن را در لغتنامهٔ دهخدا جستجو کنید.</p>
                </div>

            </div>

        </div>
    )
}

export default PoemDetail;