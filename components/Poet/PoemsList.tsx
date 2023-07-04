import { Pagination } from "antd";

import { Poem } from "@/Types";
import PoemsListItem from './PoemsListItem';
import { useState } from "react";

type Props = {
    poems: Poem[];
    categoryUrl : string;
}

const PoemsList : React.FC<Props> = props => {
    
    const [currentPage,setCurrentPage] = useState<number>(1);

    const {poems, categoryUrl} = props;

    const onChangePage = (e:number) =>{
        setCurrentPage(e);
    }

    return (
        <div>
            {poems.slice(currentPage*10-10,currentPage*10).map(poem => <PoemsListItem key={poem.id} poem={poem} categoryUrl={categoryUrl} />)}
            
            {(poems.length > 10) && (<div dir="ltr">
                <Pagination className="my-6 sm:my-6 text-center" current={currentPage} onChange={onChangePage} total={poems.length} showSizeChanger={false} pageSize={10}/>
            </div>)}
        </div>
    )
}

export default PoemsList;