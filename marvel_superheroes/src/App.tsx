import React from "react"
import "./App.css"
import ComicsPage from "./components/ComicsPage/ComicsPage"
import HomePage from "./components/HomePage/HomePage"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import { BrowserRouter, Switch, Route } from "react-router-dom"

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/comics/:id" component={ComicsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
