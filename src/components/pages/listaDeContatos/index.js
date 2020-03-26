import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import './listaDeContatos.css';

export default function ListaDeContatos() {

  let alertaParametro = useParams()
  
  const [contatos, setContatos] = useState([])
  const [filtroLinguagem, setFiltroLinguagem] = useState([])
  const [filtroIdade, setFiltroIdade] = useState([])


  const [alertas, setAlertas] = useState([])
  
  useEffect(() => {

    async function pegarAlerta(alertaParametro) {

      let alerta = alertaParametro.alerta;

      verificaAlerta(alertaParametro.alerta);
      setAlertas(alerta)



    }

    pegarAlerta(alertaParametro);

    async function verificaAlerta(alerta) {

        if(alerta == 'editsuccess'){

         let x = document.querySelector('#alertaEditadoComSucesso');
         x.style.display = "block"; 

         let fadeEffect = setInterval(function () {

                x.style.display = "none";

         }, 2500);

        }

    }

  



    async function pegarContatos() {

        const response = localStorage.getItem("contatosApi");
        let ListaDeContatos = JSON.parse(response);
        setContatos(ListaDeContatos);

      }

      pegarContatos();
  
  }, []);

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

  async function deleteContact(id) {

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);

    let contato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == id))

    ListaDeContatos.splice(contato, 1)
    localStorage.setItem("contatosApi", JSON.stringify(ListaDeContatos))

    setContatos(ListaDeContatos)
  }

  function fecharFiltro(){


    let x = document.querySelector('#btn-filtro').classList.add('collapsed');
    let y = document.querySelector('#multiCollapseExample1').classList.remove('show');

    zerarFiltro();

  }


  return (
    <div className="container">
      <div className="card card-body my-2">

        <div class="jumbotron py-4  mb-2">
          <h1 class="display-4 text-center contato-h1">Lista de Contato</h1>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="alert alert-success text-center" id="alertaEditadoComSucesso" style={{display: 'none'}}>
              <h4>Usuário editado com sucesso</h4>
            </div>
          </div>
        </div>
       
          <div>
              <a  id="btn-filtro" class="btn btn-sm btn-outline-success" data-toggle="collapse" 
                href="#multiCollapseExample1" role="button" aria-expanded="false" 
                aria-controls="multiCollapseExample1">Filtro <i class="fas fa-filter"></i>
              </a>

              <button  class="btn btn-sm btn-outline-danger ml-2" role="button" href="#multiCollapseExample1" data-toggle="hide"
              onClick={fecharFiltro}>Limpar Filtro<i class="fas fa-filter"></i>
              </button>

          </div>

        <div class="row">
          <div class="col-sm-12">
            <div class="collapse multi-collapse" id="multiCollapseExample1">
              <form className="card card-body form-group">

                <div class="form-group row">

                  <div className="col-md-3">
                    <div class="dropdown">
                      <button class="btn btn-success dropdown-toggle mb-3" type="button" 
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
                        <button class="btn btn-outline-success" type="button" id="button-addon2" 
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
                        <button class="btn btn-outline-success" type="button" id="button-addon2" onClick={(e) => FiltrarPorMesOuIdade(filtroIdade, 'idade')}><i class="fas fa-search"></i></button>
                      </div>

                    </div>
                  </div>
                </div>
              </form>

            </div>
    
            <div className="card card-body shadow-custom mt-2">
              <div className="table-responsive tabela-custom">
                <table className="table table-sm  table-hover" >

                  <thead class="bg-dark text-white">
                    <tr className="text-center">
                      <th scope="col-md-2">Foto</th>
                      <th scope="col" >Id</th>
                      <th scope="col" >Nome</th>
                      <th scope="col" >Sobre Nome</th>
                      <th scope="col" >Email</th>
                      <th scope="col" >Gênero</th>
                      <th scope="col" > Linguagem</th>
                      <th scope="col" >Data de nascimento</th>
                      <th scope="col" >Operação</th>
                    </tr>
                  </thead>

                 

                  <tbody id="filtro" >
                    {contatos.map((info) => (
                      
                      <tr key={info.id} id={info.id} className="text-center">
                        <td><img class="img-thumbnail p-0 m-0" src={info.avatar} /></td>
                        <td >{info.id} </td>
                        <td>{info.first_name}</td>
                        <td>{info.last_name}</td>
                        <td>{info.email}</td>
                        <td>{info.gender}</td>
                        <td>{info.language}</td>
                        <td>{info.birthday}</td>
                        <td>
                            <div>
                                <Link to={{pathname: `/EditarContatos/${info.id}`}}><button type="button" class="btn btn-sm btn-secondary mr-2"><i class="fas fa-edit"></i></button></Link>
                                <button type="button" class="btn btn-sm btn-danger" onClick={()=>{deleteContact(info.id)}}><i class="fas fa-trash"></i></button>
                            </div>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

                <div className="alert alert-danger text-center" id="msgErro" style={{display: 'none'}}> 
                    <h1>Nenhum contato encontrado</h1> 
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



