import React from "react"
import { Link, NavLink } from "react-router-dom"
import classes from "./MainNavigation.module.css"

const MainNavigation = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/quotes" className={classes.logo}>
          DEMO
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/quotes" activeClassName={classes.active}>
                All Quotes
              </NavLink>
            </li>
            <li>
              <NavLink to="/new-quote" activeClassName={classes.active}>
                Add a Quote
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  )
}

export default MainNavigation
