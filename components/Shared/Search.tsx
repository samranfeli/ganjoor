import { Input, Button, Form } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

type Props = {
    placeholder?: string;
}

const Search: React.FC<Props> = props => {

    const router = useRouter();

    const onSubmit = (values:{text:string}) => {
        if(!values.text) return;
        router.push(`/search?s=${values.text}`)
    }

    return (
        <Form
            name="basic"
            onFinish={onSubmit}
            className="relative"
            autoComplete="off"
        >
            <Form.Item className="mb-0" name="text">
                <Input className="w-full bg-gray-600 h-12 text-white focus:bg-gray-700 placeholder:text-white" placeholder={props.placeholder || ""} />
            </Form.Item>

            <Button
                htmlType="submit"
                className="absolute top-0 left-0 h-12 w-12 p-0 border-0"
            >
                <SearchOutlined className="text-2xl text-white leading-5" />
            </Button>
        </Form>
    )
}

export default Search;