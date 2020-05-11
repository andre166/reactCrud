import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, Collapse} from 'react-bootstrap';

import './estatisticas.css';

export default function Estatisticas(){

    const [totalFeminino, setTotalFeminino] = useState([])
    const [totalMasculino, setTotalMasculino] = useState([])
    const [totalGenero, setTotalGenero] = useState([])

    const [linguagens, setLinguagens] = useState([])
    const [open, setOpen] = useState(false);

    function RenderPizzaChart() {

        let arrM = linguagens;

        let ka = []

        arrM.map((info) => (               
            ka.push({name:info.lingua, value: info.quantidade}) 
        ))

        return (
            
            <div style={{ width: '100%', height: 400 }}>

                <ResponsiveContainer height={350}>
                    <PieChart  height={350}>

                        <Pie dataKey="value" isAnimationActive={false} data={ka}  cy={100} outerRadius={74} fill="#8884d8" label />     
                        <Tooltip />
        
                    </PieChart>
                </ResponsiveContainer>

            </div>
  
        )

    }


    function RenderLineChart (props) {

        const data = [ { Feminino: props.qtdFem, Masculino: props.qtdMasc, Total: props.total } ];

        
        return ( 

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart width={'100%'} height={350} data={data} margin={{ top: 20, right: 30, left: -27, bottom: 5 }}>

                        <CartesianGrid strokeDasharray="3 3" fill="white"/>
                        <XAxis dataKey="none" />
                        <YAxis />
                        <Tooltip/>
            
                        <Bar dataKey="Feminino" stackId="a" fill="pink" barSize={30} label={{ position: 'top' }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={'pink'} />
                            ))}
                        </Bar>

                        <Bar dataKey="Masculino" stackId="b" fill="Blue" barSize={30}  label={{ position: 'top' } }>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={'blue'}/>
                            ))}
                        </Bar>

                        <Bar dataKey="Total"  stackId="c" fill="gray" barSize={30} label={{ position: 'top' }}>
                            { data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={'gray'}/>
                            ))}
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>  
            </div>

        )
    
    };
    
    useEffect(() => {
    
        (async function pegarContatos() {
            
            let qtdFeminino = 0
            let qtdMasculino = 0
            
            let arrayTemp = [];
            
            const response = await localStorage.getItem("ListaDeContatos");
            let ListaDeContatos = JSON.parse(response);
            
            ListaDeContatos.map(contatos => {
            
                if (contatos.gender === "F") qtdFeminino += 1;
                if (contatos.gender === "M") qtdMasculino += 1;
                
                filtrarLinguagens(arrayTemp, contatos.language);
            
            });
        
        setTotalFeminino(qtdFeminino)
        setTotalMasculino(qtdMasculino)
        setTotalGenero(qtdFeminino + qtdMasculino)
        setLinguagens(arrayTemp);
        
        })();
    
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

        <div className="container-fluid bg-white ">
            <div className="card-body">

                <div class="jumbotron py-4">
                    <h1 class="display-4 text-center contato-h1">Estatisticas</h1>
                </div>
            
                <div className="row">
                    <div className="card card-body col-sm-6">

                        <div class="text-center alert alert-success" > <strong>Total de Usuários cadastrados por gênero</strong></div>

                        <RenderLineChart total={totalGenero} qtdFem={totalFeminino} qtdMasc={totalMasculino}/>
                        <div className="row">
                    
                            <div id="sexoIcon" className="col">

                            <div class="text-center" >
                                <i class="fas fa-venus"></i>
                                <i class="fas fa-mars"></i>
                                <i class="fas fa-venus-mars"></i>
                            </div>

                        </div>

                    </div>
                </div>
                
                <div className="card card-body col-sm-6 ">

                    <div class="text-center alert alert-success" ><strong>Quantidade de Usuários cadastrados por Idioma</strong></div>
                        <RenderPizzaChart lingua={linguagens}/>
                    </div>

                </div>

                <div className="text-center mt-2">

                    <button className="btn btn-softGreen-escuro"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        Listar por idiomas <i class="fas fa-arrow-down"></i>
                    </button>
                    <Collapse in={open}>
                        <Card body>

                            <form class="form-row lista-qtd-linguagem-container">
                                <ul class="list-group">
                                    <a class="list-group-item bg-softGreen-claro">
                                        <h4>
                                            <span>Idioma</span> 
                                            <span>Quantidade</span> 
                                        </h4>
                                    </a>

                                    {linguagens.map((info) => (
                                
                                        <li class="list-group-item d-flex justify-content-between align-items-center  lista-qtd-linguagem">
                                            <a>{info.lingua}</a>
                                            <a class="badge badge-pill">{info.quantidade}</a>
                                        </li>
                                        
                                    ))}

                                </ul>
                            </form>

                            <button size="sm" className="mt-2 btn btn-softDanger"
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}>

                                Fechar <i class="fas fa-arrow-up"></i>

                            </button>


                        </Card>
                       
                    </Collapse>

                </div>
            </div>
        </div>  
        
    );
    
}


           