import { Redirect, Route, Switch } from "react-router-dom"
import Layout from "./components/layout/Layout"
import NewQuote from "./pages/NewQuote"
import NotFound from "./pages/NotFound"
import Quotes from "./pages/Quotes"
import QuotesDetail from "./pages/QuotesDetail"

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <Quotes />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuotesDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
