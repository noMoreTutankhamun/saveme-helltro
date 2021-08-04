import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../redux/user';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const onLogout = useCallback((e) => {
    e.preventDefault();
    window.localStorage.clear('token');
    dispatch(logoutAction());
  }, []);
  return (
    <header className="header">
      <h1 className="header-logo">
        <Link to="/">
          구해줘
          <br />
          지옥철
        </Link>
      </h1>
      <div>
        <Link to="/login">
          {isLoggedIn ? <button onClick={onLogout}>로그아웃</button> : <button>로그인</button>}
        </Link>
        <Link to="/signup">
          <button>회원가입</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
