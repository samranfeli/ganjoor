import Link from "next/link";
import {useState} from 'react';


type Props = {
    child: {
        title:string;
        fullUrl:string;
    };
}

const CategoeyChildItem: React.FC<Props> = props => {

    const { child } = props;

    const [clicked,setClicked] = useState<boolean>(false);
    
    return (
        <Link className='block mb-3' href={child.fullUrl} onClick={()=>{setClicked(true)}}>
            <span className='text-orange-400'>{child.title} {clicked ? <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" /> : <i className="zmdi zmdi-chevron-left mr-2 align-middle text-2xl w-4" />}</span> 
        </Link>
    )
}

export default CategoeyChildItem;
