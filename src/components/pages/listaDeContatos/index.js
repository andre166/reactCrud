import React, { useState, useEffect } from 'react';
import './listaDeContatos.css';
import FiltrosDiv from './components/filtros';
import AlertaZeroContato from './components/alertZeroContato';
import MostrarContatos from './components/mostrarContatos';
import SnackBar from "./components/snackBarAlert";
import {Container, Row, Card, Jumbotron, Col} from 'react-bootstrap';


export default function ListaDeContatos() {

  const [contatos, setContatos] = useState([]);
  const [tabelaDeContatos, setTabelaDeContatos] = useState(false);

  useEffect(() => {

    (async function pegarContatos() {

      const response = await localStorage.getItem("ListaDeContatos");
      let ListaDeContatos = JSON.parse(response);
      setContatos(ListaDeContatos);

    })();
  
  }, [localStorage.getItem("ListaDeContatos")]);

  return (
    <Container fluid>
      <Card body className="my-2 container-listaDeContatos">

      <Jumbotron className="py-4 mb-2">
        <h1 class="text-center">Lista de Contatos</h1>
      </Jumbotron>
      
      <FiltrosDiv setContatos={setContatos} tabelaDeContatos={tabelaDeContatos} setTabelaDeContatos={setTabelaDeContatos}></FiltrosDiv>

        <Row>
            <Col>
              <MostrarContatos contatos={contatos} setContatos={setContatos} tabelaDeContatos={tabelaDeContatos}></MostrarContatos>
              <AlertaZeroContato contatos={contatos}></AlertaZeroContato>
            </Col>
        </Row>

      </Card>

      <SnackBar/>

    </Container>
  );
}