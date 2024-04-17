import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comments: '', commentList: []}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComments = event => {
    this.setState({comments: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comments} = this.state
    const initialBackgroundClassNames = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newCommentList = {
      id: v4(),
      name,
      comment: comments,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundClassNames,
    }

    this.state(prevState => ({
      commentList: [...prevState.commentList, newCommentList],
      name: '',
      comments: '',
    }))
  }

  deleteFn = id => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(eachObject => eachObject.id !== id),
    })
  }

  isLikedFn = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachObject => {
        if (id === eachObject.id) {
          return {...eachObject, isLiked: !eachObject.isLiked}
        }
        return eachObject
      }),
    }))
  }

  renderCommentList = () => {
    const {commentList} = this.state

    return commentList.map(eachObject => (
      <CommentItem
        key={eachObject.id}
        commentDetails={eachObject}
        isLikedFn={this.isLikedFn}
        deleteFn={this.deleteFn}
      />
    ))
  }

  render() {
    const {name, comments, commentList} = this.state
    return (
      <div>
        <h1>Comments</h1>
        <form onSubmit={this.onAddComment}>
          <p>Say something about 4.0 technologies</p>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={this.onChangeName}
          />
          <textarea
            rows="6"
            placeholder="Your Comment"
            value={comments}
            onChange={this.onChangeComments}
          />
          <button type="submit">Add Comment</button>
        </form>
        <div>
          <ul>{this.renderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
