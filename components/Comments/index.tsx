import { Comment } from '../../Types';
import CommentItem from './CommentItem';
import {useAppSelector} from '../../hooks/use-store';
import NewComment from './NewComment'; 

type Props = {
    comments: Comment[],
    poemId: number
}

const Comments: React.FC<Props> = props => {
    
    const user = useAppSelector(state => state.userData?.user);
    
    if(!props.comments?.length && !user){
        return null;
    } 

    return (
        <div className='text-center px-2 md:px-4 bg-amber-50 border border-amber-200 pt-2 md:pt-6 mt-6 md:mt-10 rounded'>
            <h4 className="mb-2 md:mb-6 text-lg font-semibold">حاشیه ها</h4>
            {props.comments.map(comment => <CommentItem comment={comment} key={comment.id} />)}
            {!!user && <NewComment poemId={props.poemId} />}
        </div>
    )
}

export default Comments;