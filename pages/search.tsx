import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { Pagination, Skeleton } from 'antd';
import { useState } from 'react';

import { SearchItemType } from '../Types';
import SearchResultItem from '../components/Search/SearchResultItem';

const Search: React.FC = () => {

    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState<number>(1);

    const onChangePage = (e: number) => {
        window.scrollTo(0, 0);
        setCurrentPage(e);
    }

    if (!searchParams) {
        return null;
    }

    const searchTerm = searchParams.get('s');
    const poetId = searchParams.get('author');

    let url = `https://api.ganjoor.net/api/ganjoor/poems/search?PageNumber=${currentPage}&PageSize=10&term=${searchTerm}&catId=0`;
    if (poetId) {
        url = `https://api.ganjoor.net/api/ganjoor/poems/search?PageNumber=${currentPage}&PageSize=10&term=${searchTerm}&poetId=${poetId}&catId=0`
    }

    const fetcher = (url: string) => fetch(url).then(res => res.json())

    const { data, error } = useSWR<SearchItemType[], any>(url, fetcher);

    if (error) return <div>failed to load</div>

    if (!data) return <div>
        {[1,2,3,4].map(s => <Skeleton key={s} active avatar className='border-b border-gray-300 py-8' />)}
    </div>

    return (
        <div>
            {data?.map(searchItem => <SearchResultItem key={searchItem.id} searchedText={searchTerm || ""} item={searchItem} />)}
            <div dir="ltr">
                <Pagination className="my-6 sm:my-6 text-center" current={currentPage} onChange={onChangePage} showSizeChanger={false} pageSize={10} total={50} />
            </div>
        </div>
    )
}

export default Search;