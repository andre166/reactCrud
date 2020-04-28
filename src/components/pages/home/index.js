import React, {useEffect} from 'react';
import api from '../../services/api';
import './estilo.css';

export default function Home(){

    useEffect(() => {
        
            async function loadApi2(){
            
                const response = await api.get();
                let contatos = response.data;
    
                let mesFiltrado = contatos.filter(n => n.birthday);
                
                mesFiltrado.map((info) => (
                    info.birthday = formatData(info.birthday)
                ));
           
                function formatData(data){

                    data = String(data).split(' ');
                    var days = String(data[0]).split('-');

                    var dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');
                    
                    return dataFormatada;
                }
    
                await localStorage.setItem("ListaDeContatos", JSON.stringify(contatos));

            };

            //Para não gerar erro com a api inicial do desafio 
            if(localStorage.getItem("contatosApi")){

                (async function loadApi(){
                    await localStorage.removeItem("contatosApi");
                    loadApi2();
                })();

            }else if(!localStorage.getItem("ListaDeContatos")){
                loadApi2();
                
            }else if(localStorage.getItem("ListaDeContatos").length == 2){
                localStorage.removeItem("ListaDeContatos");
                loadApi2();
            }
              

    }, [localStorage.getItem("ListaDeContatos")]);

        
    return(
        <div class="home-container">
            <div className="container">
                <div className="card card-body">
                        
                <div class="jumbotron py-4  mb-2">
                    <h1 class="display-4 text-center">Leste Contact</h1>
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

