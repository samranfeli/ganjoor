import Link from "next/link";
import { useState } from "react";

import { Poem } from "@/Types";

type Props = {
    poem: Poem;
    categoryUrl : string;
}

const PoemsListItem: React.FC<Props> = props => {
    const { poem,categoryUrl } = props;
    const [clicked,setClicked] = useState<boolean>(false);

    return (
        <Link key={poem.id} className='block mb-3' href={categoryUrl + "/" + poem.urlSlug} onClick={()=>{setClicked(true)}}>
            <span className='text-orange-400'>{poem.title}</span> : {poem.excerpt} {clicked ? <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" /> : <i className="zmdi zmdi-chevron-left mr-2 align-middle text-2xl w-4" />}
        </Link>
    )
}

export default PoemsListItem;