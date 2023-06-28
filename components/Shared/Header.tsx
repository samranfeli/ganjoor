import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../assets/images/logo.png';
import Search from './Search';

const Header: React.FC = () => {
    return (
        <header>
            <div className='mx-auto max-w-6xl'>
                <div className='py-6 flex justify-center'>
                    <Link href={'/'}>
                        <Image src={Logo} alt="گنجور" width={120} height={120} />
                    </Link>
                </div>
                <Search placeholder='جستجو' />
            </div>
        </header>
    )
}

export default Header;