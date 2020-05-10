import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imagens/logo.png';
import './header.css';

export default function Header() {

    function toogleMenu(){
        document.querySelector('#navbarNav').classList.remove('show');
    }
        
    return(

        <nav class="navbar navbar-expand-lg sticky-top navbar-custom">

            <Link to="/" id="logo-container">
                    <img id="logo" src={logo} alt="Logo"/> 
            </Link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span><i class="fas fa-bars"></i></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto" id="menu" onClick={toogleMenu}>
                    
                    <li class="nav-item">
                        <Link to="/ListaDeContatos" class="nav-link"><a ><i class="fas fa-list-alt"></i> Lista de Contatos</a></Link>
                    </li>

                    <li class="nav-item">
                        <Link to="/CadastrarContato" class="nav-link"><a><i class="fas fa-user-plus"></i> Cadastrar Contatos</a></Link>
                    </li>

                    <li class="nav-item">
                        <Link to="/Estatisticas" class="nav-link"><a><i class="fas fa-chart-pie"></i> Estatisticas</a></Link>
                    </li>
                
                </ul>
            </div>

        </nav>

    );
}
