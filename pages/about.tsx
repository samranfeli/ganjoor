import Head from "next/head";
import Link from "next/link";

const About: React.FC = () => {
    return (
        <>
            <Head>
                <title> گنجور » دربارهٔ گنجور </title>
            </Head>
            <section className="py-4 md:py-8 text-justify">
                <h2 className="font-bold mb-2 md:mb-6 text-lg md:text-2xl">
                    دربارهٔ گنجور
                </h2>
                <p className="mb-2 md:mb-4">
                    «<strong>گنجور</strong>» مجموعه&zwnj;ای تحت وب از آثار سخنسرایان پارسی&zwnj;گو است که با استفاده از آن می&zwnj;توان ضمن مرور به تفکیک نام شاعر و نام آثار او، در بین آثار جستجو کرد. این مجموعه در ابتدا به کمک نرم&zwnj;افزار مدیریت محتوای <Link target="_blank"  className="text-sky-500" href="http://wordpress.org">وردپرس</Link> راه&zwnj;اندازی شده بود و از سال ۱۴۰۰ به بعد به پشتوانهٔ نرم&zwnj;افزار اختصاصی بازمتن خود کار می&zwnj;کند (<Link target="_blank"  className="text-sky-500" href="https://github.com/ganjoor/GanjoorService">کد منبع گنجور</Link>).
                </p>
                <p className="mb-2 md:mb-4">
                    این مجموعه پیش&zwnj;تر به عنوان زیرمجموعه&zwnj;ای از <Link target="_blank"  className="text-sky-500" href="http://hrmoh.ir" title="حمیدرضا محمدی">سایت شخصی راه&zwnj;انداز اولیهٔ آن</Link> راه&zwnj;اندازی شده بود که نهایتاً به دامنهٔ <Link target="_blank"  className="text-sky-500" href="https://ganjoor.net" title="ganjoor.net">گنجور نقطه نت</Link> انتقال پیدا کرد (سال ۸۶). هم&zwnj;اکنون منبع عمدهٔ آثار موجود در این مجموعه منابع آزاد در دسترس همگان است. فهرست منابع اشعار گنجور را به طور کلی در <Link target="_blank"  className="text-sky-500" href="/sources" title="منابع شعرهای گنجور">این صفحه</Link> و به طور جزئی در حاشیهٔ هر یک از اشعار نقل شده در این مجموعه می&zwnj;توانید مشاهده کنید. به حکم «<Link target="_blank"  className="text-sky-500" href="/bahar/4parebk/sh4">دگران کاشتند و ما خوردیم، ما بکاریم و دیگران بخورند</Link>» گنجور نیز اشعاری را که از منابع دیگر نقل کرده به صورت دوره&zwnj;ای و در قالب پایگاه داده&zwnj;های نرم&zwnj;افزار آزاد و رایگان <Link target="_blank"  className="text-sky-500" href="https://ganjoor.sourceforge.net">گنجور رومیزی</Link> منتشر می&zwnj;کند تا گروهها و علاقمندان دیگر بتوانند با استفاده از این مجموعه کارهای مشابه گنجور را انجام دهند و در مجموع گامهای بیشتری در جهت انتشار آزاد ادبیات فارسی برداشته شود.
                </p>
                <p className="mb-2 md:mb-4">
                    کل کار، یک سرگرمی شخصی با انگیزهٔ علاقه به آثار ادبی فارسی بوده است.  <span>گنجور وابسته به هیچ سازمان خصوصی یا دولتی&zwnj;ای نیست</span>. گنجور هیچ گونه فعالیت تجاری اعم از فروش برنامه یا داده&zwnj;ها یا کتاب یا تبلیغات نداشته و ندارد و محتوا و کدهای آن همیشه به رایگان در دسترس بوده است. از این جهت سایتها و برنامه&zwnj;های تجاری که از نام گنجور برای فروش محصولات خود سوء استفاده می&zwnj;کنند با گنجور ارتباطی ندارند. تنها دامنهٔ اینترنتی متعلق به گنجور ganjoor.net است و دامنه&zwnj;های مشابه به افراد و شرکتهای غیرمرتبط با گنجور تعلق داشته و گنجور مسئولیتی در قبال آنها ندارد. جهت ارائهٔ پیشنهاد یا اعلام نقص فنی می&zwnj;توانید از صفحهٔ <Link target="_blank"  className="text-sky-500" href="/contact">تماس با ما</Link> استفاده کنید.
                </p>
            </section>
        </>
    )
}

export default About;