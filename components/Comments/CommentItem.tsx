import Link from 'next/link';
import parse from 'html-react-parser';
import moment from 'moment-jalaali';

import { Comment } from '../../Types';

type Props = {
    comment: Comment;
    isReply?: boolean;
}

const CommentItem: React.FC<Props> = props => {
    const { comment } = props;
    return (
        <div key={comment.id} className={`border border-gray-200 bg-white p-2 md:p-3 text-justify rounded my-2 md:my-4 ${props.isReply ? "mr-1 md:mr-8" : ""}`}>

            <div className='md:flex md:flex-row-reverse justify-between mb-3'>
                <div dir="ltr" className='text-gray-400 text-sm'>
                    <i className="zmdi zmdi-calendar align-middle" /> <span>{moment(comment.commentDate).format("jYYYY/jMM/DD")}</span>
                    <i className="zmdi zmdi-time align-middle ml-4" /> <span>{moment(comment.commentDate).format("HH:MM")}</span>
                </div>
                <div className='font-semibold'>
                     <i className="zmdi zmdi-account-circle text-4xl text-orange-400 align-middle ml-2" /> 
                     {comment.authorUrl ? <Link href={comment.authorUrl} className="text-sky-600">{comment.authorName}</Link>:comment.authorName}
                </div>
            </div>

            {comment.htmlComment && parse(comment.htmlComment)}

            {comment.replies.map(reply => <CommentItem isReply comment={reply} key={reply.id} />)}

        </div>
    )
}

export default CommentItem;