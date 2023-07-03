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
            className="block my-2 sm:my-4 sm:mx-4 bg-white border p-2 sm:p-4 shadow-sm hover:shadow-lg transition-all rounded text-center w-full sm:w-auto"
        >
            {bookItem.title} {!!clicked && <span className='inline-block mr-2 align-middle rounded-full border-2 border-transparent border-t-orange-600 w-5 h-5 animate-spin'/>}
        </Link>
    )
}

export default BookItem;