import React from 'react';
import './styles.css';

export default function Nav(){
    



    const handleClick = () => {
        const menu = document.querySelector(".menu");
        const navList = document.querySelector(".nav-list");
        const navLinks = document.querySelectorAll(".nav-list li");
        const activeClass = "active";
    
        const animateLinks = () => {
            navLinks.forEach((link, index) => {
              link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${
                    index / 7 + 0.15
                  }s`);
            });
          };
        navList.classList.toggle(activeClass);
        menu.classList.toggle(activeClass);
        animateLinks();
    };



    return (
            <header>
                <nav>
                    <a className="logo" href="/">Classificados</a>
                    <div className="menu" onClick={handleClick}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <ul className="nav-list">
                        <li><a href="/">Início</a></li>
                        <li><a href="#">Sobre</a></li>
                        <li><a href="#">Contato</a></li>
                    </ul>
                </nav>
            </header>
    );
}

