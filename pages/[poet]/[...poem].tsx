import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import Head from 'next/head';

import { request } from "@/helpers";
import { GetPageByUrlResponse } from '@/Types';
import PoetOrCat from '../../components/Poet/PoetOrCat';
import Poem from '../../components/Poet/Poem';

type Props = {
    data: GetPageByUrlResponse;
}

const PoemDetail: React.FC<Props> = (props) => {

    if (!props.data){
        return(
            <div className="text-rose-500">
                loading...
            </div>
        )
    }


    return (
        <div className='py-4'>
            <Head>
                <title>{`گنجور » ${props.data.fullTitle}`}</title>
                {props.data.ganjoorPageType === 2 && <meta name="description" content={`مجموعه اشعار ${props.data.poetOrCat.poet.nickname}`} />}
                {props.data.ganjoorPageType === 2 && <meta name="keywords" content={`گنجور,مجموعه اشعار شاعران پارسی زبان,${props.data.poetOrCat.poet.name},${props.data.poetOrCat.poet.nickname}`} />}
            </Head>
            {props.data.ganjoorPageType === 2 && <PoetOrCat data={props.data} />}
            {props.data.ganjoorPageType === 3 && <Poem data={props.data} /> }
        </div>
    )
}


export async function getServerSideProps(context:GetServerSidePropsContext):Promise<GetServerSidePropsResult<Props>>{
    
    const {params} = context;

    if (!params?.poem || !params.poet){
        return({
            notFound: true
        })
    }

    let poemUrl : string = "/" + params.poet + "/";

    if (typeof params.poem === "string"){
        poemUrl += params.poem; 
    }else {
        poemUrl += params.poem.join("/");
    }


    const data = await request<GetPageByUrlResponse>(`https://api.ganjoor.net/api/ganjoor/page?url=${poemUrl}&catPoems=true`)

    return({
        props:{
            data: data
        }
    })
}

export default PoemDetail;