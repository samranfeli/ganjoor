import Link from 'next/link';
import {useState} from 'react';

type Props = {
    bookItem : {
        fullUrl : string;
        title : string;
        id:number;
    }
}

const BookItem: React.FC<Props> = props => {
    
    const {bookItem} = props;
    
    const [clicked,setClicked] = useState<boolean>(false);

    return (
        <Link
            onClick={() => {setClicked(true)}}
            href={bookItem.fullUrl}
            key={bookItem.id}
            className="block my-2 sm:my-4 sm:mx-4 bg-white border p-2 sm:p-4 shadow-sm md:hover:shadow-lg transition-all rounded text-center w-full sm:w-auto"
        >
            {bookItem.title} {clicked ? <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" /> : <i className="zmdi zmdi-chevron-left mr-2 align-middle text-2xl w-4" /> }
        </Link>
    )
}

export default BookItem;