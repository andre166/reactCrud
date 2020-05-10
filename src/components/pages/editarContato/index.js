import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import './editarContato.css';
import {Container, Row, Card, Jumbotron, Col, Form, Button, Collapse } from 'react-bootstrap';


export default function EditarContatos() {

    let idParams = useParams()

    const [contatos, setContatos] = useState([])
    const [posicaoDocontato, setposicaoDocontato] = useState([]);
    const [ListaContatos, setListaContatos] = useState([]);

    let [id, setId] = useState("")
    let [first_name, setFirstName] = useState("")
    let [last_name, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [gender, setGender] = useState("")
    let [language, setLanguage] = useState("")
    let [avatar, setAvatar] = useState("")
    let [birthday, setBirthday] = useState("")

    let ContatoEditado = false;
    let history = useHistory();
    const [openFotoDiv, setOpenFotoDiv] = useState(false);

    useEffect(() => {
      
        (async function pegarContato(idParams) {

            let idConvertido = parseInt(idParams.id);

            setId(idConvertido)

            const response = await localStorage.getItem("ListaDeContatos");
            let ListaDeContatos = JSON.parse(response);
            setListaContatos(ListaDeContatos);

            let posicaoContato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == idConvertido));

            setposicaoDocontato(posicaoContato);

            let contato = ListaDeContatos[posicaoContato];   

            setContatos(contato);

            let data = String(contato.birthday).split(' ');
            let days = String(data[0]).split('/');
            let dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');

            setFirstName(contato.first_name)
            setLastName(contato.last_name)
            setEmail(contato.email)
            setGender(contato.gender)
            setLanguage(contato.language)
            setAvatar(contato.avatar)
            setBirthday(dataFormatada)

        })(idParams);
      
    }, []);

    async function editarContato(){

        let newContact = [];
        let data = [];
        let days = [];
        let dataFormatada = [];
        
        if(birthday.indexOf("-") > -1){

            data = String(birthday).split(' ');
            days = String(data[0]).split('-');
            dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');
            
        }else{

            data = String(birthday).split(' ');
            days = String(data[0]).split('/');
            dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');

        }

        let languageFormatada = language.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
        { return a.toUpperCase(); });

        birthday = dataFormatada;
        language = languageFormatada;
        
        newContact = {id, first_name, last_name, email, gender, language, avatar, birthday};
        
        ListaContatos[posicaoDocontato] =  newContact;

        await localStorage.setItem("ListaDeContatos", JSON.stringify(ListaContatos));

        if(ContatoEditado){

            await localStorage.setItem("MSG", "EditadoSuccess");

        }

    }

    async function deleteContact(id) {
        
        await localStorage.setItem("MSG", "ExcluidoSuccess");
        
        let contato = ListaContatos.indexOf(ListaContatos.find(n => n.id == id));

        ListaContatos.splice(contato, 1);

        await localStorage.setItem("ListaDeContatos", JSON.stringify(ListaContatos));

        return history.push("/ListaDeContatos");
    }


 return (
    <div class="container-editarContato">
        <Container>
            <Card body>
                <Jumbotron className="py-4 mb-2">
                    <h1 class="text-center">Editar Contato</h1>
                </Jumbotron>

                <Row>
                    <Col>
                        <Card>

                            <div className="text-center mt-2">
                                <img class="card-img-top img-thumbnail rounded-circle imagem-editar" src={contatos.avatar} alt="Card image cap" />
                            </div>

                            <div className="text-center px-2 mb-2">

                                <Button className="mt-2" variant="info" onClick={() => setOpenFotoDiv(!openFotoDiv)} aria-controls="example-collapse-text" aria-expanded={openFotoDiv} >
                                    Alterar foto
                                </Button>
                            
                                <Collapse in={openFotoDiv}>
                                    <Card body>
                                        <Col>
                                            <label for="validationServer02">Digite a Url</label>
                                            <input type="url" class="form-control input-url" id="validationServer02" 
                                                value={avatar}  onChange={(e)=> setAvatar(e.target.value)} placeholder="Digite a url"/>

                                            <Col>
                                                <button type="button" class="close closeIcon" aria-label="Close"  data-toggle="collapse"  
                                                    href="#multiCollapseExample1" role="button" onClick={()=> setAvatar('')}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </Col>
                                        </Col>
                                    </Card>
                                </Collapse>

                            </div>

                        </Card>
                    </Col>
                
                    <Col md={8}>
                        <Card body>

                            <Form onSubmit={editarContato} action={  `/ListaDeContatos`  }>
                        
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label >Primeiro Nome:</Form.Label>
                                            <Form.Control type="text" id="exampleInputEmail1" maxLength="17"
                                            placeholder="Primeiro nome"  value={first_name} onChange={(e)=> setFirstName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label >Ultimo Nome:</Form.Label>
                                            <Form.Control type="text" class="form-control" id="exampleInputEmail1" maxLength="17"
                                            placeholder="Ultimo nome"  value={last_name} onChange={(e)=> setLastName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>

                                </Row>
                            
                                <Row>
                                    
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label >Email:</Form.Label>
                                            <Form.Control type="text" class="form-control" id="exampleInputEmail1" maxLength="30"  
                                            placeholder="Email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                                        </Form.Group>
                                    </Col>


                                    <Col sm={4}>

                                        <div className="mt-4">

                                            <Form.Check inline label="Masculino" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="M"   onChange={e => setGender(e.target.value) } />

                                            <Form.Check inline label="Feminino" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="F"   onChange={e => setGender(e.target.value)} />

                                        </div>
                                        
                                    </Col>
                                
                                </Row>

                                <Row>
                                    
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label for="exampleInputEmail1">Linguagem:</Form.Label>
                                            <Form.Control type="text" class="form-control" id="exampleInputEmail1" 
                                            placeholder="Enter email" value={language} 
                                            onChange={(e)=> setLanguage(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label for="exampleInputPassword1">Data de nascimento:</Form.Label>
                                            <Form.Control type="date" class="form-control" id="exampleInputPassword1" 
                                            value={birthday} onChange={(e)=> setBirthday(e.target.value)}/>
                                        </Form.Group>
                                    </Col>

                                </Row> 

                                <hr/>

                                <Row>
                                    <Col className="text-center">
                                        <button type="submit" class="btn btn-leste" onClick={()=>{ ContatoEditado = true}} >Confirmar</button>
                                        <button type="button" class="btn btn-danger ml-2" onClick={()=>{deleteContact(id)}}>Excluir</button>
                                    </Col>
                                </Row> 

                            
                            </Form>

                        </Card>
                    </Col>
                </Row> 
            </Card> 
        </Container>
    </div>
 )
}




