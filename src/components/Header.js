import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
    return (
          <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                      <Container>
                            <LinkContainer to="/">
                                  <Navbar.Brand> AnnaShop </Navbar.Brand>
                            </LinkContainer>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                  <Nav className="mr-auto">
                                        <LinkContainer to="/">
                                              <Nav.Link>
                                                    {" "}
                                                    <i className="fas fa-home">
                                                          {" "}
                                                    </i>
                                                    Home{" "}
                                              </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/cart">
                                              <Nav.Link>
                                                    <i className="fas fa-shopping-cart">
                                                          {" "}
                                                    </i>{" "}
                                                    Cart{" "}
                                              </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/login">
                                              <Nav.Link>
                                                    <i className="fas fa-user">
                                                          {" "}
                                                    </i>{" "}
                                                    Login{" "}
                                              </Nav.Link>
                                        </LinkContainer>
                                  </Nav>{" "}
                            </Navbar.Collapse>{" "}
                      </Container>{" "}
                </Navbar>{" "}
          </header>
    );
}

export default Header;