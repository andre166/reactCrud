import React, {useEffect, useState} from 'react';
import api from './components/services/api';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SideNav from './components/sidenav';

  export default function App() {

  let [loading, setLoading] = useState(true);


    useEffect(() => {
        
      async function loadApi(){

        let contMasculino = -1;//Contatdores para substituir as fotos de robos por fts masculinas/Feminina
        let contFeminino = -1;
        
        let arrayMasculino = [ //Array de fts
            "https://i.ibb.co/c2ShfD7/a1.jpg","https://i.ibb.co/MRq2BbP/m3.jpg",
            "https://i.ibb.co/fxLkSxD/m6.jpg","https://i.ibb.co/Rbd7JPP/p3.png", "https://i.ibb.co/R2kcnFV/s8.jpg", 
            "https://i.ibb.co/tYw50y6/c1.jpg", "https://i.ibb.co/Qjb1Rqt/c4.jpg","https://i.ibb.co/bHjW2g5/s4.jpg", 
            "https://i.ibb.co/ssMLbxJ/s6.jpg", "https://i.ibb.co/gm0VG9b/m5.png", "https://i.ibb.co/dpN0k1r/dd5.jpg",
            "https://i.ibb.co/k50f4jD/dd6.jpg","https://i.ibb.co/YQvqxgX/dd3.jpg","https://i.ibb.co/MMBQNMG/aa3.jpg",
            "https://i.ibb.co/9yRfwvN/dd4.jpg", "https://i.ibb.co/S5QLPqx/aa1.jpg", "https://i.ibb.co/bNBFctg/aa2.jpg",
            "https://i.ibb.co/ssMLbxJ/s6.jpg", "https://i.ibb.co/gm0VG9b/m5.png", "https://i.ibb.co/dpN0k1r/dd5.jpg",
            "https://i.ibb.co/k50f4jD/dd6.jpg","https://i.ibb.co/YQvqxgX/dd3.jpg","https://i.ibb.co/MMBQNMG/aa3.jpg",
            "https://i.ibb.co/9yRfwvN/dd4.jpg", "https://i.ibb.co/S5QLPqx/aa1.jpg", "https://i.ibb.co/bNBFctg/aa2.jpg"
        ];
    
        let arrayFeminino = [//Array de fts
            "https://i.ibb.co/2nHvFcZ/p1.png", "https://i.ibb.co/Cwrq8K8/p2.png", "https://i.ibb.co/vsSjhgS/p4.png",
            "https://i.ibb.co/HVgfysX/cc4.jpg", "https://i.ibb.co/cbpJPxx/bb4.jpg", "https://i.ibb.co/KVBYG2V/bb1.jpg",
            "https://i.ibb.co/pXzxgbw/a3.png", "https://i.ibb.co/9TKJy0F/c4.jpg", "https://i.ibb.co/GTYX300/c5.jpg",
            "https://i.ibb.co/f4NjzNX/c6.jpg", "https://i.ibb.co/x6qQ8kN/cc6.jpg", "https://i.ibb.co/CVpzCLH/cc3.jpg",
            "https://i.ibb.co/Gkh58by/m7.jpg", "https://i.ibb.co/qktq1vF/m4.png",
            "https://i.ibb.co/2nHvFcZ/p1.png", "https://i.ibb.co/Cwrq8K8/p2.png", "https://i.ibb.co/vsSjhgS/p4.png",
            "https://i.ibb.co/HVgfysX/cc4.jpg", "https://i.ibb.co/cbpJPxx/bb4.jpg", "https://i.ibb.co/KVBYG2V/bb1.jpg",
            "https://i.ibb.co/pXzxgbw/a3.png", "https://i.ibb.co/9TKJy0F/c4.jpg", "https://i.ibb.co/GTYX300/c5.jpg",
            "https://i.ibb.co/f4NjzNX/c6.jpg", "https://i.ibb.co/x6qQ8kN/cc6.jpg", "https://i.ibb.co/CVpzCLH/cc3.jpg",
            "https://i.ibb.co/Gkh58by/m7.jpg", "https://i.ibb.co/qktq1vF/m4.png"
        ];
      
          const response = await api.get();
          let contatos = response.data;
          
          contatos.map((info) => ( //Formata a data dd/mm/aaaa e Substitui as fotos
              info.birthday = formatData(info.birthday),
              info.avatar = formatAvatar(info)
          ));

          function formatAvatar(info){

            if(info.gender == "F"){ //Verifica o gênero e coloca as fts do array masculino ou feminino
              contFeminino++;
              return arrayFeminino[contFeminino];
            }else {
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

        localStorage.setItem("ListaDeContatos", JSON.stringify(contatos));    
      
      };

      if(!localStorage.getItem("ListaDeContatos")){ //Verifica se já existe a Lista de contatos
          loadApi();
          
      }else if(localStorage.getItem("ListaDeContatos").length == 2){ // Caso exclua todos os contatos apaga a ListaDeContato e chama a Api do Moockaroo novamente
          localStorage.removeItem("ListaDeContatos");
          loadApi();
      }
        
      setLoading(false);
  }, [localStorage.getItem("ListaDeContatos")]);

  if(loading){ // caso a página esteja carregando mostra uma msg de loading
    return(
      <div className="loading-container">
        <p>
          Carregando...
        </p>
      </div>
    )
  }

    return(
      <div>
        <SideNav routes={Routes}>
          {/* <Routes /> */}
        </SideNav>
      </div>
    );

}


