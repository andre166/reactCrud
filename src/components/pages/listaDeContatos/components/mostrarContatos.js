import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import { Card, Button, Modal, Table, Tooltip } from 'react-bootstrap';


export default function MostrarContatos({ contatos, setContatos, tabelaDeContatos }){

    const [modalShow, setModalShow] = React.useState(false);
    const [idParaExclusao, setIdParaExclusao] = useState([]);

    useEffect(() => {
        if(tabelaDeContatos){
            contatosEmCards();
        }else{
            contatosEmTabela();
        }

    }, [tabelaDeContatos]);

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal className="text-center"
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="text-center">
                <h4 className="mb-2">Deseja Excluir?</h4>
                <hr/>
                <Button className="mr-2" onClick={()=>{deleteContact(idParaExclusao)}} variant="success">Sim</Button>
                <Button onClick={props.onHide} variant="danger">Não</Button>
            </Modal.Body>
            
          </Modal>
        );
      }

    // function socialIcon(posicaoNoArray, contato){
    //     if(posicaoNoArray == 0 && contato.first_name =="André" && contato.id == 1){
    //         return(
    //             <div className="socialIcon-card">
    //                 <a  href="https://www.facebook.com/andre.mesquitasd" target="_blank">
    //                     <i class="fab fa-facebook-f"></i>
    //                 </a>
    //                 <a  href="https://www.instagram.com/mesquitaandre/?hl=pt-br" target="_blank">
    //                     <i class="fab fa-instagram"></i>
    //                 </a>
                    
    //                 <a  href="https://www.linkedin.com/in/andr%C3%A9-mesquita-295974190/" target="_blank">
    //                     <i class="fab fa-invision"></i>
    //                 </a>

    //                 <a href="https://api.whatsapp.com/send?phone=5521981235902" target="_blank">
    //                     <i class="fab fa-whatsapp"></i>
    //                 </a>

    //                 <a href="https://github.com/andre166" target="_blank">
    //                     <i class="fab fa-github"></i>
    //                 </a>
    //             </div>
    //         );
    //     }
    // }

    function mascararIdade(data){

        let data2 = String(data).split(' ');
        let days = String(data2[0]).split('/');
        let dataFormatada =  [days[2],"/", days[1],"/", days[0]];
    
        let calendario = new Date;

        let anoAtual = calendario.getFullYear();
        let mesAtual = calendario.getMonth() + 1;
        let diaAtual = calendario.getDate();

        let anoAniversario = dataFormatada[0];
        let mesAniversario = dataFormatada[2];
        let diaAniversario = dataFormatada[4];
      
        let quantos_anos = anoAtual - anoAniversario;

        if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
            quantos_anos--;
        }

        if(quantos_anos < 0){
            quantos_anos = 0;
        }

        return quantos_anos;
    }

    function preExclusao(id){

        setIdParaExclusao(id);
        setModalShow(true);

    }

    function deleteContact(id) {

        localStorage.setItem("MSG", "ExcluidoSuccess");
        
        const response = localStorage.getItem("ListaDeContatos");
        let ListaDeContatos = JSON.parse(response);
        
        let contato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == id));
        
        ListaDeContatos.splice(contato, 1);
        
        localStorage.setItem("ListaDeContatos", JSON.stringify(ListaDeContatos));
        
        setContatos(ListaDeContatos);
        setModalShow(false)
    }

    function contatosEmCards(){

        return(
            <>
            {contatos.map((info, e) => ( 

                <div class='pb-0' key={info.id} id="cardUsuario" >
 
                    <Card>
                        <Card.Header>
                            <div>
                                {info.first_name} {info.last_name}
                            </div>
                            
                            <div id="menu-card-header">

                                <a type="button" variant="primary" onClick={()=>{preExclusao(info.id)}}>
                                    <i class="fas fa-trash"></i>
                                </a>

                                <Link to={{pathname: `/EditarContatos/${info.id}`}}><i class="fas fa-edit fa-edit-customizado"></i></Link>
                            
                            </div>
                        </Card.Header>

                        <div>
                            <img class="card-img-top" src={info.avatar}  id="img-card" alt="imagem de pessoa"/>
                        </div>

                        <div class="card-body-container">
                            <div className="card-body pb-2 p-0" id="card-info-usuario">
                            
                                <div className="idade_e_id-card">
                                    <p class="card-text"> <strong>Idade: </strong>{mascararIdade(info.birthday)} </p>
                                    <p data-tip={info.id} class="btn-id">id</p>   <ReactTooltip />   
                                </div>

                                <p class="card-text"><strong>Data de nascimento: </strong>{info.birthday}</p>
                                <p class="card-text"> <strong>Email: </strong>{info.email}</p>
                                <p class="card-text"><strong>Gênero: </strong>{info.gender == 'M' ? 'Masculino' : 'Feminino'}</p>
                                {/* <p class="card-text"><strong>Gênero: </strong>{info.gender}</p> */}
                                <p class="card-text"><strong>Idioma: </strong>{info.language}</p>
                            
                            </div>
                        </div>
                    </Card>
                </div>
          ))} 
           </>
        );
    }

    function contatosEmTabela(){

        return(
           
            <Table responsive striped bordered size="sm">
                <thead className="text-white titulo tabela">
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>Último Nome</th>
                    <th>Email</th>
                    <th>Gênero</th>
                    <th>Idade</th>
                    <th>Data de nascimento</th>
                    <th>Idioma</th>
                    <th>Operação</th>
                </thead>

           
                <tbody>
                    {contatos.map((info) => ( 
                        <tr key={info.id} className="tabela">
                            <td style={{width: 110}}><img class="card-img-top" src={info.avatar}  id="img-card" alt="imagem de pessoa" style={{width: 100, height: 80}} /></td>
                            <td>{info.first_name}</td>
                            <td>{info.last_name}</td>
                            <td style={{width: 50}}>{info.email}</td>
                            <td style={{width: 60}}>{info.gender == 'M' ? 'Masculino' : 'Feminino'}</td>
                            <td style={{width: 60}}>{mascararIdade(info.birthday)}</td>
                            <td style={{width: 100}}>{info.birthday}</td>
                            <td>{info.language}</td>

                            <td style={{width: 100}}>
                              <div className="operacao-tabela">
                                <div>
                                    <Button size="sm" variant="danger" onClick={()=>{preExclusao(info.id)}}> <i class="fas fa-trash"></i> </Button>
                                </div>

                                <div>
                                    <Link to={{pathname: `/EditarContatos/${info.id}`}}><Button size="sm" variant="info"><i class="fas fa-edit fa-edit-customizado"></i></Button></Link>
                                </div>

                              </div>


                            </td>
                        </tr>
                    ))} 
                </tbody>
                  
              
          
              
          </Table>
          
        );

    }
    
    return(
        <div class="card-group d-flex" id="lista-body">
        {/* <div class=""> */}
     
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
      
            { tabelaDeContatos == false ? contatosEmCards() : contatosEmTabela()}

            {/* {contatos.map((info, e) => ( 

                <div class='pb-0' key={info.id} id="cardUsuario" >
 
                    <Card>
                        <Card.Header>
                            <div>
                                {info.first_name} {info.last_name}
                            </div>
                            
                            <div id="menu-card-header">

                                <a type="button" variant="primary" onClick={()=>{preExclusao(info.id)}}>
                                    <i class="fas fa-trash"></i>
                                </a>

                                <Link to={{pathname: `/EditarContatos/${info.id}`}}><i class="fas fa-edit fa-edit-customizado"></i></Link>
                            
                            </div>
                        </Card.Header>

                        <div>
                            <img class="card-img-top" src={info.avatar}  id="img-card" alt="imagem de pessoa"/>
                        </div>

                        <div class="card-body-container">
                            <div className="card-body pb-2 p-0" id="card-info-usuario">
                            
                                <div className="idade_e_id-card">
                                    <p class="card-text"> <strong>Idade: </strong>{mascararIdade(info.birthday)}  {socialIcon(e, info)} </p>
                                    <p data-tip={info.id} class="btn-id">id</p>   <ReactTooltip />   
                                </div>

                                <p class="card-text"><strong>Data de nascimento: </strong>{info.birthday}</p>
                                <p class="card-text"> <strong>Email: </strong>{info.email}</p>
                                <p class="card-text"><strong>Gênero: </strong>{info.gender == 'M' ? info.gender = 'Masculino' : info.gender = 'Feminino'}</p>
                                <p class="card-text"><strong>Idioma: </strong>{info.language}</p>
                            
                            </div>
                        </div>
                    </Card>
                </div>
            ))}  */}
            
        </div>
    );
}