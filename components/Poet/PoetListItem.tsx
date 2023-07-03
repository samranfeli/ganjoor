import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Poet } from "../../Types"

type Props ={poet :Poet};

const PoetListItem:React.FC<Props> = props => {

    const [clicked,setClicked] = useState<boolean>(false);

    const {poet} = props;
    return(
        <Link href={poet.fullUrl!} className="group block shrink-0 grow-0 basis-20 m-3 text-center" onClick={() => {setClicked(true)}}>
            <div className={`
                relative ${clicked?"after:block after:rounded-full after:border-4 after:border-transparent after:border-t-orange-600 after:w-full after:h-full after:absolute after:top-0 after:left-0 after:animate-spin":""}
                group-hover:scale-105 transition-all
            `}>
                <Image
                    src={"https://api.ganjoor.net" + poet.imageUrl} 
                    alt={poet.name||""} 
                    className="rounded-full h-20 w-20 object-cover"
                    width={80} 
                    height={80} 
                />
            </div>
            
            <h3 className={`mt-2 group-hover:text-orange-400 transition-all leading-5 ${poet.id < 10 ? "font-bold text-md":"text-sm"}`}>{poet.name}</h3>

        </Link>
    )
}

export default PoetListItem;