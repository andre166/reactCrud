import React, { useState, useEffect } from 'react';
import './listaDeContatos.css';
import FiltrosDiv from './components/filtros';
import AlertaZeroContato from './components/alertZeroContato';
import MostrarContatos from './components/mostrarContatos';
import SnackBar from "./components/snackBarAlert";

export default function ListaDeContatos() {

  const [contatos, setContatos] = useState([])

  useEffect(() => {

    (async function pegarContatos() {

      const response = await localStorage.getItem("contatosApi");
      let ListaDeContatos = JSON.parse(response);
      setContatos(ListaDeContatos);

    })();
  
  }, [localStorage.getItem("contatosApi")]);

  return (
    <div>

      <div className="container-fluid container-listaDeContatos">
        <div className="card card-body my-2">

          <div class="jumbotron py-4  mb-2">
            <h1 class="display-4 text-center">Lista de Contatos</h1>
          </div>

          <FiltrosDiv setContatos={setContatos}></FiltrosDiv>
            
          <div class="row">
              <div class="col-sm-12">

                <MostrarContatos contatos={contatos}></MostrarContatos>

                <AlertaZeroContato contatos={contatos}></AlertaZeroContato>

              </div>
          </div>

        </div>
      </div>
      
      <SnackBar/>

    </div>
  );
}