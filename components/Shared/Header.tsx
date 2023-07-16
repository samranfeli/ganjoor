import Image from 'next/image';
import { memo } from 'react';
import Link from 'next/link';

import Logo from '../../assets/images/logo.png';
import Search from '../Search/SearchForm';
import Login from '../User/Login';

const Header: React.FC = () => {
    return (
        <header>
            <div className='mx-auto max-w-6xl px-4'>
                <div className='py-2 md:py-6 flex justify-center'>
                    <Link href={'/'}>
                        <Image
                            src={Logo}
                            alt="گنجور"
                            width={120}
                            height={120}
                            className="h-20 w-20 md:h-28 md:w-28"
                        />
                    </Link>
                </div>

            </div>
            <div className='bg-stone-600 py-2'>
                <div className='mx-auto max-w-6xl px-4'>
                    <div className='flex justify-between items-center'>
                        <Search placeholder='جستجو' />
                        <Login />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);