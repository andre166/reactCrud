import React, {useEffect} from 'react';
import api from '../../services/api';
import './estilo.css';

export default function Home(){

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

        if (localStorage.length === 0){
        
            async function loadApi(){

                const response = await api.get();
                let contatos = response.data;

                let mesFiltrado = contatos.filter(n => n.birthday)
                
                    mesFiltrado.map((info) => (
                        info.birthday = formatData(info.birthday)
                    ))
           
                    function formatData(data){
    
                        data = String(data).split(' ');
                        var days = String(data[0]).split('-');

                        var dataFormatada =  [days[2],"-", days[1],"-", days[0]].join('');
                     
                        return dataFormatada;

                    }

                localStorage.setItem("contatosApi", JSON.stringify(contatos));
            }

            loadApi();
              
        }
        
    return(

        <div className="container">

            <div className="card card-body my-2">
                    
                <div class="jumbotron">
                    <h1 class="text-center text-info LesteTel_h1">React Cad</h1>
                </div>

                <div className="row">
                    <div class="col-md-3"> </div>

                    <div class="col-md-6">

                        <div className="card card-body mt-2 text-center">
                        
                            <ul class="list-group">
                                <li class="list-group-item active"><h2>Descrição da API</h2></li>

                                <li class="list-group-item list-group-item-primary">Cadastra, Edita, exclui, lista e gera relatório com gráfico.</li>
                                <li class="list-group-item">Cadastro: Primeiro nome, Ultimo nome, Email, Gênero, Linguagem, Data de nascimento</li>
                                <li class="list-group-item">Exclusão, Alteração e Edição de todos os campos citados acima</li>
                                <li class="list-group-item">Filtros de pesquisa: por Gênero(F/M), por Idade, por Mês(todos de um determinado mês), por Idioma(todos de um determinado Idioma)</li>
                                <li class="list-group-item">Estatísticas: Gráficos com o total de cadastros por Gênero e Quantidade de Usuários por Idioma </li>
                                
                            </ul>
                        
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div class="col-md-3"> </div>

                    <div class="col-md-6">

                        <div className="card card-body mt-2 ">

                                <ul class="list-group text-center ">

                                    <li class="list-group-item active"><h1>Tecnologias usadas</h1></li>

                                    <li class="list-group-item">Html5, Css3, BootsTrap, Javascript</li>
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

