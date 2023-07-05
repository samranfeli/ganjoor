import { Comment } from '../../Types';
import CommentItem from './CommentItem';

type Props = {
    comments: Comment[]
}

const Comments: React.FC<Props> = props => {
    if(!props.comments?.length){
        return null;
    }
    return (
        <div className='text-center px-2 md:px-4 bg-amber-50 border border-amber-200 pt-2 md:pt-6 mt-6 md:mt-10 rounded'>
            <h4 className="mb-2 md:mb-6 text-lg font-semibold">حاشیه ها</h4>
            {props.comments.map(comment => <CommentItem comment={comment} key={comment.id} />)}
        </div>
    )
}

export default Comments;