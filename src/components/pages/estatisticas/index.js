import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
export default function Estatisticas(){

    const [totalFeminino, setTotalFeminino] = useState([])
    const [totalMasculino, setTotalMasculino] = useState([])
    const [totalGenero, setTotalGenero] = useState([])

    const [linguagens, setLinguagens] = useState([])

    const [ka, setKa] = useState([])

    function RenderPizzaChart() {

        let arrM = linguagens;

        let ka = []

        arrM.map((info) => (
                            
            ka.push({name:info.lingua, value: info.quantidade})
            
        ))

        return (

        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="value" isAnimationActive={false} data={ka}  cy={120} outerRadius={80} fill="#8884d8" label />     
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
  
        )


    }

//================================================================================================================================================

    
    useEffect(() => {
    
        async function pegarContatos() {
            
            let qtdFeminino = 0
            let qtdMasculino = 0
            
            let arrayTemp = [];
            
            const response = localStorage.getItem("contatosApi");
            let ListaDeContatos = JSON.parse(response);
            
        ListaDeContatos.map(contatos => {
            
            if (contatos.gender === "F") qtdFeminino += 1;
            if (contatos.gender === "M") qtdMasculino += 1;
            
            filtrarLinguagens(arrayTemp, contatos.language);
            
        })
        
        setTotalFeminino(qtdFeminino)
        setTotalMasculino(qtdMasculino)
        setTotalGenero(qtdFeminino + qtdMasculino)
        setLinguagens(arrayTemp);
        
   
    }
    
    pegarContatos();
    
    
    
}, []);


    function filtrarLinguagens(lista, lingua){

        let varItem = null;
        let index = null;

        lista.map((info, i) => { 

            if(info.lingua == lingua){

                index = i;

                varItem = info.lingua;
                
            }
            
        })
        
        if (varItem == null){
            lista.push({lingua:lingua, quantidade: 1});
        }else{
           
            lista[index].quantidade++;
        }


    }
        
    return(
<<<<<<< HEAD
<<<<<<< HEAD
      
=======

>>>>>>> master
        <div className="container-fluid">
=======

        <div className="container-fluid bg-white">
>>>>>>> a98be0d... foi caralho2

<<<<<<< HEAD

=======
>>>>>>> master
            <div className="card-body">

                <div class="jumbotron py-4">
                    <h1 class="display-4 text-center contato-h1">Estatisticas</h1>
                </div>

               
                    <div className="row">
                        <div className="card card-body col-sm-6">

                            <RenderLineChart total={totalGenero} qtdFem={totalFeminino} qtdMasc={totalMasculino}/>
                        </div>
                        
                        <div className="card card-body col-sm-6 ">
                            <RenderPizzaChart lingua={linguagens}/>
                        </div>

                    </div>


                    <hr/>

                    <div className="text-center">

                            <button class="btn btn-info btn-sm" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Listar por idiomas
                            </button>

                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">

                                <form class="form-row">

                                    <ul class="list-group">
                                    <li class="list-group-item text-center">Idioma | quantidade</li>
                                    {linguagens.map((info) => (
                                
                                        // <ul class="list-group-item list-group-item-action" >  : </ul>

                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            {info.lingua}
                                            <span class="badge badge-primary badge-pill">{info.quantidade}</span>
                                        </li>
                                        
                                    ))}

                                    </ul>
                                    
                                </form>
                               
                           
                            </div>

                        </div>

                </div>

        
            </div>
        </div>  

        <div class="container-fluid bg-white">

        </div> 

            
        );
                 
}
