import React, {useEffect, useState} from 'react';
import api from './components/services/api';
import Routes from './routes';

// https://i.ibb.co/2nHvFcZ/p1.png M
// https://i.ibb.co/Cwrq8K8/p2.png M
// https://i.ibb.co/vsSjhgS/p4.png M
// https://i.ibb.co/Gkh58by/m7.jpg M
// https://i.ibb.co/qktq1vF/m4.png M
// https://i.ibb.co/vdRfd8V/m6.png  M
// https://i.ibb.co/Vt68JNV/m10.jpg  M
// https://i.ibb.co/y5C6d9B/a5.jpg
// https://i.ibb.co/YcqSQhy/a1.jpg
// https://i.ibb.co/KmYcdNF/a2.jpg
// https://i.ibb.co/pXzxgbw/a3.png
// https://i.ibb.co/1qdMkjK/a4.jpg


//========Homens ================ 

// https://i.ibb.co/Rbd7JPP/p3.png H
// https://i.ibb.co/c2ShfD7/a1.jpg H
// https://i.ibb.co/MRq2BbP/m3.jpg H
// https://i.ibb.co/fxLkSxD/m6.jpg H
// https://i.ibb.co/gm0VG9b/m5.png H
// https://i.ibb.co/ssMLbxJ/s6.jpg
// https://i.ibb.co/R2kcnFV/s8.jpg
// https://i.ibb.co/tYw50y6/c1.jpg
// https://i.ibb.co/Qjb1Rqt/c4.jpg
// https://i.ibb.co/bHjW2g5/s4.jpg

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


