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


    const searchTerm = searchParams?.get('s');
    const poetId = searchParams?.get('author');

    let url = `https://api.ganjoor.net/api/ganjoor/poems/search?PageNumber=${currentPage}&PageSize=10&term=${searchTerm}&catId=0`;
    if (poetId) {
        url = `https://api.ganjoor.net/api/ganjoor/poems/search?PageNumber=${currentPage}&PageSize=10&term=${searchTerm}&poetId=${poetId}&catId=0`
    }

    const fetcher = (url: string) => fetch(url).then(res => res.json())

    const { data, error } = useSWR<SearchItemType[], any>(url, fetcher);

    if (error) return <div>failed to load</div>

    if (!data) return <div>
        {[1, 2, 3, 4].map(s => <Skeleton key={s} active avatar className='border-b border-gray-300 py-8' />)}
    </div>

    return (
        <div>
            {data.map(searchItem => <SearchResultItem key={searchItem.id} searchedText={searchTerm || ""} item={searchItem} />)}
            {data.length ? (
                <div dir="ltr">
                    <Pagination className="my-6 sm:my-6 text-center" current={currentPage} onChange={onChangePage} showSizeChanger={false} pageSize={10} total={50} />
                </div>
            ) : (
                <div className='py-4'>
                    <h3 className='font-bold text-xl md:text-2xl mb-5'>شعری با مشخصات مورد نظر شما پیدا نشد.</h3>
                    <h4 className='font-bold text-lg md:text-xl mb-4'>توصیه‌هایی برای دستیابی به نتیجهٔ مطلوبتر در جستجو:</h4>
                    <ul className='text-justify list-inside list-disc pr-4 md:pr-10'>
                        <li className='my-3'>
                            <strong className='font-semibold'>
                                به جای جستجوی متن کامل یک بیت بهتر است حروف کلیدی آن را وارد کنید.
                            </strong>
                            از آنجا که اشعار به صورتهای مختلف در نسخه‌های متفاوت نقل شده‌اند ممکن است چیزی که شما در ذهن دارید با چیزی که در پایگاه ما ثبت شده متفاوت باشد. به عنوان نمونه مصرع «کشتی شکستگانیم ای باد شرطه برخیز» از حافظ در بعضی از نسخه‌ها به صورت «کشتی نشستگانیم ای باد شرطه برخیز» ضبط شده و شما با تایپ صورت صورت دوم آن را در گنجور نخواهید یافت. بهتر است برای یافتن این شعر کلماتی مانند کشتی و شرطه را جستجو کنیم.
                        </li>
                        <li className='my-3'>
                            کلماتی را که ممکن است به صورت جدا یا سر هم نوشته شوند در گام اول به صورت جدا امتحان کنید (<strong className='font-semibold'>می شود</strong> و نه <del>میشود</del> یا <del>می&zwnj;شود</del>).
                        </li>
                        <li className='my-3'>
                            در صورتی که نام سخنور را می&zwnj;دانید بهتر است از طریق لیست بازشوی جلوی جعبهٔ جستجو نام او را انتخاب کنید. این توصیه برای زمانی مناسب است که جستجوی عبارت مورد نظر شما باعث می&zwnj;شود آثار سخنورانی که مورد نظر شما نیستند در صدر نتایج قرار گیرد و به این وسیله شما می&zwnj;خواهید به فهرست محدودتری از نتایج دست پیدا کنید.
                        </li>
                        <li className='my-3'>
                            در صورتی که با فنون اولیهٔ جستجو آشنا نیستید یا
                            <strong className='font-semibold mx-1'>معمولاً جستجوهایتان به نتیجهٔ مطلوب نمی‌رسد</strong>
                            بد نیست نگاهی به
                            <a target='_blank' href="http://hrmoh.ir/1385/04/18/howto-search-better/" title='توصیه هایی برای جستجوی بهتر در اینترنت' className='mx-1 text-sky-600'> این نوشته </a> بیندازید.
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Search;