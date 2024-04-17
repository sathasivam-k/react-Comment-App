// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comments, initialClassName, isLiked, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassname = isLiked ? 'active' : ''
  const likeButtonImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {isLikedFn} = props
    isLikedFn(id)
  }

  const onClickDelete = () => {
    const {deleteFn} = props
    deleteFn(id)
  }

  return (
    <li>
      <p className={initialClassName}>{initial}</p>
      <p>{name}</p>
      <p>{postedTime} ago</p>
      <p>{comments}</p>
      <img src={likeButtonImg} />
      <button type="button" className={likeTextClassname} onClick={onClickLike}>
        Like
      </button>
      <button type="button" onClick={onClickDelete} data-testid="delete">
        <img src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png" />
      </button>
    </li>
  )
}

export default CommentItem
