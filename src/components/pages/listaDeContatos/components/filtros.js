import React, {useState, useEffect} from "react"

export default function FiltrosDiv( { setContatos }) {

  let [filtroLinguagem, setFiltroLinguagem] = useState([]);
  let [filtroIdade, setFiltroIdade] = useState([]);
  let [filtroNome, setFiltroNome] = useState([]);


  function fecharFiltro(e){
    let x = document.querySelector('#btn-filtro').classList.add('collapsed');
    zerarFiltro("geral");
  }

  function formatData(data, obj, e, idadeOuMes){

    let data2 = String(data).split(' ');
    let days = String(data2[0]).split('/');
    let dataFormatada =  [days[2],"/", days[1],"/", days[0]];
    let dataFinal = dataFormatada[2];

    if(idadeOuMes == 'mes'){

      zerarFiltro("mes");

      if(dataFinal == e){
        return obj;
      }else{
        return '';
      }

    }else if(idadeOuMes == 'idade'){

      zerarFiltro("idade");

      let calendario = new Date;

      let anoAtual = calendario.getFullYear();
      let mesAtual = calendario.getMonth() + 1;
      let diaAtual = calendario.getDate();

      let anoAniversario = dataFormatada[0];
      let mesAniversario = dataFormatada[2];
      let diaAniversario = dataFormatada[4];
      
      let quantos_anos = anoAtual - anoAniversario;
      
      console.log("quantos_anos =>", quantos_anos)
      
      
      if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
        quantos_anos--;
      }
      
      let idadeDoContato = quantos_anos;

      if(idadeDoContato == e){
        return obj;
      }else{
        return '';
      }
      
    }

  }

  async function FiltrarPorMesOuIdade(e, idadeOuMes){

    if(e != 0){

      let x = 0;
      let ArrayM = [];
      let ArrayX = [];
      
      const response = await localStorage.getItem("ListaDeContatos");
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

      setContatos(ArrayX);
    }
  
  }

  async function FiltrarPorNome(e){

    if(e.length == 0){
      return;
    }

    let letraFormatada = e.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
    { return a.toUpperCase(); });

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    let cidadao = ListaDeContatos.filter(n => n.first_name == letraFormatada);

      setContatos(cidadao);
      zerarFiltro("nome");
  }

  async function filtrarLinguagem(e){

    if(e.length === 0 ){
      return;
    }

    let letraFormatada = e.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
    { return a.toUpperCase(); });

    const response = localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = await JSON.parse(response);

    let linguagemFiltrada = ListaDeContatos.filter(n => n.language == letraFormatada)

    setContatos(linguagemFiltrada);
    zerarFiltro("linguagem");

  }
  async function filtrarGenero(genero){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    if(genero === "F"){
      const newLista = ListaDeContatos.filter(person => person.gender == 'F');
      setContatos(newLista);

    }else if(genero === "M"){
      const newLista = ListaDeContatos.filter(person => person.gender == 'M');
      setContatos(newLista);
    }

    zerarFiltro("genero"); 
  }
        
  async function zerarFiltro(Filtro){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    if(Filtro === "nome"){

      setFiltroIdade('');
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "linguagem"){
      setFiltroIdade('');
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "genero"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');
      setFiltroIdade('');
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "idade"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "mes"){
      setFiltroIdade('');
      setFiltroNome('');
      setFiltroLinguagem('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "geral"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setContatos(ListaDeContatos);
      setFiltroLinguagem('');
      setFiltroIdade('');
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();
    }
  }

  async function OrderByNome(e){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    let nomeOrdenado = [];
    let terceiroArray = [];

      if(e == "A-Z"){

          ListaDeContatos.map((info) => (
            ordenar(info.first_name)
          ));

          function ordenar(nome){
            nomeOrdenado.push(nome);
          }

          nomeOrdenado.sort();

      
          nomeOrdenado.map((info) => (
            terceiroArray.push(ListaDeContatos.find(n => n.first_name == info))
          ));
            
          setContatos(terceiroArray);
          
        }else if(e == "Z-A"){
          
          let arr = ListaDeContatos.map((info) => (
            
            ordenar(info.first_name)

            ));
            
            nomeOrdenado.sort();
            
            function ordenar(nome){
              return nome;
            }

            arr.sort();

            let arr2 = ListaDeContatos.map((info, index) => (
            
              ordemDecrescente(index)
  
            ));

            function ordemDecrescente(index){

              return arr[arr.length - index - 1]; 
              
            }
            
            arr2.map((info) => (
              terceiroArray.push(ListaDeContatos.find(n => n.first_name == info))
            ));

            setContatos(terceiroArray);

          }
          

  }

  async function OrderIdioma(e){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    let idiomas = [];
    let idomasOrdenado = [];

    if(e == "A-Z"){

      ListaDeContatos.map((info) => (
        ordenar(info.language, info.id)
      ));

      function ordenar(idioma, id){
        idiomas.push({id:id, language:idioma});

      }

      idiomas.sort(function(a, b){

        return (a.language > b.language) ? 1 : ((b.language > a.language) ? -1 : 0);
      });


      idiomas.map((info) => (

        idomasOrdenado.push(ListaDeContatos.find(n => n.id == info.id))

      ));

      setContatos(idomasOrdenado);
     
    }else if(e == "Z-A"){
      
      ListaDeContatos.map((info) => (
        ordenar(info.language, info.id)
      ));

      function ordenar(idioma, id){
        idiomas.push({id:id, language:idioma});

      }

      idiomas.sort(function(a, b){

        return (a.language < b.language) ? 1 : ((b.language < a.language) ? -1 : 0);
      });

      console.log("idiomas Sort", idiomas)

      idiomas.map((info) => (

        idomasOrdenado.push(ListaDeContatos.find(n => n.id == info.id))

      ));

      setContatos(idomasOrdenado);

    }

  }



  function mascararIdade(data, tipo){

    let data2 = String(data).split(' ');
    let days = String(data2[0]).split('/');
    let dataFormatada =  [days[2],"/", days[1],"/", days[0]];

    if( tipo == "mes" ){
      return dataFormatada[2];
    }else{
      return dataFormatada[4];
    }

  }

  async function OrderMes(e){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    let lista = [];
    let listaOrdenada = [];

    ListaDeContatos.map((info) => (
      lista.push({birthday:mascararIdade(info.birthday, "mes"), id:info.id})
    ));

    
    if(e == "Jan-Dez"){

      lista.sort(function(a, b){
    
        return (a.birthday > b.birthday) ? 1 : ((b.birthday > a.birthday) ? -1 : 0);
      });

    }else if(e == "Dez-Jan"){
      lista.sort(function(a, b){
        return (a.birthday < b.birthday) ? 1 : ((b.birthday < a.birthday) ? -1 : 0);
      });
    }

    lista.map((info) => (
      listaOrdenada.push(ListaDeContatos.find(n => n.id == info.id))
    ));

    setContatos(listaOrdenada);

  }

  async function OrderIdade(e){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    let lista = [];
    let listaOrdenada = [];

    ListaDeContatos.map((info) => (
      lista.push({birthday:mascararIdade(info.birthday, "dia"), id:info.id})
    ));

    if(e == "Crescente"){
      lista.sort(function(a, b){
    
        return (a.birthday > b.birthday) ? 1 : ((b.birthday > a.birthday) ? -1 : 0);
      });

    }else if(e == "Decrescente"){
      lista.sort(function(a, b){
        return (a.birthday < b.birthday) ? 1 : ((b.birthday < a.birthday) ? -1 : 0);
      });
    }

    lista.map((info) => (
      listaOrdenada.push(ListaDeContatos.find(n => n.id == info.id))
    ));

    setContatos(listaOrdenada);
    
  }
        
  return(
    <div>
      <div>
          <a  id="btn-filtro" class="btn btn-sm btn-leste-outline" data-toggle="collapse" 
            href="#multiCollapseExample1" role="button" aria-expanded="false" 
            aria-controls="multiCollapseExample1">Filtro <i class="fas fa-filter"></i>
          </a>

          <button  class="btn btn-sm btn-outline-danger ml-2" role="button" href="#multiCollapseExample1" data-toggle="hide"
            onClick={() => {fecharFiltro('fechar')}}>Limpar Filtro<i class="fas fa-filter"></i>
          </button>
      </div> 
 
      <div class="row">
          <div class="col-sm-12">
         
{/* ===========================Adicionar collapse ================================ */}
            <div class=" multi-collapse" id="multiCollapseExample1">
              <form className="card card-body filtro-container form-group">

              <div className="text-center h4-ordenar mb-4">
              <h4>Filtrar por</h4>
              </div>

                <div class="form-group row ">
                  <div className="col-md-2">

                    <div class="dropdown">
                      <button class="btn btn-leste dropdown-toggle mb-3" type="button" 
                      id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Gênero
                      </button>

                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#multiCollapseExample1" data-toggle="collapse" onClick={(e)=> filtrarGenero("F")}>Feminino</a>
                          <a class="dropdown-item" href="#multiCollapseExample1" data-toggle="collapse" onClick={(e)=> filtrarGenero("M")}>Masculino</a>
                      </div>

                    </div>
                  </div>

                  <div className="col-md-3">
                    <div class="input-group mb-3">

                      <input type="text" class="form-control input-leste" aria-label="Recipient's username" 
                      aria-describedby="button-addon2" value={filtroNome} 
                      onChange={(e)=> setFiltroNome(e.target.value)} placeholder="Nome"/>

                      <div class="input-group-append">
                        <button class="btn btn-leste-outline" type="button" id="button-addon2" onClick={(e) => FiltrarPorNome(filtroNome)}><i class="fas fa-search"></i></button>
                      </div>

                    </div>
                  </div>
                
                  <div className="col-md-2">
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
                      <select class="custom-select input-leste" id="inputGroupSelect01" onChange={(e) => FiltrarPorMesOuIdade(e.target.value)}>
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

                  <div className="col-md-2">
                    <div class="input-group mb-3">

                      <input type="number" class="form-control input-leste" aria-label="Recipient's username" 
                      aria-describedby="button-addon2" value={filtroIdade} 
                      onChange={(e)=> setFiltroIdade(e.target.value)} placeholder="Idade" min="0"/>

                      <div class="input-group-append">
                        <button class="btn btn-leste-outline" type="button" id="button-addon2" onClick={(e) => FiltrarPorMesOuIdade(filtroIdade)}><i class="fas fa-search"></i></button>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">

                    <div className="text-center h4-ordenar">
                      <h4>Ordenar por</h4>
                    </div>
{/* ==================== INÍCIO DA ROW DE ORDENAÇÃO ================================= */}
                  <div >
                  <form className="form-orderBy-container" id="form-orderBy">
                    <div class="text-center aa">
                      <h6>Nome</h6>

                      <div class="form-orderBy">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="radioNome" value="A-Z"
                            onClick={(e)=> OrderByNome(e.target.value)} 
                          />
                          <label class="form-check-label" for="exampleRadios1">
                          <i class="fas fa-sort-alpha-down"></i>
                          </label>
                        </div>

                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="radioNome2" value="Z-A" 
                            onClick={(e)=> OrderByNome(e.target.value)}
                          />
                          <label class="form-check-label" for="exampleRadios2">
                          <i class="fas fa-sort-alpha-up"></i>
                          </label>
                        </div>
                      </div>

                    </div>

                    {/* ============== */}

                    <div className="text-center aa">
                      <h6  class="text-center px-2">Dia do nascimento</h6>
                      <div class="form-orderBy" id="coluna-idade">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Crescente"  onClick={(e)=> OrderIdade(e.target.value)}/>
                          <label class="form-check-label" for="exampleRadios1">
                          <i class="fas fa-sort-numeric-down"></i>
                          </label>
                        </div>

                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Decrescente" onClick={(e)=> OrderIdade(e.target.value)}/>
                          <label class="form-check-label" for="exampleRadios2">
                          <i class="fas fa-sort-numeric-down-alt"></i>
                          </label>
                        </div>
                      </div>

                    </div>

                    {/* ============== */}

                    <div class="text-center aa">
                      <h6 class="titulos-orderby">Mês</h6>
                      <div className="form-orderBy">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Jan-Dez"  onClick={(e)=> OrderMes(e.target.value)}/>
                          <label class="form-check-label" for="exampleRadios1">
                          <i class="fas fa-arrow-down"></i>Jan-Dez
                          </label>
                        </div>

                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="Dez-Jan" onClick={(e)=> OrderMes(e.target.value)}/>
                          <label class="form-check-label" for="exampleRadios2">
                          <i class="fas fa-arrow-down"></i>Dez-Jan
                          </label>
                        </div>
                      </div>

                    </div>

                    {/* ============== */}

                    <div class="text-center aa">
                      <h6 class="titulos-orderby">Idioma</h6>
                      <div className="form-orderBy">
                        <div class="form-check media-body">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="A-Z"  onClick={(e)=> OrderIdioma(e.target.value)}/>
                          <label class="form-check-label" for="exampleRadios1">
                          <i class="fas fa-sort-alpha-down"></i>
                          </label>
                        </div>

                        <div class="form-check media-body">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="Z-A" onClick={(e)=> OrderIdioma(e.target.value)}/>
                          <label class="form-check-label" for="exampleRadios2">
                          <i class="fas fa-sort-alpha-up"></i>
                          </label>
                        </div>

                      </div>
                    </div>
                  </form>
                 
                  </div>

                  </div>
                </div>

              </form>
              
            </div>
          </div>
      </div>
    </div>
  );

}
