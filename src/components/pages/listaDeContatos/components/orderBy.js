import React from 'react';

export default function OrderBy( { setContatos } ){

    async function OrderByNome(e){

        const response = await localStorage.getItem("ListaDeContatos");
        let ListaDeContatos = JSON.parse(response);
    
        let terceiroArray = [];
     
        if(e == "nome-crescente"){

            ListaDeContatos.sort(function(a, b){
                return (a.first_name > b.first_name) ? 1 : ((b.first_name > a.first_name) ? -1 : 0);
            });

            ListaDeContatos.map((info) => (
                terceiroArray.push(ListaDeContatos.find(n => n.id == info.id))
            ));

        }else if(e == "nome-decrescente"){
            
            ListaDeContatos.sort(function(a, b){
                return (a.first_name < b.first_name) ? 1 : ((b.first_name < a.first_name) ? -1 : 0);
            });

            ListaDeContatos.map((info) => (
                terceiroArray.push(ListaDeContatos.find(n => n.id == info.id))
            ));

        }
                
        setContatos(terceiroArray);
    
      }

    async function OrderIdioma(e){

        const response = await localStorage.getItem("ListaDeContatos");
        let ListaDeContatos = JSON.parse(response);
    
        let idomasOrdenado = [];
            
        if(e == "A-Z"){

            ListaDeContatos.sort(function(a, b){
                return (a.language > b.language) ? 1 : ((b.language > a.language) ? -1 : 0);
            });

        }else if(e == "Z-A"){

            ListaDeContatos.sort(function(a, b){
                return (a.language < b.language) ? 1 : ((b.language < a.language) ? -1 : 0);
            });
        }
    
        ListaDeContatos.map((info) => (
            idomasOrdenado.push(ListaDeContatos.find(n => n.id == info.id))
        ));
    
        setContatos(idomasOrdenado);
         
    }

    async function OrderIdade(e){

        const response = await localStorage.getItem("ListaDeContatos");
        let ListaDeContatos = JSON.parse(response);
    
        let lista = [];
        let listaOrdenada = [];

        if(e == "dia-crescente" || e == "dia-decrescente"){
            ListaDeContatos.map((info) => (
                lista.push({birthday:mascararIdade(info.birthday, "dia"), id:info.id})
            ));
        }else if(e == "mes-crescente" || e == "mes-decrescente"){
            ListaDeContatos.map((info) => (
                lista.push({birthday:mascararIdade(info.birthday, "mes"), id:info.id})
            ));
        }else if(e == "ano-crescente" || e == "ano-decrescente"){
            ListaDeContatos.map((info) => (
                lista.push({birthday:mascararIdade(info.birthday, "ano"), id:info.id})
            ));
        }
    
        if(e == "dia-crescente" || e == "mes-crescente" || e == "ano-crescente" ){

            lista.sort(function(a, b){
                return (a.birthday > b.birthday) ? 1 : ((b.birthday > a.birthday) ? -1 : 0);
            });
    
        }else if(e == "dia-decrescente" || e == "mes-decrescente" || e == "ano-decrescente"){

            lista.sort(function(a, b){
                return (a.birthday < b.birthday) ? 1 : ((b.birthday < a.birthday) ? -1 : 0);
            });
        }
    
        lista.map((info) => (
          listaOrdenada.push(ListaDeContatos.find(n => n.id == info.id))
        ));
    
        setContatos(listaOrdenada);
        
    }

    function mascararIdade(data, tipo){

        let data2 = String(data).split(' ');
        let days = String(data2[0]).split('/');
        let dataFormatada =  [days[2],"/", days[1],"/", days[0]];

        if( tipo == "dia" ){
            return dataFormatada[4];

        }else if(tipo == "mes"){

            return dataFormatada[2];

        }else if(tipo == "ano"){
            return dataFormatada[0];
        }

    }

    return(
        <div>
            <form className="form-orderBy-container" id="form-orderBy">

                <div class="text-center aa">
                    <h6>Nome</h6>

                    <div class="form-orderBy">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="radioNome" value="nome-crescente"
                            onClick={(e)=> OrderByNome(e.target.value)} 
                        />
                        <label class="form-check-label" for="exampleRadios1">
                        <i class="fas fa-sort-alpha-down"></i>
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="radioNome2" value="nome-decrescente" 
                            onClick={(e)=> OrderByNome(e.target.value)}
                        />
                        <label class="form-check-label" for="exampleRadios2">
                        <i class="fas fa-sort-alpha-up"></i>
                        </label>
                    </div>
                    </div>

                </div>

                <div className="text-center aa">
                    <h6  class="text-center px-2">Dia do nascimento</h6>
                    <div class="form-orderBy" id="coluna-idade">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="dia-crescente"  onClick={(e)=> OrderIdade(e.target.value)}/>
                        <label class="form-check-label" for="exampleRadios1">
                        <i class="fas fa-sort-numeric-down"></i>
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="dia-decrescente" onClick={(e)=> OrderIdade(e.target.value)}/>
                        <label class="form-check-label" for="exampleRadios2">
                        <i class="fas fa-sort-numeric-down-alt"></i>
                        </label>
                    </div>
                    </div>

                </div>

                

                <div class="text-center">
                    <h6 class="titulos-orderby">Mês</h6>
                    <div className="form-orderBy">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="mes-crescente"  onClick={(e)=> OrderIdade(e.target.value)}/>
                        <label class="form-check-label" for="exampleRadios1">
                        <i class="fas fa-arrow-down"></i>Jan-Dez
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="mes-decrescente" onClick={(e)=> OrderIdade(e.target.value)}/>
                        <label class="form-check-label" for="exampleRadios2">
                        <i class="fas fa-arrow-down"></i>Dez-Jan
                        </label>
                    </div>
                    </div>

                </div>

                <div class="text-center">
                    <h6 class="titulos-orderby">Ano</h6>
                    <div className="form-orderBy">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios7" value="ano-crescente"  onClick={(e)=> OrderIdade(e.target.value)}/>
                        <label class="form-check-label" for="exampleRadios1">
                        < i class="fas fa-sort-numeric-down"></i>
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios8" value="ano-decrescente" onClick={(e)=> OrderIdade(e.target.value)}/>
                        <label class="form-check-label" for="exampleRadios2">
                        <i class="fas fa-sort-numeric-up"></i>
                        </label>
                    </div>
                    </div>

                </div>

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
    )
}