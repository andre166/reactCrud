import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './listaDeContatos.css';
import DivAlerta from '../filtros/divAlerta';
import FiltrosDiv from '../filtros/fitrosDiv';


export default function ListaDeContatos() {

  const [contatos, setContatos] = useState([])
  const [filtroLinguagem, setFiltroLinguagem] = useState([])
  const [filtroIdade, setFiltroIdade] = useState([])

  useEffect(() => {

    function pegarContatos() {

      const response = localStorage.getItem("contatosApi");
      let ListaDeContatos = JSON.parse(response);
      setContatos(ListaDeContatos);

    }

    pegarContatos();
  
  }, [localStorage.getItem("contatosApi")]);

  // async function filtrarFem(){

  //   const response = await localStorage.getItem("contatosApi");
  //   let ListaDeContatos = JSON.parse(response);

  //   let newLista = ListaDeContatos.filter(person => person.gender == 'F');
  //   setContatos(newLista);

  // }


  // async function filtrarMasc(){

  //   const response = await localStorage.getItem("contatosApi");
  //   let ListaDeContatos = JSON.parse(response);

  //   const newLista = ListaDeContatos.filter(person => person.gender == 'M');
  //   setContatos(newLista);

  // }

  // async function zerarFiltro(){

  //   const response = await localStorage.getItem("contatosApi");
  //   let ListaDeContatos = JSON.parse(response);

  //   document.querySelector('#inputGroupSelect01').value = 0;
  //   setContatos(ListaDeContatos);
  //   setFiltroLinguagem('');
  //   setFiltroIdade('');
  //   alertaNenhumContato(0)

  // }

  // function filtrarLinguagem(e){

  //   var letraFormatada = e.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
  //   { return a.toUpperCase(); });

  //   const response = localStorage.getItem("contatosApi");
  //   let ListaDeContatos = JSON.parse(response);

  //   let linguagemFiltrada = ListaDeContatos.filter(n => n.language == letraFormatada)

  //   alertaNenhumContato(linguagemFiltrada);    
  //   setContatos(linguagemFiltrada);

  // }

  // function alertaNenhumContato(e){

  //   var x = document.getElementById("msgErro");

  //   if(e.length == 0){
  //     x.style.display = "block";    
  //   }else{
  //     x.style.display = "none";
  //   }

  // }

  // function formatData(data, obj, e, idadeOuMes){

  //     let data2 = String(data).split(' ');
  //     let days = String(data2[0]).split('-');
  //     let dataFormatada =  [days[2],"-", days[1],"-", days[0]];
  //     let dataFinal = dataFormatada[2]
    
  //   if(idadeOuMes == 'mes'){
    
  //     if(dataFinal == e){
  //       return obj;
  //     }else{
  //       return '';
  //     }

  //   }else if(idadeOuMes == 'idade'){

  //     let calendario = new Date;
  //     let anoAtual = calendario.getFullYear();
  //     let idadeDoContato = anoAtual - dataFormatada[0];

  //     if(idadeDoContato == e){
  //       return obj;
  //     }else{
  //       return '';
  //     }
      
  //   }


  // }

  // function FiltrarPorMesOuIdade(e, idadeOuMes){

  //   if(e != 0){

  //     let x = 0;
  //     let ArrayM = [];
  //     let ArrayX = [];
      
  //     const response = localStorage.getItem("contatosApi");
  //     let ListaDeContatos = JSON.parse(response);

  //     let mesFiltrado = ListaDeContatos.filter(n => n.birthday)

  //     ArrayM = mesFiltrado.map((info) => (
  //       formatData(info.birthday, info, e, idadeOuMes)
  //     ))

  //     for(let i = 0; i < ArrayM.length; i++){

  //       if(ArrayM[i] != ''){
  //         ArrayX[x] = ArrayM[i]
  //         x++
  //       }

  //     }

  //     alertaNenhumContato(ArrayX);

  //     setContatos(ArrayX);

  //   }

  // }

  async function deleteContact(id) {

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);

    let contato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == id))

    ListaDeContatos.splice(contato, 1)
    localStorage.setItem("contatosApi", JSON.stringify(ListaDeContatos))

    setContatos(ListaDeContatos);

    // alertaExcluidoSuccess = true;

  }



  // function fecharFiltro(e){

  //   let x = document.querySelector('#btn-filtro').classList.add('collapsed');
  //   zerarFiltro();

  // }

  return (

    <div className="container-fluid container-listaDeContatos">
      <div className="card card-body my-2">
        <div class="jumbotron py-4  mb-2">
          <h1 class="display-4 text-center">Lista de Contatos</h1>
        </div>
        <DivAlerta></DivAlerta>
        <FiltrosDiv contatos={contatos} setContatos={setContatos}></FiltrosDiv>
          {/* <div>
              <a  id="btn-filtro" class="btn btn-sm btn-leste-outline" data-toggle="collapse" 
                href="#multiCollapseExample1" role="button" aria-expanded="false" 
                aria-controls="multiCollapseExample1">Filtro <i class="fas fa-filter"></i>
              </a>
              <button  class="btn btn-sm btn-outline-danger ml-2" role="button" href="#multiCollapseExample1" data-toggle="hide"
                onClick={() => {fecharFiltro('fechar')}}>Limpar Filtro<i class="fas fa-filter"></i>
              </button>

          </div>  */}
          
          <div class="row">
                
            <div class="col-sm-12">
              {/* <div class="collapse multi-collapse" id="multiCollapseExample1">
                <form className="card card-body filtro-container form-group">

                  <div class="form-group row ">

                    <div className="col-md-3">
                      <div class="dropdown">
                        <button class="btn btn-leste dropdown-toggle mb-3" type="button" 
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Gênero
                        </button>

                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#multiCollapseExample1" data-toggle="collapse" onClick={filtrarFem}>Feminino</a>
                            <a class="dropdown-item" href="#multiCollapseExample1" data-toggle="collapse" onClick={filtrarMasc}>Masculino</a>
                        </div>
                      </div>

                      
                    </div>
                
                    <div className="col-md-4">
                      <div class="input-group mb-3">

                        <input type="text" class="form-control input-leste" readonly aria-label="Recipient's username" 
                        aria-describedby="button-addon2" value={filtroLinguagem} onChange={(e)=> setFiltroLinguagem(e.target.value)} placeholder="Idioma"/>
                          
                        <div class="input-group-append">
                          <button class="btn btn-leste-outline" type="button" id="button-addon2" 
                          onClick={(e) =>  filtrarLinguagem(filtroLinguagem)}>
                          <i class="fas fa-search"></i></button>
                        </div>

                      </div>
                    </div>

                    <div className="col-md-2">
                      <div class="input-group mb-3">
                        <select class="custom-select input-leste" id="inputGroupSelect01" onChange={(e) => FiltrarPorMesOuIdade(e.target.value, 'mes')}>
                          <option value="0" selected>Mês</option>
                          <option value="01" >Janeiro</option>
                          <option value="02">Fevereiro</option>
                          <option value="03">Março</option>
                          <option value="04">Abril</option>
                          <option value="05">Maio</option>
                          <option value="06">Junho</option>
                          <option value="07">Julho</option>
                          <option value="08">Agosto</option>
                          <option value="09">Setembro</option>
                          <option value="10">Outubro</option>
                          <option value="11">Novembro</option>
                          <option value="12">Dezembro</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div class="input-group mb-3">

                        <input type="number" class="form-control input-leste" aria-label="Recipient's username" 
                        aria-describedby="button-addon2" value={filtroIdade} 
                        onChange={(e)=> setFiltroIdade(e.target.value)} placeholder="Idade" min="0"/>

                        <div class="input-group-append">
                          <button class="btn btn-leste-outline" type="button" id="button-addon2" onClick={(e) => FiltrarPorMesOuIdade(filtroIdade, 'idade')}><i class="fas fa-search"></i></button>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="row">

                    <div className="col">
                      <button type="button" class="close" aria-label="Close"  data-toggle="collapse"  href="#multiCollapseExample1" role="button" style={{color: 'red'}}>
                        <span aria-hidden="true">&times;</span>
                      </button>

                    </div>

                  </div>
              </form>
            </div> */}
  
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
        
                <div className="alert alert-danger text-center" id="msgErro" style={{display: 'none'}}> 
                    <h1>Nenhum contato encontrado</h1> 
                </div>
              
            </div>
        
          


        </div>
    
      </div>
      
    </div>
  );
}



