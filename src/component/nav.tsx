import React, { useState } from "react";

// Navigation
import { NavLink as RRNavLink } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarToggler, NavLink } from "reactstrap";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

// Images
import logo from "../oia.svg";

type NavItemProps = {
  to: string;
  title: React.ReactNode;
};

function NavItem(props: NavItemProps) {
  const to = props.to;
  const title = props.title;
  return (
    <NavLink exact to={to} tag={RRNavLink}>
      {title}
    </NavLink>
  );
}

function AppNavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggle = () => setNavbarOpen(!navbarOpen);

  const [articleOpen, setArticleOpen] = useState(false);
  const articleToggle = () => setArticleOpen(!articleOpen);

  const [collectionOpen, setCollectionOpen] = useState(false);
  const collectionToggle = () => setCollectionOpen(!collectionOpen);

  return (
    <header>
      <Navbar expand="sm" color="light" light>
        <NavbarToggler onClick={navbarToggle} className="mr-2" />
        <Collapse isOpen={navbarOpen} navbar>
          <Nav navbar>
            <NavItem
              to="/"
              title={<img src={logo} alt="OIA Logo" width="30" height="27" />}
            />
            <NavItem to="/" title="Archive" />
            <Dropdown nav isOpen={collectionOpen} toggle={collectionToggle}>
              <DropdownToggle nav caret>
                Collections
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavItem to="/collections/ideas/ideas-1" title="IDEAS 1" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/collections/ideas/ideas-2" title="IDEAS 2" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/collections/ideas/ideas-3" title="IDEAS 3" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/collections/ideas/ideas-4" title="IDEAS 4" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/collections/ideas/ideas-5" title="IDEAS 5" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/collections/ideas/ideas-6" title="IDEAS 6" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/collections/ideas/ideas-7" title="IDEAS 7" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown nav isOpen={articleOpen} toggle={articleToggle}>
              <DropdownToggle nav caret>
                Articles
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavItem to="/articles/2024fabrics" title="2024 Fabrics" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2023fabrics" title="2023 Fabrics" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2022review" title="2022 Review" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2022fabrics" title="2022 Fabrics" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2021review" title="2021 Review" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2021fabrics" title="2021 Fabrics" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2020review" title="2020 Review" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2020fabrics" title="2020 Fabrics" />
                </DropdownItem>
                <DropdownItem>
                  <NavItem to="/articles/2019review" title="2019 Review" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem to="/about" title="About" />
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

function AppFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">
          <a href="http://illposed.com">Illposed</a>
        </span>
      </div>
    </footer>
  );
}

export { AppFooter, AppNavBar };
