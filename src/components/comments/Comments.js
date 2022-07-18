import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useHttp from "../../hooks/use-http"
import { getAllComments } from "../../lib/api"
import LoadingSpinner from "../ui/LoadingSpinner"
import CommentsList from "../comments/CommentsList"

import classes from "./Comments.module.css"
import NewCommentForm from "./NewCommentForm"

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false)
  const params = useParams()

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)
  useEffect(() => {
    sendRequest(params.quoteId)
  }, [params.quoteId, sendRequest])

  const addedCommentHandler = useCallback(() => {
    sendRequest(params.quoteId)
  }, [sendRequest, params.quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true)
  }

  let comments
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />
  }

  if (
    status === "completed" &&
    !loadedComments &&
    loadedComments.length === 0
  ) {
    comments = <p>No comments were added yet!!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {comments}
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddComment={addedCommentHandler}
          quoteId={params.quoteId}
        />
      )}
    </section>
  )
}

export default Comments
