import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';

import { SearchItemType } from "@/Types";
import {useState} from 'react';

type Props = {
    item: SearchItemType;
    searchedText: string;
}

const SearchResultItem: React.FC<Props> = props => {

    const { item, searchedText } = props;

    const [clicked,setClicked] = useState<boolean>(false);

    if (!item.plainText) {
        return null;
    }

    const versesArray: string[] = item.plainText.split("\r\n");

    const versesHasTerm: string[] = [];

    versesArray?.forEach((verse, index, array) => {
        if (verse.includes(`${searchedText}`)) {
            const transformedVerse = verse.replaceAll(`${searchedText}`, `<mark>${searchedText}</mark>`);
            versesHasTerm.push(transformedVerse);
        } else if (array[index + 1] && array[index + 1].includes(`${searchedText}`)) {
            versesHasTerm.push("... " + verse);
        } else if (array[index - 1] && array[index - 1].includes(`${searchedText}`)) {
            versesHasTerm.push(verse + " ...", "<br/>")
        }
    });

    return (
        <div className="py-4 border-b border-gray-300">
            <div className=" flex items-center mb-2">
                <Image
                    src={"https://api.ganjoor.net" + item.category.poet.imageUrl!}
                    alt={item.category.poet.name!}
                    className="rounded-full h-14 w-14 object-cover ml-3"
                    width={50}
                    height={50}
                />
                <Link href={item.fullUrl!} className="text-sky-600 text-lg block font-semibold"  onClick={()=>{setClicked(true)}}>
                    {item.fullTitle} {clicked ? <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" /> : <i className="zmdi zmdi-chevron-left mr-2 align-middle text-2xl w-4" />}
                </Link>
            </div>
            <div className="text-base text-gray-500">
                {versesHasTerm.map((verseItem,index) => <p key={index}>{parse(verseItem)}</p>)}
            </div>

        </div>
    )
}

export default SearchResultItem;