import React, { useState, useEffect } from 'react';
import './listaDeContatos.css';
import FiltrosDiv from './components/filtros/filtrosDiv';
import AlertaZeroContato from './components/alertZeroContato';
import MostrarContatos from './components/mostrarContatos';
import SnackBar from "./components/snackBarAlert";
import Paginacao from './components/paginacao';
import {Container, Row, Card, Jumbotron, Col} from 'react-bootstrap';


export default function ListaDeContatos() {

  const [contatos, setContatos] = useState([]);
  const [modoTabela, setModoTabela] = useState(false); // Muda os cards para tabela e vice versa
  
  //States para paginação
  const [paginaAtual, setPaginaAtual] = useState(1); //Define a primeira página e fica sendo observado pelo UseEffect para mudar o css da paginação 
  const [contatosPorPagina, setContatosPorPagina] = useState(5); //Define a quantidade de contatos por página

  const indexLastContato = paginaAtual * contatosPorPagina;
  const indexOfFirstPost = indexLastContato - contatosPorPagina;
  const quantidadeDeContatos = contatos.slice(indexOfFirstPost, indexLastContato);

  const [zerarPaginacao, setZerarPaginacao] = useState(false); // Volta para a página 1 ao mudar filtros ou ordenar - independente de true ou false - a cada mudança de estado é chamado um useffect
  const paginar = (pageNumber) => setPaginaAtual(pageNumber); //Define a quantidade de páginas a serem paginadas

  useEffect(() => {

    (function pegarContatos() {

      const response = localStorage.getItem("ListaDeContatos");
      let ListaDeContatos = JSON.parse(response);
      setContatos(ListaDeContatos);

    })();
  
  }, [localStorage.getItem("ListaDeContatos")]);

  return (
    <Container fluid className="container-listaDeContatos my-2">
      <Card body>

        <Jumbotron className="py-4 mb-2">
          <h1 class="text-center">Lista de Contatos</h1>
        </Jumbotron>
     
        <FiltrosDiv zerarPaginacao={zerarPaginacao} setZerarPaginacao={setZerarPaginacao} contatos={contatos} setContatos={setContatos}
            modoTabela={modoTabela} setModoTabela={setModoTabela}  paginar={paginar} 
            contatosPorPagina={contatosPorPagina} setContatosPorPagina={setContatosPorPagina}> 
        </FiltrosDiv>

        <Row>
            <Col>
              <MostrarContatos contatos={quantidadeDeContatos} setContatos={setContatos} modoTabela={modoTabela}></MostrarContatos>

              <AlertaZeroContato contatos={contatos}></AlertaZeroContato>
            </Col>
        </Row>

        <hr className="bg-softGreen-claro"/>
        
        <Row className="paginacao-container">
          <Paginacao contatosPorPagina={contatosPorPagina} contatos={contatos.length} paginar={paginar} zerarPaginacao={zerarPaginacao}></Paginacao>
        </Row>

      </Card>

      <SnackBar/>

    </Container>
  );
}