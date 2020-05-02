import React from 'react';
import { Link } from 'react-router-dom';

export default function MostrarContatos({ contatos }){

    function socialIcon(posicaoNoArray, contato){
        if(posicaoNoArray == 0 && contato.first_name =="André" && contato.id == 1){
            return(
                <div className="socialIcon-card">
                    <a  href="https://www.facebook.com/andre.mesquitasd" target="_blank">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a  href="https://www.instagram.com/mesquitaandre/?hl=pt-br" target="_blank">
                                    <i class="fab fa-instagram"></i>
                                </a>
                    
                                <a  href="https://www.linkedin.com/in/andr%C3%A9-mesquita-295974190/" target="_blank">
                                    <i class="fab fa-invision"></i>
                                </a>
            
                                <a href="https://api.whatsapp.com/send?phone=5521981235902" target="_blank">
                                    <i class="fab fa-whatsapp"></i>
                                </a>

                                <a href="https://github.com/andre166" target="_blank">
                                    <i class="fab fa-github"></i>
                                </a>
                </div>
            );
        }
    }

    function mascararIdade(data){

        let data2 = String(data).split(' ');
        let days = String(data2[0]).split('/');
        let dataFormatada =  [days[2],"/", days[1],"/", days[0]];
    
        let calendario = new Date;

        let anoAtual = calendario.getFullYear();
        let mesAtual = calendario.getMonth() + 1;
        let diaAtual = calendario.getDate();

        let anoAniversario = dataFormatada[0];
        let mesAniversario = dataFormatada[2];
        let diaAniversario = dataFormatada[4];
      
        let quantos_anos = anoAtual - anoAniversario;

        if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
            quantos_anos--;
        }

        if(quantos_anos < 0){
            quantos_anos = 0;
        }

        return quantos_anos;
    }

    async function deleteContact(id) {

        await localStorage.setItem("MSG", "ExcluidoSuccess");
        
        const response = await localStorage.getItem("ListaDeContatos");
        let ListaDeContatos = JSON.parse(response);
    
        let contato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == id));
    
        ListaDeContatos.splice(contato, 1);
    
        await localStorage.setItem("ListaDeContatos", JSON.stringify(ListaDeContatos));
    
    }
    
    return(
        <div class="card-group d-flex" id="lista-body">

            {contatos.map((info, e) => ( 

                <div class='pb-0' key={info.id} id="cardUsuario" >
    
                    <div class="card">
                        <div class="card-header">
                            
                           
                                <div class="">
                                    {info.first_name} {info.last_name}
                                </div>

                                <div id="menu-card-header" class="">

                                    <div class="btn-group dropleft">

                                        <a type="button" class="dropdown" data-toggle="dropdown">
                                            <i class="fas fa-trash"></i>
                                        </a>
                    
                                        <div class="dropdown-menu">
                                            <div className="card-body text-center" id="btn-contato-container">
                        
                                                <p class="text-dark" >Deseja excluir?</p>
                                                <hr class="my-2" />
                        
                                                <a href="#" class="btn btn-success btn-sm mr-2 " onClick={()=>{deleteContact(info.id)}}>Sim</a>
                                                <button class="btn btn-danger btn-sm ml-2">Não</button>
                                            
                                            </div>
                                        </div>

                                    </div>   

                                     

                                    <Link to={{pathname: `/EditarContatos/${info.id}`}}><i class="fas fa-edit fa-edit-customizado"></i></Link>
                                
                                </div>

                           
                    </div>

                        <div>
                            <img class="card-img-top" src={info.avatar}  id="img-card"/>
                        </div>
                    <div class="card-body-container">
        
                        <div className="card-body pb-2 p-0" id="card-info-usuario">
                            
            <p class="card-text"><strong>Idade: </strong>{mascararIdade(info.birthday)}  {socialIcon(e, info)}</p>
                            <p class="card-text"><strong>Data de nascimento: </strong>{info.birthday}</p>
                            <p class="card-text"> <strong>Email: </strong>{info.email}</p>
                            <p class="card-text"><strong>Gênero: </strong>{info.gender == 'M' ? info.gender = 'Masculino' : info.gender = 'Feminino'}</p>
                            <p class="card-text"><strong>Idioma: </strong>{info.language}</p>
                            
                        </div>
                      

                    </div>
    </div>
                </div>
            ))} 
        </div>
    );
}