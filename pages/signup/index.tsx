import { Form, Input,Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Signup : React.FC = () => {
    const router = useRouter();

    const [form] = Form.useForm();

    const [captchaImageId, setCaptchaImageId] = useState<string | undefined>();
    const [errorMessage,setErrorMessage] = useState<string>("");

    useEffect(() => {

        try{
            const fetchCaptcha = async () => {
                const response = await fetch('https://api.ganjoor.net/api/users/captchaimage');
                const captcha = await response?.json();
                if (captcha) {
                    setCaptchaImageId(captcha);
                }
            }

            fetchCaptcha();

        }catch (err:any) {
            setErrorMessage(err?.message);
        }

    }, []);

    const onSubmit = async (values: { email: string, captchaValue: string }) => {
        try{
            setErrorMessage("");
            const response = await fetch("https://api.ganjoor.net/api/users/signup", {
                method: "POST",
                body: JSON.stringify({
                    callbackUrl: "https://ganjoor.vercel.app/signup/verify",
                    captchaImageId: captchaImageId,
                    captchaValue: values.captchaValue,
                    email: values.email,
                    clientAppName: "ganjoor",
                    language: 'fa-IR',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const responseData = await response?.json();
    
            if (response?.status === 400){
                setErrorMessage(responseData);
            }
            if (response.status === 200){
                router.push(`/signup/verify`);
            }
        }catch (err:any) {
            setErrorMessage(err?.message);
        }
    }

    return (
        <div className="py-4 md:py-12">
            {!!errorMessage && <Alert message={errorMessage} type="error" closable className="mb-4 vazir"  />}
            <div className="mx-auto max-w-md mb-4 md:mb-8">
                <Form
                    form={form}
                    name="signup"
                    onFinish={onSubmit}
                    className="vazir"
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        className="mb-4 vazir"
                        name="email"
                        label="پست الکترونیکی"
                        rules={[{ required: true, message: "لطفاً ایمیل خود را وارد کنید." },
                        { type: 'email', message: "لطفاً ایمیل خود را به درستی وارد کنید." }]}
                    >
                        <Input
                            className="w-full placeholder:vazir placeholder:text-right rounded text-left"
                            placeholder="پست الکترونیکی"
                            size="large"
                            dir="ltr"
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-4 vazir"
                        name="captchaimage"
                        label="تصویر امنیتی"
                    >
                        <div className="border border-gray-400 border-dashed w-full rounded h-10 bg-white flex items-center justify-center">
                            {captchaImageId ? <img
                                src={`https://api.ganjoor.net/api/rimages/${captchaImageId}.jpg`}
                                alt="تصویر امنیتی"
                                width={50}
                                height={30}
                            /> : <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" />}
                        </div>
                    </Form.Item>

                    <Form.Item
                        className="mb-4 vazir"
                        name="captchaValue"
                        label="عدد تصویر امنیتی"
                        rules={[{ required: true, message: "لطفاً عدد تصویر امنیتی را وارد کنید." }]}
                    >
                        <Input
                            className="w-full placeholder:vazir placeholder:text-right rounded text-left"
                            placeholder="عدد تصویر امنیتی"
                            size="large"
                            dir="ltr"
                        />
                    </Form.Item>
                    <button
                        type="submit"
                        className="my-2 w-full bg-amber-500 hover:bg-blue-600 transition-all text-white vazir hover:text-white focus:text-white active:text-white rounded h-11 text-lg"
                    >
                        ادامه
                    </button>

                </Form>
            </div>
            <div className="pb-4 md:pb-10">
                <strong className="mb-4 block">لطفاً به نکات زیر توجه کنید:</strong>
                <ul className='text-justify list-inside list-disc pr-4 md:pr-10'>
                    <li className="mb-3">
                        برای نام‌نویسی در گنجور نیاز به یک ایمیل دارید. فرایند نام‌نویسی با ارسال یک رمز به ایمیل (پست الکترونیکی) شما ادامه پیدا می‌کند و اگر ایمیلتان درست نباشد یا به آن دسترسی نداشته باشید نمی‌توانید در گنجور نام‌نویسی کنید.
                    </li>
                    <li className="mb-3">
                        تصویر امنیتی بالا کمک می‌کند بین کاربران واقعی و رباتها و برنامه‌های کامپیوتری تمایز قائل شویم. لطفاً عددی را که در تصویر امنیتی می‌بینید در کادر مربوطه وارد کنید:
                    </li>
                    <li className="mb-3">
                        اگر پیشتر در <Link className="text-sky-600" href="https://museum.ganjoor.net/" target="_blank"> گنجینهٔ گنجور </Link> یا  <Link className="text-sky-600" href="https://gaudiopanel.ganjoor.net/" target="_blank"> پیشخان خوانشگران گنجور </Link> نام‌نویسی کرده‌اید می‌توانید با همان اطلاعات کاربری در گنجور وارد شوید و نیاز به و امکان نام‌نویسی مجدد با همان ایمیل را ندارید.
                    </li>
                    <li className="mb-3">
                        رای مطالعهٔ اشعار نیازی به نام‌نویسی ندارید. نام‌نویسی برای درج حاشیه و مشارکت در سایت مورد نیاز است.
                    </li>
                    <li className="mb-3">
                        گنجور اطلاعاتی راجع به این که شما با نام کاربری خود چه صفحاتی را مطالعه می‌کنید جمع آوری نمی‌کند. برای اطمینان مفاد صفحهٔ <Link target="_blank" className="text-sky-600" href="/privacy"> حریم خصوصی </Link> را مطالعه بفرمایید.
                    </li>
                    <li className="mb-3">
                        بعد از نام‌نویسی امکان حذف حساب کاربری خود را دارید. با این کار اطلاعات خاص شما مثل حاشیه‌ها و خوانش‌ها حذف می‌شود و مشارکت‌های شما مثل ویرایش‌ها و ... به نام کاربر سیستم گنجور ثبت می‌شود.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Signup;