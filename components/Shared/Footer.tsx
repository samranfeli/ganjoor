import Link from "next/link";

const Footer:React.FC = () => {
    return(
        <footer>
            <div className='mx-auto max-w-6xl'>
                <div className="text-center py-6 border-t-2">
                    <div>
                        <Link className="mx-1 md:mx-3 text-gray-400 hover:text-gray-700 text-sm md:text-base" href="/"> خانه </Link>
                        <Link className="mx-1 md:mx-3 text-gray-400 hover:text-gray-700 text-sm md:text-base" href="/about"> معرفی </Link>
                        <Link className="mx-1 md:mx-3 text-gray-400 hover:text-gray-700 text-sm md:text-base" href="/random"> بیت تصادفی </Link>
                        <Link className="mx-1 md:mx-3 text-gray-400 hover:text-gray-700 text-sm md:text-base" href="/privacy"> حریم خصوصی </Link>
                        <Link className="mx-1 md:mx-3 text-gray-400 hover:text-gray-700 text-sm md:text-base" href="/contact"> تماس </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;