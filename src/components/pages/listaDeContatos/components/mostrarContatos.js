import React from 'react';
import { Link } from 'react-router-dom';


export default function MostrarContatos({ contatos }){

    async function deleteContact(id) {

        const response = await localStorage.getItem("contatosApi");
        let ListaDeContatos = JSON.parse(response);
    
        let contato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == id));
    
        ListaDeContatos.splice(contato, 1)
    
        await localStorage.setItem("contatosApi", JSON.stringify(ListaDeContatos));

        await localStorage.setItem("MSG", "ExcluidoSuccess");
    
    }
    
    return(
        <div class="card-group d-flex" id="lista-body">
            {contatos.map((info, e) => (
                      
                <div class="pb-0" key={info.id} id="cardUsuario" >
    
                    <div class="card-body p-2">
                        <div class="d-flex justify-content-center">
                            <img class="card-img-top img-thumbnail rounded-circle" src={info.avatar}  id="img-card"/>
                        </div>
    
                        <div id="numeroDoCard">
                            <Link to={{pathname: `/EditarContatos/${info.id}`}}><button type="button" class="btn badge badge-pill badge-info mx-4"><i class="fas fa-edit"></i>Editar</button></Link>
                        </div>

                        <div id="btn-contato-container">
                            <div class="btn-group dropup">
                                <button type="button" class="btn badge badge-pill badge-danger dropdown-toggle btn-sm" data-toggle="dropdown">
                                <i class="fas fa-trash">Excluir</i>
                                </button>
            
                                <div class="dropdown-menu">
                                <div className="card-body col-md-12 text-center">
            
                                    <p class="text-dark" >Deseja excluir?</p>
                                    <hr class="my-2" />
            
                                    <a href="#" class="btn btn-success btn-sm mr-2 " onClick={()=>{deleteContact(info.id)}}>Sim</a>
                                    <a href="#" class="btn btn-danger btn-sm ml-2">Não</a>
                                
                                </div>
                                </div>
                            </div>      
                        </div>
        
                        <div className="card-body pb-2 p-0" id="card-info-usuario">
                
                            <p class="card-title"><strong>Nome: </strong>{info.first_name} {info.last_name}</p>
                            <p class="card-text"> <strong>Email: </strong>{info.email}</p>
                            <p class="card-text"><strong>Gênero: </strong>{info.gender == 'M' ? info.gender = 'Masculino' : info.gender = 'Feminino'} </p>
                            <p class="card-text"><strong>Idioma: </strong>{info.language}</p>
                            <p class="card-text"><strong>Data de nascimento: </strong>{info.birthday}</p>
                            
                        </div>

                    </div>
                </div>
            ))} 
        </div>
    );
}