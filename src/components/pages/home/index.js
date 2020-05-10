import React from 'react';
import './estilo.css';
import {Container, Row, Card, Jumbotron, Col, ListGroup } from 'react-bootstrap';


export default function Home(){
        
    return(
        <div class="home-container">
         
            <Container>
                <Card body>
                    <Jumbotron>
                        <h1 class="text-center">ContactJS</h1>
                    </Jumbotron>
              
                <Row>
                        
                    <Col sm={3}></Col>
                    <Col sm={6}>

                        <ul class="list-group">
                            <a class="list-group-item titulo"><h4>Descrição</h4></a>
                            <li class="list-group-item">1 - Cadastra, Edita, exclui, lista e gera relatório com gráfico.</li>
                            <li class="list-group-item">2 - Cadastro: Cadastro de pessoa Física.</li>
                            <li class="list-group-item">3 - Filtros de pesquisa: por Gênero(F/M), por Idade, por Mês(todos de um determinado mês), por Idioma(todos de um determinado Idioma).</li>
                            <li class="list-group-item">4 - Oderna por: Nome(A-Z e Z-A), dia/mês/ano do nascimento(crescente e decrescente), Idioma(A-Z e Z-A).</li>
                            <li class="list-group-item">5 - Estatísticas: Gráficos com o total de cadastros por Gênero e Quantidade de Usuários por Idioma.</li>
                        </ul>

                    </Col>

                </Row>

                <Row>
                    <Col sm={3}></Col>
                    <Col sm={6}>
                        <ListGroup as="ul">
                            <a class="list-group-item titulo"><h4>Tecnologias usadas</h4></a>
                            <ListGroup.Item as="li">Html5, Css3, BootsTrap4, Javascript</ListGroup.Item>
                            <ListGroup.Item as="li">Node, Npm, Git, Git Kraken, GitHub</ListGroup.Item>
                            <ListGroup.Item as="li">React JS, Persintência no LocalStorage</ListGroup.Item>
                            <ListGroup.Item as="li">Axios, Recharts</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>

            </Card>
        </Container>

        </div>
    );
    
}

