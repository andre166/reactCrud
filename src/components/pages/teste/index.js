import React, {useState} from 'react';
import './teste.css';
import {Container, Row, Card, Jumbotron, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default function Teste(){

    let [nomeOm, setNomeOm] = useState("");
    let [lista, setLista] = useState("");

    const cadastrarOm = async (nome) => {
        
        let om = {nome_om: nome};
        const response = await axios.post('http://localhost:3001/cadastrar/om', om);

    };

    const deletarOm = async (nome) => {
        
        let om = {nome_om: nome};
        const response = await axios.post('http://localhost:3001/deletar/om/5', om);

    };

    const listarOm = async (nome) => {
        
        let om = {nome_om: nome};

        const response = await axios.get('http://localhost:3001/listar/om', om);
        setLista(response.data)

    };

    const listarOmPorId = async (nome) => {
        
        let om = {nome_om: nome};

        const response = await axios.get('http://localhost:3001/listar/om/5', om);
        setLista(response.data)

    };

    function contatosEmCards(){

            return(
                <>
                    {lista.map((info, e) => ( 
                        <div key={e}>

                            <p>{info.nome}</p>
                            <p>{info.senha}</p>

                        </div>
                    ))} 
                </>
            );
    }

        
    return(
        <div class="home-container">
         
            <Container>
                <Card body>
                    <Jumbotron className="py-4 mb-2">
                        <h1 class="text-center">Teste</h1>
                    </Jumbotron>
              
                    <Row>
                            
                        <form method="post" action={'/'}>

                            <span>Nome</span>  
                            
                            
                            <input type="text" 
                                value={nomeOm} 
                                onChange={(e)=> setNomeOm(e.target.value)} placeholder="Digite a OM" 
                            />

                            <button type="button" onClick={() => cadastrarOm(nomeOm)}>Insert</button>

                            <button type="button" onClick={() => listarOm(nomeOm)}>Select</button>
                            <button type="button" onClick={() => listarOmPorId(nomeOm)}>Select por ID</button>

                            <button type="button" onClick={() => deletarOm(nomeOm)}>Deletar</button>

                        </form>

                    </Row>

                    { lista.length === 0 ? '' : contatosEmCards() }

                </Card>
            </Container>

        </div>
    );
    
}

