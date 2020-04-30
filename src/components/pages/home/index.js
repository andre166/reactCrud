import React, {useEffect} from 'react';
import api from '../../services/api';
import './estilo.css';

export default function Home(){
        
    return(
        <div class="home-container">
            <div className="container">
                <div className="card card-body">
                        
                <div class="jumbotron py-4  mb-2">
                    <h1 class="display-4 text-center">ContactJS</h1>
                </div>

                <div className="row">
                    <div class="col-md-3"> </div>

                    <div class="col-md-6">

                        <ul class="list-group">
                            <li class="list-group-item titulo"><h4>Descrição</h4></li>
                            <li class="list-group-item">1 - Operações: Cadastra, Edita, exclui, lista e gera relatório com gráfico.</li>
                            <li class="list-group-item">2 - Cadastro: Primeiro nome, Ultimo nome, Email, Gênero, Linguagem, Data de nascimento</li>
                            <li class="list-group-item">3 - Filtros de pesquisa: por Gênero(F/M), por Idade, por Mês(todos de um determinado mês), por Idioma(todos de um determinado Idioma)</li>
                            <li class="list-group-item">4 - Estatísticas: Gráficos com o total de cadastros por Gênero e Quantidade de Usuários por Idioma </li>
                        </ul>
                        
                    </div>
                </div>

                    <div className="row">
                        <div class="col-md-3"> </div>

                        <div class="col-md-6">

                            <ul class="list-group text-center mt-2">
                                <li class="list-group-item titulo"><h4>Tecnologias usadas</h4></li>
                                <li class="list-group-item">Html5, Css3, BootsTrap4, Javascript</li>
                                <li class="list-group-item">Node, Npm, Git, Git Kraken, GitHub</li>
                                <li class="list-group-item">React JS, Persintência no LocalStorage</li>
                                <li class="list-group-item">Axios, Recharts</li>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
    
}

