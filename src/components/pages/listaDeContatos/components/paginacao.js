import React, { useEffect } from 'react';

import '../listaDeContatos.css';

export default function Paginacao({ contatos, contatosPorPagina, paginate, zerarPaginacao }){

    useEffect(() => {
        foco(1);
    }, [contatos, contatosPorPagina, zerarPaginacao]);

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(contatos / contatosPorPagina); i++){
        pageNumber.push(i);
    }

    
    function foco(number){

        pageNumber.map((info, index) => (
                focar(info, index)
            ));
            
            function focar(info, index){
                
                if(number == info){
                    let x = document.querySelector(`#pag-${index}`);
                    x.classList.add('ativo-paginacao');
                }else{
                    let x = document.querySelector(`#pag-${index}`);
                    x.classList.remove('ativo-paginacao');
                }    
            }

        paginate(number);
    }
        
    return(
        <nav>
            <ul className="pagination">
                {pageNumber.map((number, index) => (
                    <li key={number} className="page-item">
                        <a type="button" onClick={()=> foco(number)} id={"pag-"+index} className="paginator bg-softGreen-escuro">
                            <span>{number}</span>
                        </a>
                    </li>
                ))}
            </ul>

        </nav>
    );

}