import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imagens/logo.png';
import './header.css';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {

  let [menuFoco, setMenuFoco] = useState(["menu-1", "menu-2", "menu-3", "logo"]);
  let [menuItem, setMenuItem] = useState(-1);

  useEffect(() => {

    if(menuItem == 3){
        menuFoco.map((info) => (
            removeAtivo(info)
        ));
        return;
    }

    function foco(menuItem){
        
        menuFoco.map((info, index) => (
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

    function removeAtivo(info){

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
