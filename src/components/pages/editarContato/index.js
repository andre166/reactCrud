import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import './editarContato.css';

export default function EditarContatos() {

    let idParams = useParams()

    const [contatos, setContatos] = useState([])
    const [posicaoDocontato, setposicaoDocontato] = useState([])

    let [id, setId] = useState("")
    let [first_name, setFirstName] = useState("")
    let [last_name, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [gender, setGender] = useState("")
    let [language, setLanguage] = useState("")
    let [avatar, setAvatar] = useState("")
    let [birthday, setBirthday] = useState("")


    useEffect(() => {
      
        async function pegarContato(idParams) {

            let idConvertido = parseInt(idParams.id);

            setId(idConvertido)

            const response = localStorage.getItem("contatosApi");
            let ListaDeContatos = JSON.parse(response);

            let posicaoContato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == idConvertido))

            setposicaoDocontato(posicaoContato)

            let contato = ListaDeContatos[posicaoContato];   

            setContatos(contato)

            let data = String(contato.birthday).split(' ');
            let days = String(data[0]).split('-');
            let dataFormatada =  [days[2],"-", days[1],"-", days[0]].join('');

            setFirstName(contato.first_name)
            setLastName(contato.last_name)
            setEmail(contato.email)
            setGender(contato.gender)
            setLanguage(contato.language)
            setAvatar(contato.avatar)
            setBirthday(dataFormatada)

        }
        
        pegarContato(idParams);
  
    }, []);

    async function editarContato(){

        const response = localStorage.getItem("contatosApi");
        let ListaDeContatos = JSON.parse(response);

        let newContact = [];

        let dataFormatada = [];

        let data = String(birthday).split(' ');
        let days = String(data[0]).split('-');
        dataFormatada =  [days[2],"-", days[1],"-", days[0]].join('');

        birthday = dataFormatada;
        
        newContact = {id, first_name, last_name, email, gender, language, avatar, birthday};
        
        ListaDeContatos[posicaoDocontato] =  newContact;

        localStorage.setItem("contatosApi", JSON.stringify(ListaDeContatos));

       return  <Link to={{pathname:'/ListaDeContatos'}}></Link>;

    }


    async function deleteContact(id) {

        const response = localStorage.getItem("contatosApi");
        let ListaDeContatos = JSON.parse(response);


        let contato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == id));

        ListaDeContatos.splice(contato, 1);
        localStorage.setItem("contatosApi", JSON.stringify(ListaDeContatos));

        setContatos(ListaDeContatos);

        return <Link ></Link>

    }

 return (

    <div className="container my-2">
       <div class="card card-body">
            <div class="jumbotron py-4 mb-2">
                <h1 class="display-4 text-center contato-h1">Editar Contato</h1>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="alert alert-success text-center" id="alertaEditadoComSucesso" style={{display: 'none'}}>
                        <h4>Foto editada com sucesso</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div class="card" >

                        <div className="text-center mt-2">
                            <img class="card-img-top img-thumbnail rounded-circle" src={contatos.avatar} alt="Card image cap" style={{height: '12rem'}, {maxWidth: '14rem'}}/>
                        </div>

                        <div className="text-center">

                            <button class="btn btn-info btn-sm mt-2 w-50" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Alterar foto
                            </button>

                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">

                                    <div class="col mb-3">
                                        <label for="validationServer02">Digite a Url</label>
                                        <input type="url" class="form-control" id="validationServer02" 
                                        value={avatar}  onChange={(e)=> setAvatar(e.target.value)} placeholder="Digite a url"/>

                                        <div className="col">
                                            <button type="button" class="close closeIcon" aria-label="Close"  data-toggle="collapse"  
                                                href="#multiCollapseExample1" role="button" onClick={()=> setAvatar('')}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>

                        </div>

                        <div class="card-body">
                            <div className="row">
                                <div className="col">

                                    <p class="card-text">Nome: {first_name} {last_name}</p>                               
                                    <p class="card-text">Email: {email}</p>
                                    <p class="card-text">Gênero: {gender == 'M' ? contatos.gender = 'Masculino' :  contatos.gender = 'Feminino'}</p>
                                    <p class="card-text">Linguagem: {language}</p>
                                    <p class="card-text">Data de nascimento: {contatos.birthday}</p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            

                <div className="col-md-8">
                    <div className="card card-body">

                        <form onSubmit={editarContato} action={  `/ListaDeContatos/editsuccess`  }>
                    
                            <div className="row">

                                <div class="form-group col-md-6">
                                    <label for="exampleInputEmail1">Primeiro Nome:</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" 
                                    placeholder="Primeiro nome"  value={first_name} onChange={(e)=> setFirstName(e.target.value)}/>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="exampleInputEmail1">Ultimo Nome:</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1"  
                                    placeholder="Ultimo nome"  value={last_name} onChange={(e)=> setLastName(e.target.value)}/>
                                </div>

                            </div>
                        
                            <div className="row">
                                
                                <div class="form-group  col-sm-6">
                                    <label for="exampleInputEmail1">Email:</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1"  
                                    placeholder="Email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                                </div>

                                <div class="col-sm-4 mb-3 ml-4">

                                    <div class="form-check form-check-inline mt-4">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="M"   onChange={e => setGender(e.target.value) } />
                                        <label class="form-check-label" for="inlineRadio1">Masculino</label>
                                    </div>

                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="F"   onChange={e => setGender(e.target.value)} />
                                        <label class="form-check-label" for="inlineRadio2">Feminino</label>
                                    </div>
                                    
                                </div>
                            
                            </div> 

                            <div className="row">
                                
                                <div class="form-group  col-md-6">
                                    <label for="exampleInputEmail1">Linguagem:</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" 
                                    placeholder="Enter email" value={language} 
                                    onChange={(e)=> setLanguage(e.target.value)}/>
                                </div>
                            
                                <div class="form-group col-md-6">
                                    <label for="exampleInputPassword1">Data de nascimento:</label>
                                    <input type="date" class="form-control" id="exampleInputPassword1" 
                                    value={birthday} onChange={(e)=> setBirthday(e.target.value)}/>
                                </div>
                            </div> 

                            <hr/>

                            <div className="row">
                                <div className="col text-center">
                                    <button type="submit" class="btn btn-success">Confirmar</button>
                                    <button type="button" class="btn btn-danger ml-2" onClick={()=>{deleteContact(id)}}>Excluir</button>

                                </div>
                            </div>
                        
                        </form>
                    </div>
                </div>
            </div>   
        </div>   
    </div>
 )
}



