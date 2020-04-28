import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/pages/home';
import CadastrarContato from './components/pages/cadastrarContato';
import ListaDeContatos from './components/pages/listaDeContatos';
import EditarContatos from './components/pages/editarContato';
import Estatisticas from './components/pages/estatisticas';
import Erro from './components/pages/erro';
import Header from './components/header';
import Footer from './components/footer';


const Routes = () =>{
    
    return (
    <BrowserRouter>
        <Header/>
            <Switch>
                <Route exact path='/' component={Home}/>

                <Route exact path='/ListaDeContatos/' component={ListaDeContatos}/>

                <Route path='/EditarContatos/:id' component={EditarContatos}/>          
                <Route path='/CadastrarContato' component={CadastrarContato}/>
                <Route exact path='/Estatisticas' component={Estatisticas}/>
                
                <Route path="*" component={Erro}/>
            </Switch>
        <Footer/>
    </BrowserRouter>

    );
}

export default Routes;