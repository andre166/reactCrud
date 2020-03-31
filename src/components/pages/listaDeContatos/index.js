import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import './listaDeContatos.css';

export default function ListaDeContatos() {

  let alertaParametro = useParams()
  
  const [contatos, setContatos] = useState([])
  const [filtroLinguagem, setFiltroLinguagem] = useState([])
  const [filtroIdade, setFiltroIdade] = useState([])
  const [genderSimbol, setGenderSimbol] = useState([])


  const [alertas, setAlertas] = useState([])

  
  
  useEffect(() => {


    async function pegarAlerta(alertaParametro) {

      let alerta = alertaParametro.alerta;

      verificaAlerta(alertaParametro.alerta);
      setAlertas(alerta)

    }

    pegarAlerta(alertaParametro);

    async function pegarContatos() {

        const response = localStorage.getItem("contatosApi");
        let ListaDeContatos = JSON.parse(response);
        setContatos(ListaDeContatos);

      }

      pegarContatos();
  
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function filtrarFem(){

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);

    const newLista = ListaDeContatos.filter(person => person.gender == 'F');
    setContatos(newLista);

  }


  function filtrarMasc(){

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);

    const newLista = ListaDeContatos.filter(person => person.gender == 'M');

    setContatos(newLista);

  }

  function zerarFiltro(){

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);


    let limparFilroMes = document.querySelector('#inputGroupSelect01').value = 0;

    setContatos(ListaDeContatos);
    setFiltroLinguagem('');
    setFiltroIdade('');
    alerta(0)

  }

  function filtrarLinguagem(e){

    

    var letraFormatada = e.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
    { return a.toUpperCase(); });

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);

    let linguagemFiltrada = ListaDeContatos.filter(n => n.language == letraFormatada)


    alerta(linguagemFiltrada);
    
    
    setContatos(linguagemFiltrada);

  }

  function alerta(e){

    var x = document.getElementById("msgErro");

    if(e.length == 0){
      x.style.display = "block";    
    }else{
      x.style.display = "none";
    }

  }

  function formatData(data, obj, e, idadeOuMes){

      let data2 = String(data).split(' ');
      let days = String(data2[0]).split('-');
      let dataFormatada =  [days[2],"-", days[1],"-", days[0]];
      let dataFinal = dataFormatada[2]
    
    if(idadeOuMes == 'mes'){
    
      if(dataFinal == e){
        return obj;
      }else{
        return '';
      }

    }else if(idadeOuMes == 'idade'){

      let calendario = new Date;
      let anoAtual = calendario.getFullYear();
      let idadeDoContato = anoAtual - dataFormatada[0];

      if(idadeDoContato == e){
        return obj;
      }else{
        return '';
      }
      
    }


  }

  function FiltrarPorMesOuIdade(e, idadeOuMes){


    if(e != 0){

      let x = 0;
      let ArrayM = [];
      let ArrayX = [];
      
      const response = localStorage.getItem("contatosApi");
      let ListaDeContatos = JSON.parse(response);

      let mesFiltrado = ListaDeContatos.filter(n => n.birthday)

      ArrayM = mesFiltrado.map((info) => (
        formatData(info.birthday, info, e, idadeOuMes)
      ))

      for(let i = 0; i < ArrayM.length; i++){

        if(ArrayM[i] != ''){
          ArrayX[x] = ArrayM[i]
          x++
        }

      }

      alerta(ArrayX);

      setContatos(ArrayX);

    }

  }

  async function verificaAlerta(alerta) {

    if(alerta == 'editsuccess'){

     let x = document.querySelector('#alertaEditadoComSucesso');
     x.style.opacity = 1;
     x.style.display = "block"; 

     let fadeEffect = setInterval(function () {

      let fadeEffect2 = setInterval(function () {
        if (!x.style.opacity) {
            x.style.opacity = 1;
        }
        if (x.style.opacity > 0) {
            x.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect2);
            x.style.display = "none";
        }
      }, 200);


     }, 2000);

    }else if(alerta == 'excluido'){

    let x = document.querySelector('#alertaExcluidoComSucesso');
    x.style.opacity = 1;
     x.style.display = "block"; 

     setInterval(function () {

      let fadeEffect2 = setInterval(function () {
        if (!x.style.opacity) {
            x.style.opacity = 1;
        }
        if (x.style.opacity > 0) {
            x.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect2);
            x.style.display = "none";
        }
      }, 200);


     }, 2000);

    }

}

  async function deleteContact(id) {

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);

    let contato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == id))

    ListaDeContatos.splice(contato, 1)
    localStorage.setItem("contatosApi", JSON.stringify(ListaDeContatos))

    setContatos(ListaDeContatos);

    verificaAlerta('excluido');

  }

  

  function fecharFiltro(e){

      let x = document.querySelector('#btn-filtro').classList.add('collapsed');
      zerarFiltro();

  }

  let x = 0;

  function contX(){
    
    x++
  }

  return (
    <div className="container-fluid">
      <div className="card card-body my-2">

        <div class="jumbotron py-4  mb-2">
          <h1 class="display-4 text-center contato-h1">Lista de Contato</h1>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="alert alert-success text-center" id="alertaEditadoComSucesso" style={{display: 'none'}}>
              <h4>Usuário editado com sucesso</h4>
            </div>
            <div className="alert alert-warning text-center" id="alertaExcluidoComSucesso" style={{display: 'none'}}>
              <h4>Usuário excluído com sucesso</h4>
            </div>
          </div>
        </div>
       
          <div>
              <a  id="btn-filtro" class="btn btn-sm btn-outline-info" data-toggle="collapse" 
                href="#multiCollapseExample1" role="button" aria-expanded="false" 
                aria-controls="multiCollapseExample1">Filtro <i class="fas fa-filter"></i>
              </a>

              <button  class="btn btn-sm btn-outline-danger ml-2" role="button" href="#multiCollapseExample1" data-toggle="hide"
                onClick={() => {fecharFiltro('fechar')}}>Limpar Filtro<i class="fas fa-filter"></i>
              </button>

          </div>

        <div class="row">
          <div class="col-sm-12">
            <div class="collapse multi-collapse" id="multiCollapseExample1">
              <form className="card card-body form-group">

                <div class="form-group row">

                  <div className="col-md-3">
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle mb-3" type="button" 
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

                      <input type="text" class="form-control" readonly aria-label="Recipient's username" 
                      aria-describedby="button-addon2" value={filtroLinguagem} onChange={(e)=> setFiltroLinguagem(e.target.value)} placeholder="linguagem"/>
                        
                      <div class="input-group-append">
                        <button class="btn btn-outline-info" type="button" id="button-addon2" 
                        onClick={(e) =>  filtrarLinguagem(filtroLinguagem)}>
                        <i class="fas fa-search"></i></button>
                      </div>

                    </div>
                  </div>

                  <div className="col-md-2">
                    <div class="input-group mb-3">
                      <select class="custom-select" id="inputGroupSelect01" onChange={(e) => FiltrarPorMesOuIdade(e.target.value, 'mes')}>
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

                      <input type="number" class="form-control" aria-label="Recipient's username" 
                      aria-describedby="button-addon2" value={filtroIdade} 
                      onChange={(e)=> setFiltroIdade(e.target.value)} placeholder="Idade" min="0"/>

                      <div class="input-group-append">
                        <button class="btn btn-outline-info" type="button" id="button-addon2" onClick={(e) => FiltrarPorMesOuIdade(filtroIdade, 'idade')}><i class="fas fa-search"></i></button>
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


            </div>
            {/* ============================ */}
            <hr className="mb-0"/>
            <div class="card card-group d-flex justify-content-center border-0">
              {contatos.map((info, e) => (
                
                <div class="shadow mx-4 mt-4 mb-0 pb-0" key={info.id} id="cardUsuario" >
                  <div class="card-body">
                  {/* <span id="numeroDoCard" class="text-center m-0 p-0">{e = e +1}</span> style={{width: '20px'}, {maxWidth: '18.2rem'}, {height: 'auto'}}*/}
                  <div class="d-flex justify-content-center">
                      <img class="card-img-top img-fluid img-thumbnail rounded-circle shadow mb-2" src={info.avatar}  style={{height: '8rem'}, {maxWidth: '14rem'}} id="img-card"/>
                  </div>

                  <div className="card-body pb-2" id="card-info-usuario">
           
                    <p class="card-title"><strong>Nome: </strong>{info.first_name} {info.last_name}</p>
                    <hr/>
                    <p class="card-text"> <strong>Email: </strong>{info.email}</p>
                    <hr/>
                    <p class="card-text"><strong>Gênero: </strong>{info.gender == 'M' ? info.gender = 'Masculino' : info.gender = 'Feminino' } </p>
                    <hr/>
                    <p class="card-text"><strong>Idioma: </strong>{info.language}</p>
                    <hr/>
                    <p class="card-text"><strong>Data de nascimento: </strong>{info.birthday}</p>
                    <hr/>

            


                      <div className="row mt-2 mb-0">
        

                          <div className="col-sm-12">

                            <div class="btn-block">
                              <Link to={{pathname: `/EditarContatos/${info.id}`}} className="btn-block"><button type="button" class="btn-block btn btn-info btn-sm"><i class="fas fa-edit"></i> Editar</button></Link>
                            </div>
                            
                         

                              <div class="btn-group dropup btn-block">
                                <button type="button" class="btn btn-danger dropdown-toggle btn-sm" data-toggle="dropdown">
                                  <i class="fas fa-trash"> Excluir</i>
                                </button>

                                <div class="dropdown-menu">
                                  <div className="card-body col-md-12 text-center">

                                    <p class="" >Deseja excluir?</p>
                                    <hr/>

                                    <a href="#" class="btn btn-success btn-sm mr-2 " onClick={()=>{deleteContact(info.id)}}>Sim</a>
                                    <a href="#" class="btn btn-danger btn-sm ml-2">Não</a>
                                  
                                  </div>
                                </div>
                              </div>      

                          </div>

                         
                       

                      </div>


                  </div>
                  </div>

              </div>
                ))}
                </div>

{/* ============================ */}
        
                <div className="alert alert-danger text-center" id="msgErro" style={{display: 'none'}}> 
                    <h1>Nenhum contato encontrado</h1> 
                </div>
              
            </div>
        
          


        </div>
      </div>
      
    </div>
  );
}



