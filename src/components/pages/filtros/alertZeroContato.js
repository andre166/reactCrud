import React, { useState, useEffect }from 'react';

export default function AlertaZeroContato({
    contatos,
    setContatos
}){

  useEffect(() => {
    
    async function alertaNenhumContato(){
      
      let x = document.querySelector('#msgErro');
    
          if(contatos.length == 0){
            x.style.display = "block";    
          }else{
            x.style.display = "none";
          }
  
      }
  
        alertaNenhumContato();


  }, [contatos])
  


  return(
    <div className="row">
      <div className="col-sm-12">
        <div className="alert text-center" id="msgErro" style={{display: 'none'}}>
          <h4 className="alert alert-danger py-4">Nenhum contato encontrado!</h4>
        </div>
      </div>
    </div>

);
}