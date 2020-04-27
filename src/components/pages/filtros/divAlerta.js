import React, { useState }from 'react';

export default function DivAlerta(){

  const [alertaMsg, setAlertaMsg] = useState([]);

    let alertaEditadoSuccess = false;
    let alertaCadastradoSuccess = false;
    let alertaExcluidoSuccess = false;


    async function verificarAlerta() {

      const  MenssagemEditadoouCadastrado = await localStorage.getItem("MSG");


      if(MenssagemEditadoouCadastrado == "EditadoSuccess"){

        alertaEditadoSuccess = true;
        gerarAlerta();

      }else if(MenssagemEditadoouCadastrado == "CadastradoSuccess"){

        alertaCadastradoSuccess = true;
        gerarAlerta();

      }else if(MenssagemEditadoouCadastrado == "ExcluidoSuccess"){

        alertaExcluidoSuccess = true;
        gerarAlerta();
      }

    }

    verificarAlerta();

  

  function showDivAlerta(x){

    x.style.opacity = 1;
    x.style.display = "block"; 

    let fadeEffect = setInterval(function () {

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

    }, 2000);

     localStorage.removeItem("MSG");
  }

  verificarAlerta();

  function gerarAlerta() {

    if(alertaEditadoSuccess){

    setAlertaMsg('Editado');
    
    let x = document.querySelector('#alertaDeSucesso');
    x.classList.add('alert-info');
    showDivAlerta(x);
    alertaEditadoSuccess = false;

    }else if(alertaCadastradoSuccess){

      setAlertaMsg('Cadastrado');

      let x = document.querySelector('#alertaDeSucesso');
      x.classList.add('alert-success');

      showDivAlerta(x);
      alertaCadastradoSuccess = false;

    }else if(alertaExcluidoSuccess){

      setAlertaMsg('Excluido');

      let x = document.querySelector('#alertaDeSucesso');
      x.classList.add('alert-danger');

      showDivAlerta(x);

      alertaExcluidoSuccess = false;
  
    }
  }

    return(
        <div className="row">
          <div className="col-sm-12">
            <div className="alert text-center" id="alertaDeSucesso" style={{display: 'none'}}>
              <h4>Usuário <strong>{alertaMsg}</strong> com sucesso!</h4>
            </div>
          </div>
        </div>

    );

}
