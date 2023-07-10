import { Form, Input, Alert, Row, Col } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import { useAppDispatch } from "@/hooks/use-store";
import { setUserData } from "@/store/userSlice";

const Login : React.FC = () => {
    const [form] = Form.useForm();

    const [loading,setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch ();

    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string>("");

    type FormValues = {
        userName: string;
        password: string;
    }

    const onSubmit = async (values: FormValues) => {
        try {
            setLoading(true);
            setErrorMessage("");
            const response = await fetch("https://api.ganjoor.net/api/users/login", {
                method: "POST",
                body: JSON.stringify({
                        username: values.userName,
                        password: values.password,
                        clientAppName: "ganjoor",
                        language: 'fa-IR',
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

                localStorage.setItem("G-sessionId", responseData.sessionId);

                dispatch(setUserData(responseData));
                router.push(`/profile`);
            } else{
                setLoading(false);
            }
        } catch (err: any) {
            setErrorMessage(err?.message);
            setLoading(false);
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

                    <Form.Item className="hidden" >
                        <Input type='password' />
                    </Form.Item>


                    <Form.Item
                        className="mb-4 vazir"
                        name="userName"
                        label="پست الکترونیکی"
                        rules={[{ required: true, message: "لطفاً پست الکترونیکی خود را وارد کنید." }]}
                    >
                        <Input
                            className="w-full vazir placeholder:vazir placeholder:text-right rounded text-left"
                            placeholder="پست الکترونیکی"
                            size="large"
                            dir="ltr"
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-4 vazir"
                        name="password"
                        label="گذرواژه"
                        rules={[{ required: true, message: "لطفاً گذرواژه خود را وارد کنید." }]}
                    >
                        <Input
                            className="w-full vazir placeholder:vazir placeholder:text-right rounded text-left"
                            placeholder="گذرواژه"
                            type="password"
                            size="large"
                            dir="ltr"
                        />
                    </Form.Item>

                    <button
                        type="submit"
                        className="my-2 w-full bg-amber-500 hover:bg-blue-600 transition-all text-white vazir hover:text-white focus:text-white active:text-white rounded h-11 text-lg"
                    >
                        ورود {!!loading && <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" />}
                    </button>

                    <Row gutter={[20,20]} justify='space-between' >
                        <Col>
                            <Link href='/signup' className="text-sky-600 vazir font-semibold"> نام نویسی </Link>
                        </Col>
                        <Col>
                            <Link href='/resetpassword' className="text-sky-600 vazir font-semibold"> فراموشی گذرواژه </Link>
                        </Col>

                    </Row>

                </Form>
            </div>
            <div className="pb-4 md:pb-10">
            اگر پیشتر در <Link className="text-sky-600" href="https://museum.ganjoor.net/" target="_blank"> گنجینهٔ گنجور </Link> یا  <Link className="text-sky-600" href="https://gaudiopanel.ganjoor.net/" target="_blank"> پیشخان خوانشگران گنجور </Link> نام‌نویسی کرده‌اید می‌توانید با همان اطلاعات کاربری در گنجور وارد شوید و نیاز به و امکان نام‌نویسی مجدد با همان ایمیل را ندارید.
            </div>
        </div>
    )
}

export default Login;