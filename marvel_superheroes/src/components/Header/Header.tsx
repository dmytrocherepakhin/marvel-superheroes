import React from 'react';
import './Header.css';
import logo from '../../images/logo.jpg';

function Header(): JSX.Element {
  return (
    <div className="hero_header__logo">
      <img className="hero_header__logo-img" src={logo} alt="Marvel" />
    </div>
  );
}

export default Header;
