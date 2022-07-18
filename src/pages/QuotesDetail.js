import React, { useEffect } from "react"
import { Link, Route, useParams, useRouteMatch } from "react-router-dom"
import Comments from "../components/comments/Comments"
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import useHttp from "../hooks/use-http"
import { getSingleQuote } from "../lib/api"

// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     pos: "1",
//     author: "T.S Eliot",
//     text: "Every moment is a fresh beginning.",
//   },
//   {
//     id: "q2",
//     pos: "2",
//     author: "Anaïs Nin",
//     text: "Good things happen to those who hustle.",
//   },
//   {
//     id: "q3",
//     pos: "3",
//     author: "Anonymous",
//     text: "What consumes your mind controls your life.",
//   },
//   {
//     id: "q4",
//     pos: "4",
//     author: "Jessica N. S. Yourko",
//     text: "Have enough courage to start and enough heart to finish.",
//   },
//   {
//     id: "q5",
//     pos: "5",
//     author: "Robert H. Schiller",
//     text: "Problems are not stop signs, they are guidelines.",
//   },
// ]

const QuotesDetail = () => {
  const match = useRouteMatch()
  console.log(match)
  const params = useParams()
  const {
    sendRequest,
    data: loadedQuote,
    status,
    error,
  } = useHttp(getSingleQuote)

  useEffect(() => {
    sendRequest(params.quoteId)
  }, [sendRequest, params.quoteId])

  // const selectedQuote = DUMMY_QUOTES.find(
  //   (quote) => quote.id === params.quoteId //quoteId is the dynamic part of the url which we defined in the Route definition in App.js
  // )

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

  if (!loadedQuote) {
    return <p>No quote found!</p>
  }

  return (
    <React.Fragment>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>

      {/* <Route path="/quotes/:quoteId/comments"> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </React.Fragment>
  )
}

export default QuotesDetail
