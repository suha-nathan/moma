import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/pages/lib/userData";
import { readToken, removeToken } from "@/pages/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  async function submitSearch(e) {
    e.preventDefault();
    setIsExpanded(false);
    let queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?title=true&q=${searchField}`);
  }
  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="fixed-top navbar-dark bg-dark"
      >
        <Container>
          <Navbar.Brand>Suhasini</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  href="/"
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    href="/search"
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    href="/"
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    href="/"
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={submitSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchField(e.target.value);
                  }}
                />
                <Button variant="success" type="submit">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown
                  title={`${token.userName}`}
                  id="basic-nav-dropdown"
                >
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      href="/favourites"
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      href="/history"
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <NavDropdown.Item href="/login" onClick={() => logout()}>
                      Logout
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
