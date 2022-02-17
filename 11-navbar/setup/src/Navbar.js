import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    console.log(linksRef, linksContainerRef);
    // const linksHeight = linksRef.current.getBoundingClientRect().height;
    const linksHeight = linksRef.current.clientHeight;
    if (showNav) {
      // linksContainerRef.current.style.height = `${linksHeight}px`;
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
    console.log(linksHeight);
  }, [showNav]);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" />
          <button className="nav-toggle" onClick={() => setShowNav(!showNav)}>
            <FaBars />
          </button>
        </div>
        <div ref={linksContainerRef} className="links-container">
          <ul ref={linksRef} className="links">
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="social-icons">
          {social.map((media) => {
            const { id, url, icon } = media;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
