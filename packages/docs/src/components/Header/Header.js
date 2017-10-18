// @flow

import React from 'react';
import Container from '../Container/Container';
import './header.scss';

function Header() {
    return (
        <header className="header">
            <Container>
                <h1 className="header__title">React Accessible Tooltip</h1>
                <h2 className="header__subtitle">Interactive Demo</h2>
            </Container>
        </header>
    );
}

export default Header;
