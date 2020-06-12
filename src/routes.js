import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/pages/home';
import CadastrarContato from './components/pages/cadastrarContato';
import ListaDeContatos from './components/pages/listaDeContatos';
import EditarContatos from './components/pages/editarContato';
import Estatisticas from './components/pages/estatisticas';
import Teste from './components/pages/teste';

import Erro from './components/pages/erro';
import Header from './components/header';
import Footer from './components/footer';

export default function Routes(){

    return (
        // <BrowserRouter>
        <div>
            {/* <Header/> */}
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/ListaDeContatos' component={ListaDeContatos}/>
                    <Route path='/EditarContatos/:id' component={EditarContatos}/>          
                    <Route exact path='/CadastrarContato' component={CadastrarContato}/>
                    <Route exact path='/Estatisticas' component={Estatisticas}/>
                    <Route exact path='/Teste' component={Teste}/>
            
                    <Route path="*" component={Erro}/>
                </Switch>
            <Footer/>
        </div>
        // </BrowserRouter>
    );
}
