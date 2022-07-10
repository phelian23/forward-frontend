import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ArticleList />
    </div>
  );
}

export default App;