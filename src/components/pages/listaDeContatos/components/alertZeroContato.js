import React, { useEffect }from 'react';
import { Row, Col, Alert} from 'react-bootstrap';

export default function AlertaZeroContato({ contatos }){

  useEffect(() => {
    
    (async function alertaNenhumContato(){
      
      let x = document.querySelector('#msgErro');
    
        if(contatos.length == 0){
          x.style.display = "block";    
        }else{
          x.style.display = "none";
        }

      })();

  }, [contatos]);
  
  return(
    <Row>
      <Col>
        <Alert variant="danger" className="text-center" id="msgErro" style={{display: 'none'}}>
          <h4 className="py-4">Nenhum contato encontrado!</h4>
        </Alert>
      </Col>
    </Row>
  );
}