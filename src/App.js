import React, { Component } from 'react';
import './App.css';

// Navigation
import { BrowserRouter as Router, Route, Switch, NavLink as RRNavLink }  from 'react-router-dom'
import { NavLink } from 'reactstrap';

// Components
import { About, Archive, ProductPage } from './component';

class NavItem extends Component {
  render() {
    const to = this.props.to;
    const title = this.props.title;
    return <NavLink exact to={to} tag={RRNavLink}>{title}</NavLink>
  }
}

class AppNavBar extends Component {

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light justify-content-between">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <NavItem to="/" title="Archive" />
            </ul>
            <ul className="navbar-nav my-2">
              { // Add later
                // <NavItem to="/2017review" title="2017 Review"/>
              }
              <NavItem to="/about" title="About"/>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

class AppFooter extends Component {
  render() {
    return <footer className="footer">
      <div className="container">
        <span className="text-muted">
          <a href="http://illposed.com">Illposed</a>
        </span>
      </div>
    </footer>
  }
}

class App extends Component {

  componentDidMount() { this.props.doRetrieve() }

  componentWillReceiveProps(nextProps) {
    if (this.props.archive.data == null)
      nextProps.doRetrieve();
  }

  render() {
    const latestEntry = this.props.archive ?
      this.props.archive.data.full[0] :
      null;
    return (
      <Router>
        <div>
          <Route component={AppNavBar} />
          <main role="main" className="container-fluid">
            <div key="gap">&nbsp;</div>
            <Switch>
              <Route exact path="/"
                render={p => <Archive key="archive" {...p} />} />
              <Route exact path="/about"
                render={p => <About key="about"
                  source="/pages/about.md" latestEntry={latestEntry} {...p} />} /> />
              <Route exact path="/product/:product"
                render={p => <ProductPage key="product"
                  product={p.match.params.product} {...p} />} /> />
            </Switch>
          </main>
          <Route component={AppFooter} />
        </div>
      </Router>
    );
  }
}

export default App;
