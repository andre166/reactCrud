import React, { useState, useEffect }from 'react';

import './snackBar.css';

export default function Footer() {

    const [alertaMsg, setAlertaMsg] = useState([]);

    // let alertaEditadoSuccess = false;
    // let alertaCadastradoSuccess = false;
    // let alertaExcluidoSuccess = false;

  useEffect(() => { //Vigia o localStorage para gerar menssagem de Editado, cadastrado ou excluído

    (function verificarAlerta() {
      
      const  MenssagemEditadoOuCadastrado =  localStorage.getItem("MSG");

      if(MenssagemEditadoOuCadastrado == "ExcluidoSuccess"){ //Vigia o localStorage e gera o alerta de acordo com o valor

        let idSnackBar = document.querySelector('#snackBarContent');
        let idAlerta = document.querySelector('#msg-alert');
        idAlerta.classList.add('alerta-msg-danger');

        setAlertaMsg('Excluído'); //Menssagem que será vista na snackBar
        showDivAlerta(idSnackBar);

      }else if(MenssagemEditadoOuCadastrado == "EditadoSuccess"){
        let idSnackBar = document.querySelector('#snackBarContent');
        let idAlerta = document.querySelector('#msg-alert');
        idAlerta.classList.add('alerta-msg-info');

        setAlertaMsg('Editado');
        showDivAlerta(idSnackBar);

      }else if(MenssagemEditadoOuCadastrado == "CadastradoSuccess"){

        let idSnackBar = document.querySelector('#snackBarContent');
        let idAlerta = document.querySelector('#msg-alert');
        idAlerta.classList.add('alerta-msg-success');

        setAlertaMsg('Cadastrado');
        showDivAlerta(idSnackBar);

      }

    })();

    }, [localStorage.getItem("MSG")]);
    
  function showDivAlerta(idSnackBar){ //show, fade e display none na snackbar após a menssagem de editado, excluídoou cadastrado

    idSnackBar.style.opacity = 1;
    idSnackBar.style.display = "block"; 

    setInterval(function () {

      let fadeEffect2 = setInterval(function () {
        if (!idSnackBar.style.opacity) {
          idSnackBar.style.opacity = 1;
        }
        if (idSnackBar.style.opacity > 0) {
          idSnackBar.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect2);
            idSnackBar.style.display = "none";
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