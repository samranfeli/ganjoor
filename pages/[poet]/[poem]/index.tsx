import Link from 'next/link';
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import Image from 'next/image';

import { request } from "@/helpers";
import { Cat, Poet } from '@/Types';

interface pageData {
    fullTitle: string;
    fullUrl: string;
    ganjoorPageType: number;
    htmlText: string;
    id: number;
    next: unknown;
    noIndex: boolean;
    poem: unknown;
    poetOrCat: {
        poet: Poet;
        cat: Cat;
    };
    previous: unknown;
    redirectFromFullUrl: unknown;
    secondPoet: unknown;
    title: string;
    urlSlug: string;
}

type Props = {
    data: pageData;
}

const Poem: React.FC<Props> = (props) => {

    if (!props.data){
        return(
            <div className="text-rose-500">
                loading...
            </div>
        )
    }

    const {poet,cat} = props.data.poetOrCat;

    return (
        <div className='py-4'>
            <div className='text-center'>
                <Link href={poet.fullUrl} className="inline-block font-semibold text-md sm:text-lg text-center mb-2 sm:mb-4 text-gray-400">
                    <Image 
                        src={"https://api.ganjoor.net" + poet.imageUrl} 
                        alt={poet.name} 
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

            {cat.children.map(child =><Link className='block mb-3' href={child.fullUrl}>
                <span className='text-orange-400'>{child.title}</span>
            </Link> )}

            {cat.poems.map(poem =><Link className='block mb-3' href={cat.fullUrl+"/"+poem.urlSlug}>
                <span className='text-orange-400'>{poem.title}</span> : {poem.excerpt}
            </Link> )}

        </div>
    )
}


export async function getServerSideProps(context:GetServerSidePropsContext):Promise<GetServerSidePropsResult<Props>>{
    
    const {params} = context;

    if (!params?.poem || !params?.poet){
        return({
            notFound: true
        })
    }

    const data = await request<pageData>(`https://api.ganjoor.net/api/ganjoor/page?url=/${params.poet}/${params.poem}&catPoems=true`)

    return({
        props:{
            data: data
        }
    })
}

export default Poem;