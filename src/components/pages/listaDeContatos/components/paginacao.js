import React, {useState, useEffect} from 'react';
import { Card, Button, Modal, Table, Tooltip } from 'react-bootstrap';


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
                        <a type="button" onClick={()=> paginate(number)}  className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>

        </nav>
    );

}