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
  const [tabelaDeContatos, setTabelaDeContatos] = useState(false); // Muda os cards para tabela
  
  //States para paginação
  const [currentPage, setCurrentPage] = useState(1); //Define a primeira página e fica sendo observado pelo UseEffect para mudar o css da paginação 
  const [contatosPorPagina, setContatosPorPagina] = useState(5); //Define a quantidade de contatos por página
  const indexLastContato = currentPage * contatosPorPagina;
  const indexOfFirstPost = indexLastContato - contatosPorPagina;
  const currentPosts = contatos.slice(indexOfFirstPost, indexLastContato)
  const [zerarPaginacao, setZerarPaginacao] = useState(false); // Volta para a página 1

  const paginate = (pageNumber) => setCurrentPage(pageNumber); //Define a quantidade de páginas a serem paginadas

  useEffect(() => {

    (async function pegarContatos() {

      const response = await localStorage.getItem("ListaDeContatos");
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
            tabelaDeContatos={tabelaDeContatos} setTabelaDeContatos={setTabelaDeContatos}  paginate={paginate} 
            contatosPorPagina={contatosPorPagina} setContatosPorPagina={setContatosPorPagina}> 
        </FiltrosDiv>

        <Row>
            <Col>
              <MostrarContatos contatos={currentPosts} setContatos={setContatos} tabelaDeContatos={tabelaDeContatos}></MostrarContatos>
              <AlertaZeroContato contatos={contatos}></AlertaZeroContato>
            </Col>
        </Row>

        <hr className="bg-softGreen-claro"/>
        
        <Row className="paginacao-container">
          <Paginacao contatosPorPagina={contatosPorPagina} contatos={contatos.length} paginate={paginate} zerarPaginacao={zerarPaginacao}></Paginacao>
        </Row>

      </Card>

      <SnackBar/>

    </Container>
  );
}