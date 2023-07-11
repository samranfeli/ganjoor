import { Alert, Form, Input } from "antd";
import { useState } from "react";
import Link from "next/link";

import { useAppSelector } from "@/hooks/use-store";
import { UserData } from "@/Types";

type Props = {
    poemId: number;
    inReplyToId?: number;
}

const NewComment: React.FC<Props> = props => {

    const [form] = Form.useForm();
    const { TextArea } = Input;

    const userData: UserData | undefined = useAppSelector(state => state.userData);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    type formValues = {
        htmlComment: string;
    }

    const onSubmit = async (values: formValues) => {
        try {
            setErrorMessage("");
            setCompleted(false);
            setLoading(true);
            const response = await fetch("https://api.ganjoor.net/api/ganjoor/comment", {
                method: "POST",
                body: JSON.stringify(
                    {
                        htmlComment: values.htmlComment,
                        poemId: props.poemId,
                        coupletIndex: -1,
                        inReplyToId: props?.inReplyToId || 0
                    }
                ),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData!.token}`
                }
            });

            if (response.status === 200) {
                setCompleted(true);
            }
            setLoading(false);

        } catch (err: any) {
            setErrorMessage(err?.message);
            setLoading(false);
        }
    }

    return (
        <div>
            {!!errorMessage && <Alert message={errorMessage} type="error" closable className="mb-4 vazir" />}
            {!!completed && <Alert message="حاشیه با موفقیت ثبت شد!" type="success" closable className="mb-4 vazir" />}

            <Form
                form={form}
                name="update user"
                onFinish={onSubmit}
                className="vazir"
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    className="mb-4 vazir"
                    name="htmlComment"
                    label="شما حاشیه بگذارید"
                    rules={[{ required: true, message: "لطفاً حاشیه را وارد کنید." }]}
                >
                    <TextArea
                        className="w-full vazir placeholder:vazir rounded"
                        placeholder="متن حاشیه"
                        size="large"
                        rows={4}
                    />
                </Form.Item>

                <div className="text-left">
                    <button
                        type="submit"
                        className="my-2 w-32 bg-amber-500 md:hover:bg-amber-600 transition-all text-white vazir md:hover:text-white focus:text-white active:text-white rounded h-11 text-lg"
                    >
                        درج حاشیه {!!loading && <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" />}
                    </button>
                </div>
            </Form>

            <div className="p-4 border text-justify bg-white rounded my-2 md:my-4">
                <p className="mb-2 md:mb-4">
                    لطفاً توجه داشته باشید که حاشیه&zwnj;ها برای ثبت نظرات شما راجع به <strong>همین شعر</strong> در نظر گرفته شده&zwnj;اند. در صورتی که در متن ثبت شدهٔ شعر در گنجور تفاوتهایی غیر از موارد قابل ویرایش یافتید، در مورد این شعر نظر یا احساس خاصی دارید یا مطلب خاصی در مورد آن می&zwnj;دانید یا دوست دارید دربارهٔ آن از دیگران چیزی بپرسید یک حاشیه برای آن بنویسید. <span className="text-rose-500">لطفاً از درج مطالب غیرمرتبط با متن این شعر خاص خودداری فرمایید</span> و حتی&zwnj;الامکان سعی کنید متن حاشیهٔ خود را با حروف فارسی درج کنید (حاشیه&zwnj;ها بازبینی خواهند شد و موارد غیرمرتبط و ناقض این نکات حذف می&zwnj;شوند).
                </p>
                <p className="mb-2 md:mb-4">
                    <span className="text-rose-500">بحثهای مذهبی و اعتقادی و ارجاع توهین&zwnj;آمیز نسبت به بزرگان ادیان و همینطور بحثهای قومیتی و توهین به فرهنگها و قومیتها و زبانها و بحثهای مرتبط با سیاست روز از مصادیق حاشیه&zwnj;های نامناسب محسوب می&zwnj;شوند.</span> لطفاً از هیچ قوم و مذهبی با صفات زننده صحبت نکنید و به خاطر داشته باشید که همهٔ اقوام (حتی ایرانی&zwnj;ها) در مقاطعی از تاریخ خود نسبت به اقوام دیگر بدوی محسوب می&zwnj;شده&zwnj;اند یا با تعدی به خاک همسایگان خود نسبت به آنها ستم روا داشته&zwnj;اند.
                </p>
                <p className="mb-2 md:mb-4">
                    در خطاب قرار دادن کاربران دیگر -چه به شکل خاص و چه به شکل عمومی- فارغ از این که در حاشیه&zwnj;هایشان نظرات معقولی را عنوان کرده&zwnj;اند یا خیر، رعایت احترام را بفرمایید. بی&zwnj;احترامی به دیگر کاربران (و البته شخصیتهای دیگر از جمله هنرمندان و ...) از مصادیق حاشیه&zwnj;های نامناسب محسوب می&zwnj;شود و فارغ از ارزش محتوایی، حاشیهٔ فرد خاطی به محض دریافت گزارش تخلف حذف خواهد شد.
                </p>
                <p className="mb-2 md:mb-4">
                    <span className="text-rose-500">تذکر مهم: </span>از آنجا که گنجور فاقد نیروی انسانی کافی برای رسیدگی به حجم بالایی از تخلف در حاشیه&zwnj;ها می&zwnj;باشد در صورت تکرار موارد عنوان شده توسط یک کاربر در حاشیه&zwnj;های متعدد، حساب کاربر متخلف بدون اخطار قبلی حذف خواهد شد. <span className="text-rose-500">ضمناً</span> فحاشی یا هر اقدامی که نشان دهد کاربر تلاش داشته با انجام آن عامدانه خرابکاری کند یا مشکلی برای سایت ایجاد کند حتی اگر فقط یک بار اتفاق بیفتد منجر به حذف حساب کاربر متخلف بدون اخطار قبلی خواهد شد.
                </p>
                <p className="mb-2 md:mb-4">
                    <span className="text-green-500">لطفاً در صورتی که تفاوتها را با استناد به نسخه&zwnj;های چاپی یا خطی گزارش می&zwnj;کنید این مسئله را با ذکر منبع مطرح نمایید. اشتباهات تایپی و غلطهای املایی را <Link href="/User/Editor?id=2137">ویرایش</Link> و تصحیح کنید.</span>
                </p>
            </div>
        </div>
    )
}

export default NewComment;