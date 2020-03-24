import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Css from './estatisticas.css';
export default function Estatisticas(){

    const [totalFeminino, setTotalFeminino] = useState([])
    const [totalMasculino, setTotalMasculino] = useState([])
    const [totalGenero, setTotalGenero] = useState([])

    const [linguagens, setLinguagens] = useState([])

    function RenderPizzaChart() {

        let arrM = linguagens;

        let ka = []

        arrM.map((info) => (
                            
            ka.push({name:info.lingua, value: info.quantidade})
            
        ))

        return (

        <div id="barChart" style={{ width: '100%', height: 300 }}>

            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="value" isAnimationActive={false} data={ka} cx={'50%'} cy={110} outerRadius={70} fill="#8884d8" label />     
                    <Tooltip />
                    <Legend wrapperStyle={{ top: 240, right: 20, backgroundColor: '#f5f5f5' }}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
  
        )


    }

//================================================================================================================================================

    function RenderLineChart (props) {

        const data = [

            { name: 'Total por genero', Feminino: props.qtdFem, Masculino: props.qtdMasc, Total: props.total},

        
        ];

        
        return ( 
            <div style={{ width: '100%', height: 300} }>

            <div className="text-center">Total de Pessoas cadastradas por gênero</div>

            <ResponsiveContainer>
            <BarChart
            
                width={500}
                height={350}
                data={data}

            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" fill="white"/>
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Legend  wrapperStyle={{ top: 240, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, margin: 20}} */}
            />
            <Tooltip/>
           
            <Bar dataKey="Feminino" stackId="a" fill="pink" barSize={30} label={{ position: 'top' }}>
                {
                    data.map((entry, index) => (

                        <Cell key={`cell-${index}`} fill={'pink'} />
               
                    ))
                    
                }
            </Bar>

            <Bar dataKey="Masculino" stackId="b" fill="Blue" barSize={30}  label={{ position: 'top' } }>
                {
                    data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={'blue'}/>
                    ))
                }
            </Bar>

            <Bar dataKey="Total"  stackId="c" fill="gray" barSize={30} label={{ position: 'top' }}>
            {
                data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={'gray'}/>
                ))
            }
            </Bar>

          </BarChart>
          </ResponsiveContainer>
          </div>

        )
    
    };
    
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

        <div className="container-fluid bg-white">

          

            <div class="jumbotron py-4 text-center">
                <h1 class="display-4  contato-h1">Estatisticas</h1>
            </div>

      

            

            <div className="row">

                <div className="col-sm-6">

                    <RenderLineChart total={totalGenero} qtdFem={totalFeminino} qtdMasc={totalMasculino}/>
                </div>
                
                <div className="col-sm-6 ">
                    <RenderPizzaChart lingua={linguagens}/>
                </div>

            </div>


            
            <div className="row mt-4">

                <div className="col-sm-5">

                </div>

                <div className="text-center col-sm-2">

                    <button class="btn btn-info mt-4" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Lista de idiomas
                    </button>

                    <div class="collapse" id="collapseExample">
                        <ul className="list-group">

                            <li class="list-group-item list-group-item-success text-center">Idiomas | Quantidade
                
                            </li>
                            {linguagens.map((info) => (
                                
                    
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    {info.lingua} 
                                    <span class="badge badge-success badge-pill">{info.quantidade}</span>
                                </li>
                                
                            ))}

                        </ul>

                        <button class="btn btn-danger" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Fechar
                        </button>

                    </div>
                </div>  

            </div>    

        </div>  
        
    );
    
}


           