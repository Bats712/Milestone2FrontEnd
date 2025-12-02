import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "10px 20px" }}>
      <div>
        <Link
          to="/"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            display: "block",
            marginBottom: "10px"
          }}
        >
          Library App
        </Link>
      </div>

      
      <nav
        style={{
          display: "flex",
          gap: "20px",       
          fontSize: "18px"
        }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/parents">Authors</NavLink>
        <NavLink to="/children">Books</NavLink>
        <NavLink to="/about">About</NavLink>

      </nav>
    </header>
  );
}
