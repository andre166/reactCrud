import React, {useState } from "react"
import OrderBy from './orderBy';
import {Container, Row, Card, Jumbotron, Col, Form, Dropdown, InputGroup, FormControl,  Accordion, Button} from 'react-bootstrap';

export default function FiltrosDiv( { setContatos, tabelaDeContatos, setTabelaDeContatos }) {

  let [filtroLinguagem, setFiltroLinguagem] = useState([]);
  let [filtroIdade, setFiltroIdade] = useState([]);
  let [filtroNome, setFiltroNome] = useState([]);


  function formatData(contato, e, tipo){

    let data2 = String(contato.birthday).split(' ');
    let days = String(data2[0]).split('/');

    if(tipo == 'mes'){

      zerarFiltro("mes");

      if(days[1] == e){
        return contato;
      }else{
        return '';
      }

    }else if(tipo == 'idade'){

      zerarFiltro("idade");

      let calendario = new Date;

      let anoAtual = calendario.getFullYear();
      let mesAtual = calendario.getMonth() + 1;
      let diaAtual = calendario.getDate();

      let diaAniversario = parseInt(days[0]);
      let mesAniversario = parseInt(days[1]);
      let anoAniversario = parseInt(days[2]);

      let idadeAtual = anoAtual - anoAniversario;    
      
      if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
        idadeAtual--;
      }

      if(idadeAtual == e){
        return contato;
      }else{
        return '';
      }
      
    }

  }

  async function filtrarPorMesOuIdade(e, tipo){

    if(e == 0){ 
      return;
    }
    
    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    let contatosFiltrados = ListaDeContatos.filter((contato) => (
      formatData(contato, e, tipo)
    ))
  
    setContatos(contatosFiltrados);
    
  }

  async function filtrarPorNome(e){

    if(e.length == 0){
      return;
    }

    let letraFormatada = e.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
    { return a.toUpperCase(); });

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    let cidadao = ListaDeContatos.filter(n => n.first_name == letraFormatada);

      setContatos(cidadao);
      zerarFiltro("nome");
  }

  async function filtrarLinguagem(e){

    if(e.length === 0 ){
      return;
    }

    let letraFormatada = e.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
    { return a.toUpperCase(); });

    const response = localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = await JSON.parse(response);

    let linguagemFiltrada = ListaDeContatos.filter(n => n.language == letraFormatada)

    setContatos(linguagemFiltrada);
    zerarFiltro("linguagem");

  }
  async function filtrarGenero(genero){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    if(genero === "F"){
      const newLista = ListaDeContatos.filter(person => person.gender == 'F');
      setContatos(newLista);

    }else if(genero === "M"){
      const newLista = ListaDeContatos.filter(person => person.gender == 'M');
      setContatos(newLista);
    }

    zerarFiltro("genero"); 
  }
        
  async function zerarFiltro(Filtro){

    const response = await localStorage.getItem("ListaDeContatos");
    let ListaDeContatos = JSON.parse(response);

    if(Filtro === "nome"){

      setFiltroIdade('');
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "linguagem"){
      setFiltroIdade('');
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "genero"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');
      setFiltroIdade('');
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "idade"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setFiltroLinguagem('');
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "mes"){
      setFiltroIdade('');
      setFiltroNome('');
      setFiltroLinguagem('');
      document.querySelector('#form-orderBy').reset();

    }else if(Filtro === "geral"){
      document.querySelector('#inputGroupSelect01').value = 0;
      setContatos(ListaDeContatos);
      setFiltroLinguagem('');
      setFiltroIdade('');
      setFiltroNome('');
      document.querySelector('#form-orderBy').reset();
    }
  }

  return(
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          
          <Card body>
            <Row>
              <Accordion.Toggle as={Button} variant="outline-success" eventKey="1" size="sm"> Filtro<i class="fas fa-filter"></i></Accordion.Toggle>
              <Button className="mx-2" variant="outline-danger" onClick={() => {zerarFiltro('geral')}} size="sm">Limpar filtro <i class="fas fa-filter"></i></Button>
              <Form.Check type="switch" id="custom-switch" label={tabelaDeContatos == true ? 'Tabela On' : 'Tabela off'} onClick={() => {setTabelaDeContatos(!tabelaDeContatos)}} />
            </Row>
          </Card>

          <Accordion.Collapse eventKey="1">
            <Card>
              <Form className="filtro-container">

                <div className="text-center h4-ordenar mb-4">
                  <h4>Filtrar por</h4>
                </div>

                <Row>

                  <Col lg={2}>
                      <Dropdown>

                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
                          Gênero
                        </Dropdown.Toggle>

                        <Dropdown.Menu as="ul">      
                            <Dropdown.Item  onClick={(e)=> filtrarGenero("F")}>Feminino</Dropdown.Item>
                            <Dropdown.Item  onClick={(e)=> filtrarGenero("M")}>Masculino</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                  </Col>


                  <Col lg={3}>
                    <InputGroup className="mb-2">

                      <FormControl type="text" className="input-leste" aria-label="Nome a ser pesquisado" 
                        aria-describedby="button-addon2" value={filtroNome} onChange={(e)=> setFiltroNome(e.target.value)} placeholder="Nome"/>

                      <InputGroup.Append>
                        <Button className="btn-leste-outline" id="button-addon2" onClick={(e) => filtrarPorNome(filtroNome)}><i class="fas fa-search"></i></Button>
                      </InputGroup.Append>

                    </InputGroup >
                  </Col>
          
                  <Col lg={2}>

                    <InputGroup className="mb-2">

                      <FormControl type="text" className="input-leste" aria-label="Recipient's username" 
                      aria-describedby="button-addon2" value={filtroLinguagem} onChange={(e)=> setFiltroLinguagem(e.target.value)} placeholder="Idioma"/>
                        
                      <InputGroup.Append>
                        <Button className="btn-leste-outline" id="button-addon2" 
                        onClick={(e) =>  filtrarLinguagem(filtroLinguagem)}> <i class="fas fa-search"></i></Button>
                      </InputGroup.Append>

                      </InputGroup >
                  </Col>


                  <Col lg={2}>

                  <InputGroup className="mb-2">
                      <Form.Control as="select" className="input-leste" id="inputGroupSelect01" onChange={(e) => filtrarPorMesOuIdade(e.target.value, "mes")}>
                        <option value="0" selected>Mês</option>
                        <option value="01" >Janeiro</option>
                        <option value="02">Fevereiro</option>
                        <option value="03">Março</option>
                        <option value="04">Abril</option>
                        <option value="05">Maio</option>
                        <option value="06">Junho</option>
                        <option value="07">Julho</option>
                        <option value="08">Agosto</option>
                        <option value="09">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                      </Form.Control>
                    </InputGroup >

                  </Col>


                  <Col lg={2}>
                    <InputGroup className="mb-2">

                      <FormControl type="number" className="input-leste" aria-label="Recipient's username" 
                      aria-describedby="button-addon2" value={filtroIdade} onChange={(e)=> setFiltroIdade(e.target.value)} placeholder="Idade" min="0"/>

                      <InputGroup.Append>
                        <Button className="btn-leste-outline" type="button" id="button-addon2" onClick={(e) => filtrarPorMesOuIdade(filtroIdade, "idade")}><i class="fas fa-search"></i></Button>
                      </InputGroup.Append>

                    </InputGroup >
                  </Col>
                </Row>

                  <Row>
                    <Col>
                      <div className="text-center h4-ordenar">
                        <h4>Ordenar por</h4>
                      </div>
                      <OrderBy setContatos={ setContatos }></OrderBy>
                    </Col>
                  </Row>
                  
              </Form>
            </Card>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );

}
