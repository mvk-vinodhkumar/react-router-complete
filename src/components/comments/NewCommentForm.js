import { useEffect, useRef } from "react"
import useHttp from "../../hooks/use-http"
import { addComment } from "../../lib/api"
import LoadingSpinner from "../ui/LoadingSpinner"
import classes from "./NewCommentForm.module.css"

const NewCommentForm = (props) => {
  const commentTextRef = useRef()
  const { sendRequest, status, error } = useHttp(addComment)

  useEffect(() => {
    if (status === "completed" && !error) {
      props.onAddComment()
    }
  }, [status, error, props.onAddComment])

  const submitFormHandler = (event) => {
    event.preventDefault()
    const enteredComment = commentTextRef.current.value

    // enteredComment validation if required

    sendRequest({
      commentData: { text: enteredComment },
      quoteId: props.quoteId,
    })
    commentTextRef.current.value = ""
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        {/* onSubmit={submitFormHandler} */}
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  )
}

export default NewCommentForm
