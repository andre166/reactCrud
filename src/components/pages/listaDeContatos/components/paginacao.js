import React from 'react';
import '../listaDeContatos.css';

export default function paginacao({ contatos, contatosPorPagina, paginate }){

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(contatos / contatosPorPagina); i++){
        pageNumber.push(i);
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <a type="button" onClick={()=> paginate(number)}  className="paginator">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>

        </nav>
    );

}