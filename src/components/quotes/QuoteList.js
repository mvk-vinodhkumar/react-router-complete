import { Fragment } from "react"
import { useHistory, useLocation } from "react-router-dom"
import QuoteItem from "./QuoteItem"
import classes from "./QuoteList.module.css"

//Helper function
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1 //q2>q1 ? 1
    } else {
      return quoteA.id < quoteB.id ? 1 : -1 //q2<q1 ? -1
    }
  })
}

const QuoteList = (props) => {
  const history = useHistory() //access to change and manage url
  const location = useLocation() //access to currently loaded url

  const queryParams = new URLSearchParams(location.search) //Constructor function

  const isSortAscending = queryParams.get("sort") === "asc"
  const sortedQuotes = sortQuotes(props.quotes, isSortAscending)
  const changeSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortAscending ? "desc" : "asc"}`,
    })

    // history.push(
    //   `${location.pathname}?sort=${isSortAscending ? "desc" : "asc"}`
    // ) //Also helpes in re-rendering the component
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {isSortAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote, index) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            pos={index + 1}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default QuoteList
