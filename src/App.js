import React, {useEffect, useState} from 'react';
import api from './components/services/api';
import Routes from './routes';

// https://i.ibb.co/2nHvFcZ/p1.png 
// https://i.ibb.co/Cwrq8K8/p2.png 
// https://i.ibb.co/vsSjhgS/p4.png 
// https://i.ibb.co/Gkh58by/m7.jpg 
// https://i.ibb.co/qktq1vF/m4.png 
// https://i.ibb.co/qktq1vF/m4.png  
// https://i.ibb.co/pXzxgbw/a3.png
// https://i.ibb.co/9TKJy0F/c4.jpg
// https://i.ibb.co/GTYX300/c5.jpg
// https://i.ibb.co/f4NjzNX/c6.jpg
// https://i.ibb.co/x6qQ8kN/cc6.jpg
// https://i.ibb.co/CVpzCLH/cc3.jpg
// https://i.ibb.co/HVgfysX/cc4.jpg


//========Homens ================ 

// https://i.ibb.co/Rbd7JPP/p3.png 
// https://i.ibb.co/c2ShfD7/a1.jpg 
// https://i.ibb.co/MRq2BbP/m3.jpg 
// https://i.ibb.co/fxLkSxD/m6.jpg 
// https://i.ibb.co/R2kcnFV/s8.jpg
// https://i.ibb.co/tYw50y6/c1.jpg
// https://i.ibb.co/Qjb1Rqt/c4.jpg
// https://i.ibb.co/bHjW2g5/s4.jpg

// https://i.ibb.co/dpN0k1r/dd5.jpg
// https://i.ibb.co/k50f4jD/dd6.jpg
// https://i.ibb.co/YQvqxgX/dd3.jpg
// https://i.ibb.co/9yRfwvN/dd4.jpg

// https://i.ibb.co/gm0VG9b/m5.png 
// https://i.ibb.co/ssMLbxJ/s6.jpg


// https://i.ibb.co/MMBQNMG/aa3.jpg
// https://i.ibb.co/S5QLPqx/aa1.jpg
// https://i.ibb.co/bNBFctg/aa2.jpg

// https://i.ibb.co/cbpJPxx/bb4.jpg
// https://i.ibb.co/KVBYG2V/bb1.jpg

import './App.css';

  export default function App() {

    useEffect(() => {
        
      async function loadApi2(){

        let contMasculino = -1;
        let contFeminino = -1;
        
        let arrayMasculino = [
            "https://i.ibb.co/c2ShfD7/a1.jpg","https://i.ibb.co/MRq2BbP/m3.jpg",
            "https://i.ibb.co/fxLkSxD/m6.jpg","https://i.ibb.co/Rbd7JPP/p3.png", "https://i.ibb.co/R2kcnFV/s8.jpg", 
            "https://i.ibb.co/tYw50y6/c1.jpg", "https://i.ibb.co/Qjb1Rqt/c4.jpg","https://i.ibb.co/bHjW2g5/s4.jpg", 
            "https://i.ibb.co/ssMLbxJ/s6.jpg", "https://i.ibb.co/gm0VG9b/m5.png", "https://i.ibb.co/dpN0k1r/dd5.jpg",
            "https://i.ibb.co/k50f4jD/dd6.jpg","https://i.ibb.co/YQvqxgX/dd3.jpg","https://i.ibb.co/MMBQNMG/aa3.jpg",
            "https://i.ibb.co/9yRfwvN/dd4.jpg", "https://i.ibb.co/S5QLPqx/aa1.jpg", "https://i.ibb.co/bNBFctg/aa2.jpg"
        ];
    
        let arrayFeminino = [
            "https://i.ibb.co/2nHvFcZ/p1.png", "https://i.ibb.co/Cwrq8K8/p2.png", "https://i.ibb.co/vsSjhgS/p4.png",
            "https://i.ibb.co/HVgfysX/cc4.jpg", "https://i.ibb.co/cbpJPxx/bb4.jpg", "https://i.ibb.co/KVBYG2V/bb1.jpg",
            "https://i.ibb.co/pXzxgbw/a3.png", "https://i.ibb.co/9TKJy0F/c4.jpg", "https://i.ibb.co/GTYX300/c5.jpg",
            "https://i.ibb.co/f4NjzNX/c6.jpg", "https://i.ibb.co/x6qQ8kN/cc6.jpg", "https://i.ibb.co/CVpzCLH/cc3.jpg",
            "https://i.ibb.co/Gkh58by/m7.jpg", "https://i.ibb.co/qktq1vF/m4.png"
        ];
      
          const response = await api.get();
          let contatos = response.data;

        //   let mesFiltrado = contatos.filter(n => n.birthday);
          
          contatos.map((info) => (
              info.birthday = formatData(info.birthday),
              info.avatar = formatAvatar(info)
          ));

          function formatAvatar(info){

            if(info.gender == "F"){
                contFeminino++;
                return arrayFeminino[contFeminino];
            }if(info.gender == "M" && contMasculino == -1){
                
                info.first_name = "André";
                info.last_name = "Mesquita";
                info.email = "andremp1927@hotmail.com";
                info.language = "Portuguese";
                info.gender = "M";
                info.birthday = "25/11/1993";
                info.avatar = "https://i.ibb.co/Rc9v5hx/eu.jpg";
                
                contMasculino ++;
                // return arrayMasculino[contMasculino];

            }else{
                contMasculino++;
                return arrayMasculino[contMasculino];
            }

          }
     
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


