import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imagens/logo.png';
import './header.css';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {

  let [menuFoco] = useState(["menu-1", "menu-2", "menu-3", "logo"]);
  let [menuItem, setMenuItem] = useState(-1);

  useEffect(() => {

    if(menuItem == 3){ // Remove a classe Ativo dos menus ao clicar na logo
        menuFoco.map((info) => (
            removeAtivo(info)
        ));
        return;
    }

    // Coloca classe ativo no LI do menu e remove dos outros LI'S
    function foco(menuItem){  
        
        menuFoco.map((info, index) => ( //recebe um valor dos LIS do menu e adiciona a classe ATIVO no elemento com o ID igual ao elemento do array[MenuFoco] e remove os demais
            focar(info, index)
        ));

        function focar(info, index){
            
            if(menuItem == index){
                let x = document.querySelector(`#${info}`);
                x.classList.add('ativo');
            }else{
                let x = document.querySelector(`#${info}`);
                x.classList.remove('ativo');
            }    
        }
    }

    foco(menuItem);

    function removeAtivo(info){ // função para remover todos os ativos

        let x = document.querySelector(`#${info}`);
        x.classList.remove('ativo');
    }

  }, [menuItem]);
        
    return(

        <Navbar collapseOnSelect expand="lg" className="navbar-custom sticky-top">

            <Navbar.Brand onClick={()=> setMenuItem(3)}><Link to="/" id="logo-container"> <img id="logo" src={logo} alt="Logo"/> </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>

                <Nav id="menu">
                    <Nav.Link as="li" id="menu-1" onClick={()=> setMenuItem(0)}><Link to="/ListaDeContatos" class="nav-link"><a ><i class="fas fa-list-alt"></i> Lista de Contatos</a></Link></Nav.Link>
                    <Nav.Link as="li" id="menu-2" onClick={()=> setMenuItem(1)}><Link to="/CadastrarContato" class="nav-link"><a><i class="fas fa-user-plus"></i> Cadastrar Contatos</a></Link></Nav.Link>
                    <Nav.Link as="li" id="menu-3" onClick={()=> setMenuItem(2)}><Link to="/Estatisticas" class="nav-link"><a><i class="fas fa-chart-pie"></i> Estatisticas</a></Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    );
}
