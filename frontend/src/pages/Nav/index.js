import React, { useCallback } from 'react';
import './styles.css';
import useAuth from '../../hooks/useAuth';

export default function Nav(){
    
    const { signed, signOut, loading } = useAuth();


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

    const handleSignOut = useCallback( () => {
        signOut();
    }, [signOut]);



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
                        { signed ? (<li><a href="/perfil" >Perfil</a></li>) : (<li><a href="/login" >Entrar</a></li>)}
                        <li><a href="/">Sobre</a></li>
                        <li><a href="/">Contato</a></li>
                        { signed ? (<li><a href="" onClick={ handleSignOut }>Sair</a></li>) : ''}
                    </ul>
                </nav>
            </header>
    );
}

