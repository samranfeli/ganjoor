import Image from "next/image";
import Link from "next/link";
import React from "react";

import { GetPageByUrlResponse } from "@/Types";

type Props = {
    data: GetPageByUrlResponse;
}

const Poem: React.FC<Props> = props => {

    const {poem} = props.data;
    const {poet} = poem.category;

    type Verse = {
        coupletIndex : number;
        vOrder:number;
        verses: {
            text?:string;
            id:number;
            versePosition :0 | 1 | 2 | 3 | 4 | 5 | -1;
        }[];
    };

    const versesArray :Verse[] = [];

    for (const verse of poem.verses){
        if(versesArray.find(item => item.coupletIndex === verse.coupletIndex)){
            const updatingItem = versesArray.find(item => item.coupletIndex === verse.coupletIndex);
            updatingItem?.verses.push({
                id:verse.id,
                text:verse.text,
                versePosition:verse.versePosition
            });
        }else{
            versesArray.push({
                vOrder:verse.vOrder,
                coupletIndex:verse.coupletIndex!,
                verses:[{id:verse.id, text:verse.text, versePosition:verse.versePosition}]
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
                {versesArray.map(verse => <React.Fragment key={verse.coupletIndex} >

                    {verse.verses[0].versePosition === -1 ? (
                        <p className="my-3 sm:my-6 leading-6 sm:leading-8 text-justify">
                            {verse.verses[0]?.text}
                        </p>
                    ):verse.verses[0].versePosition === 2 ? (
                        <div className="text-center mb-3 sm:mb-6 text-base sm:text-lg">
                            {verse.verses[0].text}
                        </div>
                    ) : (
                        <div
                            className="sm:flex sm:justify-center mb-2 sm:mb-4 sm:flex-wrap"
                        >
                            {verse.verses.map(hemistich => <div key={hemistich.id} className={`sm:px-8 grow-0 shrink-0 basis-2/4 ${hemistich.versePosition === 0 ? "text-right sm:text-left" : "text-left sm:text-right"}`}> {hemistich.text} </div>)}
                        </div>
                    )}

                </React.Fragment>
                )}

                <div className="clearfix mt-4">

                    {!!poem.previous && <Link href={poem.category.cat.fullUrl+"/"+ poem.previous.urlSlug} className="text-blue-500 float-right">
                    <i className="zmdi zmdi-chevron-right ml-2 align-middle text-2xl" />{poem.previous.title}: {poem.previous.excerpt}
                    </Link>}

                    {poem.next && <Link href={poem.category.cat.fullUrl+"/"+ poem.next.urlSlug} className="text-blue-500 float-left">
                    {poem.next.title}: {poem.next.excerpt} <i className="zmdi zmdi-chevron-left mr-2 align-middle text-2xl" />
                    </Link>}

                </div>

            </div>

        </div>
    )
}

export default Poem;