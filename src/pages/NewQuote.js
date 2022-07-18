import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import QuoteForm from "../components/quotes/QuoteForm"
import useHttp from "../hooks/use-http"
import { addQuote } from "../lib/api"

const NewQuote = () => {
  const { sendRequest, status, error } = useHttp(addQuote)
  const history = useHistory()

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes") //Allows to go back
      // history.replace("/quotes") //Doesn't allow to go back
    }
  }, [status, error, history])

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData)
    console.log(quoteData)
  }

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  )
}

export default NewQuote
