import React, { Component, useState } from 'react';
import './App.css';

// Navigation
import { BrowserRouter as Router, Route, Switch, NavLink as RRNavLink }  from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarToggler, NavLink } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

// Components
import { About, Archive, Article, ProductPage } from './component';

class NavItem extends Component {
  render() {
    const to = this.props.to;
    const title = this.props.title;
    return <NavLink exact to={to} tag={RRNavLink}>{title}</NavLink>
  }
}

function AppNavBar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggle = () => setNavbarOpen(!navbarOpen);

  const [articleOpen, setArticleOpen] = useState(false);
  const articleToggle = () => setArticleOpen(!articleOpen);

  return (
    <header>
      <Navbar expand="sm" color="light" light>
        <NavbarToggler onClick={navbarToggle} className="mr-2" />
        <Collapse isOpen={navbarOpen} navbar>
          <Nav navbar>
            <NavItem to="/" title="Archive" />
            <Dropdown nav isOpen={articleOpen} toggle={articleToggle}>
              <DropdownToggle nav caret>
                Articles
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem><NavItem to="/articles/2019review" title="2019 Review" /></DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem to="/about" title="About"/>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  )
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
              <Route path="/articles/:article?"
                render={p => <Article key="2019review"
                  source="/articles/2019-review/2019-review.ipynb" {...p} />} />
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
