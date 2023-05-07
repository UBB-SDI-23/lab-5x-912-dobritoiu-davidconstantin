import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthorList from "./components/AuthorList";
import CreateAuthor from "./components/CreateAuthor";
import EditAuthor from "./components/EditAuthor";
import DeleteAuthor from "./components/DeleteAuthor";
import BookList from "./components/BookList";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
import DeleteBook from "./components/DeleteBook";
import AuthorPage from "./components/AuthorPage";
import BookPage from "./components/BookPage";
import LibraryList from "./components/LibraryList";
import CreateLibrary from "./components/CreateLibrary";
import LibraryPage from "./components/LibraryPage";
import EditLibrary from "./components/EditLibrary";
import DeleteLibrary from "./components/DeleteLibrary";
import LibraryBookList from "./components/LibraryBookList";
import CreateLibraryBook from "./components/CreateLibraryBook";
import LibraryBookPage from "./components/LibraryBookPage";
import EditLibraryBook from "./components/EditLibraryBook";
import DeleteLibraryBook from "./components/DeleteLibraryBook";
import FilteredAuthorList from "./components/FilteredAuthorList";
import TopAuthorList from "./components/TopAuthorList";
import TopLibraryList from "./components/TopLibraryList";
import Header from "./components/Header";
import RegisterPage from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import ConfirmPage from "./components/auth/Confirm";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <Router forceRefresh={true}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link reloadDocument className="nav-link" to="/authors">
                  Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link reloadDocument className="nav-link" to="/books">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link reloadDocument className="nav-link" to="/libraries">
                  Libraries
                </Link>
              </li>
              <li className="nav-item">
                <Link reloadDocument className="nav-link" to="/librarybook">
                  LibraryBooks
                </Link>
              </li>
            </ul>
            <Header />
          </div>
        </nav>
      </Router>

      <Router>
        <Routes>
          <Route exact path="/authors" element={<AuthorList />} />
          <Route exact path="/authors/create" element={<CreateAuthor />} />
          <Route exact path="/authors/:id" element={<AuthorPage />} />
          <Route exact path="/authors/:id/edit" element={<EditAuthor />} />
          <Route exact path="/authors/:id/delete" element={<DeleteAuthor />} />
          <Route
            exact
            path="/authors/filterAuthorsByNumberOfBooks"
            element={<FilteredAuthorList />}
          />
          <Route
            exact
            path="/authors/getAuthorsTop"
            element={<TopAuthorList />}
          />
          <Route exact path="/books" element={<BookList />} />
          <Route exact path="/books/create" element={<CreateBook />} />
          <Route exact path="/books/:id" element={<BookPage />} />
          <Route exact path="/books/:id/edit" element={<EditBook />} />
          <Route exact path="/books/:id/delete" element={<DeleteBook />} />
          <Route exact path="/libraries" element={<LibraryList />} />
          <Route exact path="/libraries/create" element={<CreateLibrary />} />
          <Route exact path="/libraries/:id" element={<LibraryPage />} />
          <Route exact path="/libraries/:id/edit" element={<EditLibrary />} />
          <Route
            exact
            path="/libraries/:id/delete"
            element={<DeleteLibrary />}
          />
          <Route
            exact
            path="/libraries/getLibrariesTop"
            element={<TopLibraryList />}
          />
          <Route exact path="/librarybook" element={<LibraryBookList />} />
          <Route
            exact
            path="/librarybook/create"
            element={<CreateLibraryBook />}
          />
          <Route exact path="/librarybook/:id" element={<LibraryBookPage />} />
          <Route
            exact
            path="/librarybook/:id/edit"
            element={<EditLibraryBook />}
          />
          <Route
            exact
            path="/librarybook/:id/delete"
            element={<DeleteLibraryBook />}
          />
          <Route exact path="/register" element={<RegisterPage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/confirm" element={<ConfirmPage />}></Route>
          <Route exact path="/profile/:id" element={<UserProfile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
