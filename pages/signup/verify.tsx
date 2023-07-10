import { Form, Input, Alert, Row, Col } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Verify: React.FC = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const secret = searchParams?.get('secret');

    useEffect(() => {
        if (secret) {
            verify(secret);
        }
    }, [secret]);

    const [form] = Form.useForm();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const verify = async (secret: string) => {
        try {
            setLoading(true);
            setErrorMessage("");
            const response = await fetch(`https://api.ganjoor.net/api/users/verify?secret=${secret}`);

            const responseData = await response?.json();

            if (response?.status !== 200) {
                setErrorMessage(responseData);
            }
            if (response.status === 200) {
                router.push(`/signup/finalization?secret=${secret}&email=${responseData}`);
            }
            setLoading(false);
        } catch (err: any) {
            setErrorMessage(err?.message);
            setLoading(false);
        }
    }

    const onSubmit = async (values: { secret: string }) => {
        verify(values.secret);
    }

    return (
        <div className="py-4 md:py-12">
            {!!errorMessage && <Alert message={errorMessage} type="error" closable className="mb-4 vazir" />}
            <div className="mx-auto max-w-md mb-4 md:mb-8">
                <Form
                    form={form}
                    name="verification"
                    onFinish={onSubmit}
                    className="vazir"
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        className="mb-4 vazir"
                        name="secret"
                        label="رمز دریافتی"
                        rules={[{ required: true, message: "لطفاً رمز دریافتی را وارد کنید." }]}
                    >
                        <Input
                            className="w-full placeholder:vazir placeholder:text-right rounded text-left"
                            placeholder="رمز دریافتی "
                            size="large"
                            dir="ltr"
                        />
                    </Form.Item>
                    <Row gutter={[20, 20]}>
                        <Col flex='1 1 33%'>
                            <Link
                                href={'/signup'}
                                className="my-2 w-full bg-gray-400 hover:bg-gray-500 transition-all text-white block flex justify-center items-center vazir hover:text-white focus:text-white active:text-white rounded h-11 text-lg"
                            >
                                مرحله قبل
                            </Link>
                        </Col>
                        <Col flex='1 1 67%'>
                            <button
                                disabled={!!loading}
                                type="submit"
                                className="my-2 w-full bg-amber-500 text-white vazir hover:text-white hover:bg-blue-600 transition-all focus:text-white active:text-white rounded h-11 text-lg"
                            >
                                ادامه {!!loading && <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" />}

                            </button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="pb-4 md:pb-10">
                <strong className="mb-4 block">لطفاً به نکات زیر توجه کنید:</strong>
                <ul className='text-justify list-inside list-disc pr-4 md:pr-10'>
                    <li className="mb-3">
                        لطفاً پست الکترونیکی خود را بررسی کنید. در صورتی که نشانی پست الکترونیکی خود را درست وارد کرده باشید نامه‌ای از گنجور دریافت کرده‌اید که حاوی یک رمز است.
                    </li>
                    <li className="mb-3">
                        رمز دریافتی را در کادر بالا وارد کرده، روی «ادامه» بزنید.
                    </li>
                    <li className="mb-3">
                        تذکر: ممکن است نامه به پوشهٔ اسپم منتقل شده باشد.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Verify;