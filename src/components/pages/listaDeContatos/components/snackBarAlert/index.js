import React, { useState, useEffect }from 'react';

import './snackBar.css';

export default function Footer() {

    const [alertaMsg, setAlertaMsg] = useState([]);

    let alertaEditadoSuccess = false;
    let alertaCadastradoSuccess = false;
    let alertaExcluidoSuccess = false;

  useEffect(() => {

    
    (async function verificarAlerta() {
      
      const  MenssagemEditadoouCadastrado =  await localStorage.getItem("MSG");

      if(MenssagemEditadoouCadastrado == "ExcluidoSuccess"){

        alertaExcluidoSuccess = true;
        await gerarAlerta();
      }else if(MenssagemEditadoouCadastrado == "EditadoSuccess"){

        alertaEditadoSuccess = true;
        gerarAlerta();

      }else if(MenssagemEditadoouCadastrado == "CadastradoSuccess"){

        alertaCadastradoSuccess = true;
        gerarAlerta();

      }

    })();

    }, [localStorage.getItem("MSG")]);

  async function gerarAlerta() {

    if(alertaExcluidoSuccess){

      setAlertaMsg('Excluído');

      let x = document.querySelector('#snackBarContent');
      let y = document.querySelector('#msg-alert');
      y.classList.add('alerta-msg-danger');

      showDivAlerta(x);
      alertaExcluidoSuccess = false;
  
    }

    if(alertaEditadoSuccess){

    setAlertaMsg('Editado');
    
    let x = document.querySelector('#snackBarContent');
    let y = document.querySelector('#msg-alert');
    y.classList.add('alerta-msg-info');

    showDivAlerta(x);
    alertaEditadoSuccess = false;

    }else if(alertaCadastradoSuccess){

      setAlertaMsg('Cadastrado');

      let x = document.querySelector('#snackBarContent');
      let y = document.querySelector('#msg-alert');
      y.classList.add('alerta-msg-success');

      showDivAlerta(x);
      alertaCadastradoSuccess = false;

    }
    
  }
    
  function showDivAlerta(x){

    x.style.opacity = 1;
    x.style.display = "block"; 

    setInterval(function () {

      let fadeEffect2 = setInterval(function () {
        if (!x.style.opacity) {
            x.style.opacity = 1;
        }
        if (x.style.opacity > 0) {
          x.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect2);
            x.style.display = "none";
          }

      }, 200);

    }, 3500);

     localStorage.removeItem("MSG");
  }
        
    return(
        <div id="snackBar">
            <div id="snackBarContent" className="snackBar-Custom"  style={{display: 'none'}}>
                <span>Usuário <span id="msg-alert">{alertaMsg}</span> com sucesso!</span>
            </div>
        </div>
    )
}