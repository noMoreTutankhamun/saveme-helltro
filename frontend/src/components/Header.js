import React from 'react';
import Button from './Button';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-logo">
        구해줘
        <br />
        지옥철
      </h1>
      <div>
        <Button text={'로그인'}></Button>
        <Button text={'회원가입'}></Button>
      </div>
    </header>
  );
};

export default Header;
