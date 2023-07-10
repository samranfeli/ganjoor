import { Button, Form, Input, InputRef } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useRef } from "react";

type Props = {
    placeholder?: string;
}

const SearchForm: React.FC<Props> = props => {

    const router = useRouter();
    const searchInputRef = useRef<InputRef>(null);

    const [form] = Form.useForm();

    const onSubmit = (values: { text: string }) => {
        if (!values.text) return;
        router.push(`/search?s=${values.text}`);
        form.setFieldsValue({
            ["text"]: ""
        });
        searchInputRef.current!.blur();
    }

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onSubmit}
            className="relative"
            autoComplete="off"
        >
            <Form.Item className="mb-0" name="text">
                <Input
                    className="w-full bg-white h-8 md:h-10 px-4 rounded placeholder:vazir md:text-base"
                    placeholder={props.placeholder || ""}
                    ref={searchInputRef}
                />
            </Form.Item>

            <Button
                htmlType="submit"
                className="absolute top-0 left-0  h-8 w-10 md:h-10 md:w-10 p-0 border-0"
            >
                <SearchOutlined className="text-xl leading-5" />
            </Button>
        </Form>
    )
}

export default SearchForm;