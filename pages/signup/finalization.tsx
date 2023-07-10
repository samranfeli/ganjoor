import { Form, Input, Alert } from "antd";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Verify: React.FC = () => {

    const [form] = Form.useForm();

    const router = useRouter();

    const searchParams = useSearchParams();
    const secret = searchParams?.get('secret');
    const emailAddress = searchParams?.get('email');

    const [errorMessage, setErrorMessage] = useState<string>("");

    type FormValues = {
        firstName: string;
        sureName: string;
        password: string;
    }

    const onSubmit = async (values: FormValues) => {
        try {
            setErrorMessage("");
            const response = await fetch("https://api.ganjoor.net/api/users/finalizesignup", {
                method: "POST",
                body: JSON.stringify({
                    email: emailAddress,
                    firstName: values.firstName,
                    password: values.password,
                    secret: secret,
                    sureName: values.sureName
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response?.json();

            if (response?.status === 400) {
                setErrorMessage(responseData);
            }
            if (response.status === 200) {
                router.push(`/login`);
            }
        } catch (err: any) {
            setErrorMessage(err?.message);
        }
    }

    return (
        <div className="py-4 md:py-12">
            {!!errorMessage && <Alert message={errorMessage} type="error" closable className="mb-4 vazir" />}
            <div className="mx-auto max-w-md mb-4 md:mb-8">
                <Form
                    form={form}
                    name="finalization"
                    onFinish={onSubmit}
                    className="vazir"
                    autoComplete="off"
                    layout="vertical"
                >
                    <input type="password" className="hidden" />

                    <Form.Item
                        className="mb-4 vazir"
                        name="firstName"
                        label="نام"
                        rules={[{ required: true, message: "لطفاً نام خود را وارد کنید." }]}
                    >
                        <Input
                            className="w-full vazir placeholder:vazir rounded"
                            placeholder="نام"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-4 vazir"
                        name="sureName"
                        label="نام خانوادگی"
                        rules={[{ required: true, message: "لطفاً نام خانوادگی خود را وارد کنید." }]}
                    >
                        <Input
                            className="w-full vazir placeholder:vazir rounded"
                            placeholder="نام خانوادگی"
                            size="large"
                        />
                    </Form.Item>


                    <Form.Item
                        className="mb-4 vazir"
                        name="password"
                        label="گذرواژه"
                        rules={[{ required: true, message: "لطفاً گذرواژه خود را وارد کنید." }]}
                    >
                        <Input
                            dir="ltr"
                            type="password"
                            className="w-full placeholder:vazir placeholder:text-right rounded text-left"
                            placeholder="گذرواژه"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        className="mb-4 vazir"
                        name="repeatPassword"
                        dependencies={['password']}
                        label="تکرار گذرواژه"
                        rules={[
                            {
                                required: true,
                                message: 'لطفاً گذرواژه خود را دوباره وارد کنید.',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('تکرار گذرواژه با گذرواژه مطابقت ندارد.'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            dir="ltr"
                            type="password"
                            className="w-full placeholder:vazir placeholder:text-right rounded text-left"
                            placeholder="گذرواژه"
                            size="large"
                        />
                    </Form.Item>

                    <button
                        type="submit"
                        className="my-2 w-full bg-amber-500 md:hover:bg-amber-600 transition-all text-white vazir md:hover:text-white focus:text-white active:text-white rounded h-11 text-lg"
                    >
                        ادامه
                    </button>

                </Form>
            </div>
            <div className="pb-4 md:pb-10">
                <strong className="mb-4 block">لطفاً به نکات زیر توجه کنید:</strong>
                <ul className='text-justify list-inside list-disc pr-4 md:pr-10'>
                    <li className="mb-3">
                        گذرواژه باید دست کم شامل ۶ حرف باشد و از ترکیبی از اعداد و حروف انگلیسی تشکیل شده باشد.
                    </li>
                    <li className="mb-3">
                        حروف و اعداد نباید تکراری باشند و وجود حداقل یک عدد و یک حرف کوچک انگلیسی در گذرواژه الزامی است.
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default Verify;