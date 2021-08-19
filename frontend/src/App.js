import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import StoryListPage from './pages/StoryListPage';
import StoryPage from './pages/StoryPage';
import WritePage from './pages/WritePage';

function App() {
  axios.defaults.baseURL = 'http://localhost:8080';

  return (
    <div>
      <Header />

      <Switch>
        <Route path="/@:sub_sta_nm" component={StoryListPage} />
        <Route path="/@:sub_sta_nm/:postId" component={StoryPage} />
        <Route exact path="/write" component={WritePage} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route component={NotFoundPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
