import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, Legend } from 'recharts';
export default function Estatisticas(){

    const [totalFeminino, setTotalFeminino] = useState([])
    const [totalMasculino, setTotalMasculino] = useState([])
    const [totalGenero, setTotalGenero] = useState([])

    const [linguagens, setLinguagens] = useState([])

    function RenderPizzaChart() {

        let data01 = [ 
            {
                name: ' ',
                value: ''
            }
        ];

        {linguagens.map((info) => ( 

            data01.name = info.lingua,
            data01.value = info.quantidade

        ))}  

        console.log("a", data01)


  



        return (
            <PieChart width={400} height={400}>

                

                    <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                    
                

                <Tooltip />
            </PieChart>
        )

    }

//================================================================================================================================================

    function RenderLineChart (props) {

        const data = [

            { name: 'Total por genero', Feminino: props.qtdFem, Masculino: props.qtdMasc, Total: props.total},

        
        ];

        
        return ( 
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
            <Legend/>
           
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

        <div className="container">


            <div className="card card-body mt-4">

                <div class="jumbotron py-4">
                    <h1 class="display-4 text-center contato-h1">Estatisticas</h1>
                </div>

                <div className="card card-body">

                    <div className="row d-flex justify-content-center">

                    </div>
                      
    
                        <RenderLineChart total={totalGenero} qtdFem={totalFeminino} qtdMasc={totalMasculino}/>
                        <RenderPizzaChart lingua={linguagens.lingua}/>

                    <hr/>

                    <div className="row">
                    <div className="col-md-12 text-center">
                        
                        {linguagens.map((info) => (
                            
                            <p>{info.lingua} : {info.quantidade}</p>
                            
                        ))}

                    </div>
                        
                    </div>
                </div>
            </div>
        </div>  
        
    );
    
}


           