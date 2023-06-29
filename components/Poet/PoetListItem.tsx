import Link from "next/link";

import { Poet } from "../../Types"

type Props ={poet :Poet};

const PoetListItem:React.FC<Props> = props => {
    const {poet} = props;
    return(
        <Link href={poet.fullUrl} className="group block shrink-0 grow-0 basis-20 m-3 text-center">

            <img 
                src={"https://api.ganjoor.net" + poet.imageUrl} 
                alt={poet.name} 
                className="rounded-full h-20 w-20 object-cover border-2 border-slate-300 group-hover:border-slate-700 group-hover:scale-105 transition-all"
                width={80} 
                height={80} 
            />
            
            <h3 className={`mt-2 group-hover:text-orange-400 transition-all ${poet.id < 10 ? "font-bold text-md":"text-sm"}`}>{poet.name}</h3>

        </Link>
    )
}

export default PoetListItem;