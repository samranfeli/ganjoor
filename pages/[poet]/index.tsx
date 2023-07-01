import Link from "next/link";
import Head from 'next/head';

import { request } from "@/helpers";
import { Poet } from "@/Types";

type Props = {
    poet?: {
        cat:{
            children:{
                fullUrl:string;
                id:number;
                title:string;
                published:boolean;
            }[];
            description:string;
            descriptionHtml:any;
            fullUrl:string;
            id:number;
            title:string;
        };
        poet:{
            birthPlace?:string;
            birthYearInLHijri:number;
            description?:string;
            imageUrl:string;
            id:number;
            name:string;
            nickname:string;
            pinOrder:number;
            published:boolean;
            rootCatId:number;
        }
    }
}

const Poet:React.FC<Props> = (props) => {

    const {poet} = props;

    if (!props.poet){
        return(
            <div className="text-rose-500">
                loading...
            </div>
        )
    }

    const books = props.poet.cat.children;
    const booksName = books.flatMap(book => [book.title, book.title + " " + props.poet!.poet.nickname]);

    return(
        <div>
            <Head>
                <title>گنجور » {props.poet.poet.nickname} </title>
                <meta name="description" content={`مجموعه اشعار ${props.poet.poet.name}`} />
                <meta name="keywords" content={`گنجور,مجموعه اشعار شاعران پارسی زبان,${props.poet.poet.name},${props.poet.poet.nickname},${booksName.join(",")}`} />
            </Head>
            <div className="py-3 sm:py-6">
                <img 
                    src={"https://api.ganjoor.net" + poet?.poet.imageUrl} 
                    alt={poet?.poet.name} 
                    className="rounded-full h-20 w-20 sm:h-28 sm:w-28 object-cover mx-auto"
                    width={80} 
                    height={80} 
                />
            </div>
            
            <h2 className="font-bold text-lg sm:text-2xl text-center mb-4 sm:mb-8">{poet?.poet.nickname}</h2>
            <p className="text-justify mb-4">
                {poet?.poet.description}
            </p>
            <div className="flex flex-wrap justify-center mb-4">
                {poet?.cat.children.map(bookItem => (
                    <Link 
                        href={bookItem.fullUrl} 
                        key={bookItem.id}
                        className="block my-2 sm:my-4 sm:mx-4 bg-white border p-2 sm:p-4 shadow-sm hover:shadow-lg transition-all rounded text-center w-full sm:w-auto"
                    >
                        {bookItem.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}


export async function getStaticPaths() {
    return {
        paths: [
            { params: { poet: 'hafez' } },
            { params: { poet: 'iraj' } },
            { params: { poet: 'babataher' } },
            { params: { poet: 'parvin' } },
            { params: { poet: 'jami' } },
            { params: { poet: 'abdullah' } },
            { params: { poet: 'khayyam' } },
            { params: { poet: 'saadi' } },
            { params: { poet: 'rahi' } },
            { params: { poet: 'roodaki' } },
            { params: { poet: 'sanaee' } },
            { params: { poet: 'shahriar' } },
            { params: { poet: 'obeyd' } },
            { params: { poet: 'attar' } },
            { params: { poet: 'ferdousi' } },
            { params: { poet: 'moulavi' } },
            { params: { poet: 'nezami' } },
            { params: { poet: 'beyhaghi' } }            
         ],
        fallback: true
    };
}

export async function getStaticProps(context:any) {
    
    const { params } = context;
    
    const allPoets = await request<Poet[]>(`https://api.ganjoor.net/api/ganjoor/poets`);

    const requestedPoetId = allPoets.find(poet => poet.fullUrl === "/"+ params.poet)?.id;

    if (requestedPoetId){
        const poet = await request<any>(`https://api.ganjoor.net/api/ganjoor/poet/${requestedPoetId}`);
        return {
            props: { poet: poet },
        };
    }

}

 export default Poet;