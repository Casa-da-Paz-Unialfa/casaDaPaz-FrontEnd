"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../../assets/logo.png';

const Navbar: React.FC<{ onAboutClick: () => void }> = ({ onAboutClick }) => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false); // controla se a página foi rolada
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);

      if (currentPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: "home", label: "Início" },
    { to: "sobre", label: "Sobre Nós", offset: -200, onClick: onAboutClick },
    { to: "transparency", label: "Transparência", offset: -50 },
    { to: "support", label: "Como Ajudar", offset: -50 },
    { to: "eventos", label: "Eventos", offset: -100 },
    { to: "galeria", label: "Galeria", offset: -50 },
  ];

  return (
    <div
      className={`w-screen h-[80px] fixed z-20 transition-all duration-700 ease-in-out ${
        scrolled || scrollPosition > 0 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div
        className={`h-full max-w-[1200px] mx-auto px-6 flex items-center transition-all duration-700 ease-in-out ${
          scrolled || scrollPosition > 0 ? 'justify-between' : 'justify-start'
        }`}
      >
        {/* Logo animada suavemente */}
        <div
          className={`transform transition-all duration-700 ease-in-out ${
            scrolled || scrollPosition > 0
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-[-50%] pointer-events-none'
          }`}
        >
          <Image
            src={logo}
            alt="Logo"
            width={225}
            height={225}
            style={{ marginLeft: '-25px' }}
            className="cursor-pointer"
            onClick={() => {
              const element = document.getElementById("home");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

        {/* Navegação desktop */}
        <ul
          className={`hidden md:flex space-x-8 transition-all duration-700 ease-in-out ${
            scrolled || scrollPosition > 0
              ? 'text-black ml-0 flex-grow justify-center'
              : 'text-white ml-6 justify-start'
          }`}
        >
          {navLinks.map(({ to, label, offset, onClick }, index) => (
            <li key={index} className="cursor-pointer">
              <Link
                to={to}
                smooth={true}
                offset={offset || 0}
                duration={500}
                className="hover:underline"
                onClick={onClick}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Ícone mobile */}
        <div
          className="md:hidden ml-auto transition-all duration-700 ease-in-out"
          onClick={handleClick}
          aria-expanded={nav}
          aria-label="Toggle navigation"
        >
          {!nav ? (
            <FaBars className={`w-6 ${scrolled || scrollPosition > 0 ? 'text-black' : 'text-white'}`} />
          ) : (
            <FaTimes className={`w-6 ${scrolled || scrollPosition > 0 ? 'text-black' : 'text-white'}`} />
          )}
        </div>
      </div>

      {/* Menu mobile */}
      <ul
        className={`absolute w-full px-8 bg-white transition-all duration-700 ease-in-out ${
          !nav ? 'hidden' : 'block'
        }`}
      >
        {navLinks.map(({ to, label, offset, onClick }, index) => (
          <li key={index} className="border-b-2 border-zinc-300 w-full cursor-pointer">
            <Link
              onClick={() => {
                handleClose();
                if (onClick) onClick();
              }}
              to={to}
              smooth={true}
              offset={offset || 0}
              duration={500}
              className="block py-2 hover:bg-gray-200 text-black"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
