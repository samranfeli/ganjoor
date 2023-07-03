import Image from "next/image";
import Link from "next/link";

import { GetPageByUrlResponse } from "@/Types";

type Props = {
    data: GetPageByUrlResponse;
}

const PoetOrCat: React.FC<Props> = props => {

    const { poet, cat } = props.data.poetOrCat;

    if (!poet || !cat) {
        return (
            <div>
                no data found!
            </div>
        )
    }

    return (
        <>
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

            {cat.description && <div className='mb-4'>
                {cat.description}
            </div>}

            {!!cat.children && cat.children.map(child => <Link key={child.id} className='block mb-3' href={child.fullUrl}>
                <span className='text-orange-400'>{child.title}</span>
            </Link>)}

            {!!cat.poems && cat.poems.map(poem => <Link key={poem.id} className='block mb-3' href={cat.fullUrl + "/" + poem.urlSlug}>
                <span className='text-orange-400'>{poem.title}</span> : {poem.excerpt}
            </Link>)}
        </>
    )
}

export default PoetOrCat;