import Head from "next/head";

import InstagramIcon from '../assets/images/instagram.svg';
import TelegramIcon from '../assets/images/telegram.svg';
import TwitterIcon from '../assets/images/twitter.svg';
import FacebookIcon from '../assets/images/facebook.svg';
import Image from "next/image";

const Contact: React.FC = () => {
    return (
        <>
            <Head>
                <title> گنجور » تماس با ما </title>
            </Head>
            <section className="py-4 md:py-8 text-justify">
                <h2 className="font-bold mb-2 md:mb-6 text-lg md:text-2xl">
                    تماس با ما
                </h2>
                <p className="mb-2 md:mb-4">
                    برای تماس با ما از طریق ایمیل از نشانی <a href="mailto:ganjoor@ganjoor.net" className="text-sky-500" target="_blank"> ganjoor@ganjoor.net </a> استفاده کنید.
                </p>
                <p className="mb-2 md:mb-4">
                    متأسفانه تماس با گنجور دربارهٔ پیدا کردن نام شاعر شعر مد نظر یا تأیید یا رد انتساب اشعار به شاعران، معنی و مفهوم اشعار و پاسخگویی به سؤالات مرتبط با ادبیات یا حتی پیدا کردن شعری برای شما که ممکن است در سایت موجود باشد کمکی نمی‌تواند بکند و با عرض پوزش این گونه درخواستها بی‌پاسخ می‌ماند.
                </p>
                <p className="mb-2 md:mb-4">
                    گنجور امکانات ویژه‌ای برای اضافه کردن مجموعه‌های جدید ندارد و در این زمینه به کمک دوستان علاقمند متکی است. لذا پیشنهاد اضافه کردن شاعران مد نظر امکان دریافت پاسخ مثبت را ندارد.
                </p>
                <div className="text-center py-4">
                    <a href="https://telegram.me/GanjoorOfficial" target="_blank" className="inline-block mx-2 md:mx-4">
                        <Image src={TelegramIcon} alt="telegram" width="48" height="48" className="h-8 w-8 md:h-12 md:w-12" />
                    </a>

                    <a href="http://www.facebook.com/ganjoor" target="_blank" className="inline-block mx-2 md:mx-4">
                        <Image src={FacebookIcon} alt="facebook" width="48" height="48" className="h-8 w-8 md:h-12 md:w-12" />
                    </a>

                    <a href="https://www.instagram.com/ganjoorofficial/" target="_blank" className="inline-block mx-2 md:mx-4">
                        <Image src={InstagramIcon} alt="instagram" width="48" height="48" className="h-8 w-8 md:h-12 md:w-12" />
                    </a>

                    <a href="https://twitter.com/GanjoorOfficial" target="_blank" className="inline-block mx-2 md:mx-4">
                        <Image src={TwitterIcon} alt="twitter" width="48" height="48" className="h-8 w-8 md:h-12 md:w-12" />
                    </a>
                </div>


            </section>
        </>
    )
}

export default Contact;