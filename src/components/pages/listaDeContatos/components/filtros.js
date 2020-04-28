import React, {useState, useEffect} from "react"

export default function FiltrosDiv( { setContatos }) {

  let [filtroLinguagem, setFiltroLinguagem] = useState([]);
  let [filtroIdade, setFiltroIdade] = useState([]);


  useEffect(() => {

    (function mostrarBloco(){

    })();


  }, [filtroLinguagem]);


  function fecharFiltro(e){
    let x = document.querySelector('#btn-filtro').classList.add('collapsed');
    zerarFiltro("geral");
  }

  function formatData(data, obj, e, idadeOuMes){

    let data2 = String(data).split(' ');
    let days = String(data2[0]).split('/');
    let dataFormatada =  [days[2],"/", days[1],"/", days[0]];
    let dataFinal = dataFormatada[2]

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
      
      const response = await localStorage.getItem("contatosApi");
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

  async function filtrarLinguagem(e){

    if(e.length === 0 ){
      return;
    }

    let letraFormatada = e.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
    { return a.toUpperCase(); });

    const response = localStorage.getItem("contatosApi");
    let ListaDeContatos = await JSON.parse(response);

    let linguagemFiltrada = ListaDeContatos.filter(n => n.language == letraFormatada)

    setContatos(linguagemFiltrada);
    zerarFiltro("linguagem");

  }
  async function filtrarGenero(genero){

    const response = await localStorage.getItem("contatosApi");
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

    const response = await localStorage.getItem("contatosApi");
    let ListaDeContatos = JSON.parse(response);

    if(Filtro === "linguagem"){
      setFiltroIdade('');
      document.querySelector('#inputGroupSelect01').value = 0;

    }else if(Filtro === "genero"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');
      setFiltroIdade('');

    }else if(Filtro === "idade"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');

    }else if(Filtro === "mes"){
      setFiltroIdade('');
      setFiltroLinguagem('');

    }else if(Filtro === "geral"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setContatos(ListaDeContatos);
      setFiltroLinguagem('');
      setFiltroIdade('');
    }
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
            <div class="collapse multi-collapse" id="multiCollapseExample1">
              <form className="card card-body filtro-container form-group">

                <div class="form-group row ">
                  <div className="col-md-3">

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
              
            </div>
          </div>
      </div>
    </div>
  );

}
