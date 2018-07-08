import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
  import './App.css';

class AppHeader extends Component {
  render() {
    return (
      <div className="App">

        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">TrackMyStuff</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
               <NavLink href="/stuff/list">List stuff</NavLink>
             </NavItem>
             <NavItem>
                <NavLink href="/stuff/new">New stuff</NavLink>
              </NavItem>
            </Nav>
        </Navbar>

      </div>
    );
  }
}

export default AppHeader;
