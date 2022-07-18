import React from "react"
import { useRef, useState } from "react"
import { Prompt } from "react-router-dom"
import Card from "../ui/Card"
import LoadingSpinner from "../ui/LoadingSpinner"
import classes from "./QuoteForm.module.css"

const QuoteForm = (props) => {
  const [isEnteringForm, setIsEnteringForm] = useState(false)
  const authorInputRef = useRef()
  const textInputRef = useRef()

  function submitFormHandler(event) {
    event.preventDefault()

    const enteredAuthor = authorInputRef.current.value
    const enteredText = textInputRef.current.value

    //Validation of form's entered data can be done here

    props.onAddQuote({ author: enteredAuthor, text: enteredText })
    authorInputRef.current.value = ""
    textInputRef.current.value = ""
  }

  const formFocusHandler = () => {
    setIsEnteringForm(true)
  }
  const formFinishedEnteringHandler = () => {
    setIsEnteringForm(false)
  }

  return (
    <React.Fragment>
      <Prompt
        when={isEnteringForm}
        message={(location) =>
          "Are you sure that you want to leave this page? All your entered data(if any) will be cleared!"
        }
      />

      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={formFinishedEnteringHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  )
}

export default QuoteForm
