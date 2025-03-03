import React, { Component } from "react";
import "./App.css";

// Navigation
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import { About, Archive, Article, ProductPage } from "./component";
import { AppFooter, AppNavBar } from "./component";
import {
  Ideas1,
  Ideas2,
  Ideas3,
  Ideas4,
  Ideas5,
  Ideas6,
  Ideas7,
} from "./component/collections";

class App extends Component {
  componentDidMount() {
    this.props.doRetrieve();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.archive.data == null) nextProps.doRetrieve();
  }

  render() {
    const latestEntry = this.props.archive
      ? this.props.archive.data.full[0]
      : null;
    return (
      <Router>
        <div>
          <Route component={AppNavBar} />
          <main role="main" className="container-fluid">
            <div key="gap">&nbsp;</div>
            <Switch>
              <Route
                exact
                path="/"
                render={(p) => <Archive key="archive" {...p} />}
              />
              <Route
                path="/articles/2019review"
                render={(p) => (
                  <Article
                    key="2019review"
                    source="/articles/2019-review/2019-review.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2020review"
                render={(p) => (
                  <Article
                    key="2020review"
                    source="/articles/2020-review/2020-review.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2020fabrics"
                render={(p) => (
                  <Article
                    key="2020fabrics"
                    source="/articles/2020-review/2020-fabrics.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2021review"
                render={(p) => (
                  <Article
                    key="2021review"
                    source="/articles/2021-review/2021-review.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2021fabrics"
                render={(p) => (
                  <Article
                    key="2021fabrics"
                    source="/articles/2021-review/2021-fabrics.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2022review"
                render={(p) => (
                  <Article
                    key="2022review"
                    source="/articles/2022-review/2022-review.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2022fabrics"
                render={(p) => (
                  <Article
                    key="2022fabrics"
                    source="/articles/2022-review/2022-fabrics.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2023fabrics"
                render={(p) => (
                  <Article
                    key="2023fabrics"
                    source="/articles/2023-review/2023-fabrics.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                path="/articles/2024fabrics"
                render={(p) => (
                  <Article
                    key="2024fabrics"
                    source="/articles/2024-review/2024-fabrics.ipynb"
                    {...p}
                  />
                )}
              />
              <Route
                exact
                path="/about"
                render={(p) => (
                  <About
                    key="about"
                    source="/pages/about.md"
                    latestEntry={latestEntry}
                    {...p}
                  />
                )}
              />
              <Route
                exact
                path="/collections"
                render={(p) => (
                  <About
                    key="about"
                    source="/pages/about.md"
                    latestEntry={latestEntry}
                    {...p}
                  />
                )}
              />
              <Route
                exact
                path="/collections/ideas/ideas-1"
                render={() => <Ideas1 />}
              />
              <Route
                exact
                path="/collections/ideas/ideas-2"
                render={() => <Ideas2 />}
              />
              <Route
                exact
                path="/collections/ideas/ideas-3"
                render={() => <Ideas3 />}
              />
              <Route
                exact
                path="/collections/ideas/ideas-4"
                render={() => <Ideas4 />}
              />
              <Route
                exact
                path="/collections/ideas/ideas-5"
                render={() => <Ideas5 />}
              />
              <Route
                exact
                path="/collections/ideas/ideas-6"
                render={() => <Ideas6 />}
              />
              <Route
                exact
                path="/collections/ideas/ideas-7"
                render={() => <Ideas7 />}
              />
              <Route
                exact
                path="/product/:product"
                render={(p) => (
                  <ProductPage
                    key="product"
                    product={p.match.params.product}
                    {...p}
                  />
                )}
              />
            </Switch>
          </main>
          <Route component={AppFooter} />
        </div>
      </Router>
    );
  }
}

export default App;
