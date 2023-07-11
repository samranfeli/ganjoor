import { Alert, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/hooks/use-store";
import { UserData } from "@/Types";

const UserInformation: React.FC = () => {

    const [form] = Form.useForm();
    const { TextArea } = Input;
    const userData: UserData | undefined = useAppSelector(state => state.userData);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (userData) {
            form.setFieldsValue({
                firstName: userData.user.firstName,
                sureName: userData.user.sureName,
                nickName: userData.user.nickName,
                email: userData.user.email,
                website: userData.user.website
            })
        }
    }, [userData,form]);

    type formValues = {
        firstName: string;
        sureName: string;
        nickName: string;
        website: string;
        bio: string;
        email: string;
    }

    const onSubmit = async (values: formValues) => {
        try {
            setErrorMessage("");
            setCompleted(false);
            setLoading(true);
            const response = await fetch(`https://api.ganjoor.net/api/users/${userData!.user.id}`, {
                method: "PUT",
                body: JSON.stringify(
                    {
                        id: userData!.user.id,
                        username: userData!.user.username,
                        email: userData!.user.email,
                        phoneNumber: "",
                        firstName: values.firstName,
                        sureName: values.sureName,
                        status: userData?.user.status,
                        rImageId: userData?.user.rImageId,
                        nickName: values.nickName,
                        bio: values.bio,
                        website: values.website,
                        emailConfirmed: userData!.user.emailConfirmed,
                        isAdmin: false,
                    }
                ),
                headers: {
                    'Content-Type': 'application/json',
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
            {!!completed && <Alert message="اطلاعات با موفقیت ذخیره شد!" type="success" closable className="mb-4 vazir" />}

            <Form
                form={form}
                name="update user"
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
                    name="nickName"
                    label="نام مستعار (نمایش در حاشیه ها)"
                    rules={[{ required: true, message: "لطفاً نام مستعار خود را وارد کنید." }]}
                >
                    <Input
                        className="w-full placeholder:vazir rounded"
                        placeholder="نام مستعار"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    className="mb-4 vazir"
                    name="email"
                    label="پست الکترونیکی"
                >
                    <Input
                        disabled
                        readOnly
                        className="w-full vazir placeholder:vazir rounded"
                        size="large"
                    />
                </Form.Item>


                <Form.Item
                    className="mb-4 vazir"
                    name="website"
                    label="وبگاه"
                >
                    <Input
                        dir="ltr"
                        className="w-full placeholder:vazir placeholder:text-right rounded text-left"
                        placeholder="وبگاه"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    className="mb-4 vazir"
                    name="bio"
                    label="درباره من"
                >
                    <TextArea
                        rows={4}
                        className="w-full placeholder:vazir rounded"
                        placeholder="درباره من"
                        size="large"
                    />
                </Form.Item>

                <div className="text-left">
                    <button
                        type="submit"
                        className="my-2 w-32 bg-amber-500 md:hover:bg-amber-600 transition-all text-white vazir md:hover:text-white focus:text-white active:text-white rounded h-11 text-lg"
                    >
                        ذخیره {!!loading && <i className="zmdi zmdi-refresh animate-spin mr-2 align-middle text-2xl w-4" />}
                    </button>
                </div>


            </Form>
        </div>
    )
}

export default UserInformation;