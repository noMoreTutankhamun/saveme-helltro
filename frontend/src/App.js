import Header from './components/Header';
import Footer from './components/Footer';

import Search from './components/Search';
import './App.css';
import React from 'react';

const App = () => {
  return (
    <div className="mainlayout">
      <Header />

      <Search />

      <Footer />
    </div>
  );
};

export default App;
