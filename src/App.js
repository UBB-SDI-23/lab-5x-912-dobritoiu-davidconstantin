import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorList from './components/AuthorList';
import CreateAuthor from './components/CreateAuthor';
import EditAuthor from './components/EditAuthor';
import DeleteAuthor from './components/DeleteAuthor';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/authors" element={<AuthorList />} />
          <Route exact path="/authors/create" element={<CreateAuthor />} />
          <Route exact path="/authors/:id/edit" element={<EditAuthor />} />
          <Route exact path="/authors/:id/delete" element={<DeleteAuthor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
