import React, {useEffect, useState} from 'react';
import api from './components/services/api';
import Routes from './routes';

import './App.css';

  export default function App() {

    useEffect(() => {
        
      async function loadApi2(){
      
          const response = await api.get();
          let contatos = response.data;

          let mesFiltrado = contatos.filter(n => n.birthday);
          
          mesFiltrado.map((info) => (
              info.birthday = formatData(info.birthday)
          ));
     
          function formatData(data){

              data = String(data).split(' ');
              var days = String(data[0]).split('-');

              var dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');
              
              return dataFormatada;
          }

          await localStorage.setItem("ListaDeContatos", JSON.stringify(contatos));
      

      };

      //Para não gerar erro com a api inicial do desafio 
      if(localStorage.getItem("contatosApi")){

          (async function loadApi(){
              await localStorage.removeItem("contatosApi");
              loadApi2();
          })();

      }else if(!localStorage.getItem("ListaDeContatos")){
          loadApi2();
          
      }else if(localStorage.getItem("ListaDeContatos").length == 2){
          localStorage.removeItem("ListaDeContatos");
          loadApi2();
      }
        

}, [localStorage.getItem("ListaDeContatos")]);


    return(
      <div>
        <Routes />
      </div>
    );

}


