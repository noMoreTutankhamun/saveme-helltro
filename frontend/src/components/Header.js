import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../redux/user';
import Button from './common/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  & + & {
    margin-left: 1rem;
  }
`;

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
          {isLoggedIn ? (
            <StyledButton inverted onClick={onLogout}>
              로그아웃
            </StyledButton>
          ) : (
            <StyledButton inverted>로그인</StyledButton>
          )}
        </Link>
        <Link to="/signup">{!isLoggedIn && <StyledButton marginLeft>회원가입</StyledButton>}</Link>
      </div>
    </header>
  );
};

export default Header;
