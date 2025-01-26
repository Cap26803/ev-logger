import React from "react";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <h1>DrixxLog</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/logs">Logs</a>
            </nav>
        </header>
    );
}

export default Header;
