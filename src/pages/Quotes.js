import React, { useEffect } from "react"
import NoQuotesFound from "../components/quotes/NoQuotesFound"
import QuoteList from "../components/quotes/QuoteList"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import useHttp from "../hooks/use-http"
import { getAllQuotes } from "../lib/api"

// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "T.S Eliot",
//     text: "Every moment is a fresh beginning.",
//   },
//   {
//     id: "q2",
//     author: "Anaïs Nin",
//     text: "Good things happen to those who hustle.",
//   },
//   {
//     id: "q3",
//     author: "Anonymous",
//     text: "What consumes your mind controls your life.",
//   },
//   {
//     id: "q4",
//     author: "Jessica N. S. Yourko",
//     text: "Have enough courage to start and enough heart to finish.",
//   },
//   {
//     id: "q5",
//     author: "Robert H. Schiller",
//     text: "Problems are not stop signs, they are guidelines.",
//   },
// ]

const Quotes = () => {
  const {
    sendRequest,
    error,
    status,
    data: loadedQuotes,
  } = useHttp(getAllQuotes)

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <div className="centered focused">{error}</div>
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />
  }

  if (status === "completed" && loadedQuotes)
    return <QuoteList quotes={loadedQuotes} />
}

export default Quotes
