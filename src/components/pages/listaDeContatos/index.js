import React, { useState, useEffect } from 'react';
import './listaDeContatos.css';
import FiltrosDiv from './components/filtros';
import AlertaZeroContato from './components/alertZeroContato';
import MostrarContatos from './components/mostrarContatos';
import SnackBar from "./components/snackBarAlert";
import Paginacao from './components/paginacao';
import {Container, Row, Card, Jumbotron, Col} from 'react-bootstrap';


export default function ListaDeContatos() {

  const [contatos, setContatos] = useState([]);
  const [tabelaDeContatos, setTabelaDeContatos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contatosPorPagina, setContatosPorPagina] = useState(5);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {

    (async function pegarContatos() {

      const response = await localStorage.getItem("ListaDeContatos");
      let ListaDeContatos = JSON.parse(response);
      setContatos(ListaDeContatos);

    })();
  
  }, [localStorage.getItem("ListaDeContatos")]);


  const indexLastContato = currentPage * contatosPorPagina;
  const indexOfFirstPost = indexLastContato - contatosPorPagina;
  const currentPosts = contatos.slice(indexOfFirstPost, indexLastContato)

  return (
    <Container fluid className="container-listaDeContatos my-2">
      <Card body className="">

      <Jumbotron className="py-4 mb-2">
        <h1 class="text-center">Lista de Contatos</h1>
      </Jumbotron>
     
      <FiltrosDiv paginate={paginate} contatos={contatos} setContatos={setContatos} tabelaDeContatos={tabelaDeContatos} setTabelaDeContatos={setTabelaDeContatos}  contatosPorPagina={contatosPorPagina} setContatosPorPagina={setContatosPorPagina}></FiltrosDiv>

        <Row>
            <Col>
              <MostrarContatos contatos={currentPosts} setContatos={setContatos} tabelaDeContatos={tabelaDeContatos}></MostrarContatos>
              <AlertaZeroContato contatos={contatos}></AlertaZeroContato>
            </Col>
        </Row>

        <hr/>
        
        <Row className="paginacao-container">
          <Paginacao contatosPorPagina={contatosPorPagina} contatos={contatos.length} paginate={paginate}></Paginacao>
        </Row>

      </Card>

      <SnackBar/>

    </Container>
  );
}