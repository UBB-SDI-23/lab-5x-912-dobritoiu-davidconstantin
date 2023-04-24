import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorList from './components/AuthorList';
import CreateAuthor from './components/CreateAuthor';
import EditAuthor from './components/EditAuthor';
import DeleteAuthor from './components/DeleteAuthor';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import AuthorPage from './components/AuthorPage';
import BookPage from './components/BookPage';
import LibraryList from './components/LibraryList';
import CreateLibrary from './components/CreateLibrary';
import LibraryPage from './components/LibraryPage';
import EditLibrary from './components/EditLibrary';
import DeleteLibrary from './components/DeleteLibrary';
import LibraryBookList from './components/LibraryBookList';
import CreateLibraryBook from './components/CreateLibraryBook';
import LibraryBookPage from './components/LibraryBookPage';
import EditLibraryBook from './components/EditLibraryBook';
import DeleteLibraryBook from './components/DeleteLibraryBook';
import FilteredAuthorList from './components/FilteredAuthorList';
import TopAuthorList from './components/TopAuthorList';
import TopLibraryList from './components/TopLibraryList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/authors" element={<AuthorList />} />
          <Route exact path="/authors/create" element={<CreateAuthor />} />
          <Route exact path="/authors/:id" element={<AuthorPage />} />
          <Route exact path="/authors/:id/edit" element={<EditAuthor />} />
          <Route exact path="/authors/:id/delete" element={<DeleteAuthor />} />
          <Route exact path="/authors/filterAuthorsByNumberOfBooks" element={<FilteredAuthorList />} />
          <Route exact path="/authors/getAuthorsTop" element={<TopAuthorList />} />
          <Route exact path="/books" element={<BookList />} />
          <Route exact path="/books/create" element={<CreateBook />} />
          <Route exact path="/books/:id" element={<BookPage />} />
          <Route exact path="/books/:id/edit" element={<EditBook />} />
          <Route exact path="/books/:id/delete" element={<DeleteBook />} />
          <Route exact path="/libraries" element={<LibraryList />} />
          <Route exact path="/libraries/create" element={<CreateLibrary />} />
          <Route exact path="/libraries/:id" element={<LibraryPage />} />
          <Route exact path="/libraries/:id/edit" element={<EditLibrary />} />
          <Route exact path="/libraries/:id/delete" element={<DeleteLibrary />} />
          <Route exact path="/libraries/getLibrariesTop" element={<TopLibraryList />} />
          <Route exact path="/librarybook" element={<LibraryBookList />} />
          <Route exact path="/librarybook/create" element={<CreateLibraryBook />} />
          <Route exact path="/librarybook/:id" element={<LibraryBookPage />} />
          <Route exact path="/librarybook/:id/edit" element={<EditLibraryBook />} />
          <Route exact path="/librarybook/:id/delete" element={<DeleteLibraryBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
