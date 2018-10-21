import React, { Component } from 'react';
import './App.css';

// Navigation
import { BrowserRouter as Router, Route, Switch, NavLink as RRNavLink }  from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarToggler, NavLink } from 'reactstrap';

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

  constructor(props) {
    super(props);
    this.onToggleNavbar = this.toggleNavbar.bind(this);
    this.state = { collapsed: true };
  }

  toggleNavbar() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <header>
        <Navbar expand="sm" light>
          <NavbarToggler onClick={this.onToggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem to="/" title="Archive" />
            </Nav>
            <Nav navbar className="ml-auto">
              { // Add later
                // <NavItem to="/2017review" title="2017 Review"/>
              }
              <NavItem to="/about" title="About"/>
            </Nav>
          </Collapse>
        </Navbar>
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
