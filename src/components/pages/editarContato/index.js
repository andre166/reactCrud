import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import './editarContato.css';

export default function EditarContatos() {

    let idParams = useParams()

    const [contatos, setContatos] = useState([])
    const [posicaoDocontato, setposicaoDocontato] = useState([]);
    const [ListaContatos, setListaContatos] = useState([]);

    let [id, setId] = useState("")
    let [first_name, setFirstName] = useState("")
    let [last_name, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [gender, setGender] = useState("")
    let [language, setLanguage] = useState("")
    let [avatar, setAvatar] = useState("")
    let [birthday, setBirthday] = useState("")

    let ContatoEditado = false;
    let history = useHistory();


    useEffect(() => {
      
        (async function pegarContato(idParams) {

            let idConvertido = parseInt(idParams.id);

            setId(idConvertido)

            const response = await localStorage.getItem("contatosApi");
            let ListaDeContatos = JSON.parse(response);
            setListaContatos(ListaDeContatos);

            let posicaoContato = ListaDeContatos.indexOf(ListaDeContatos.find(n => n.id == idConvertido));

            setposicaoDocontato(posicaoContato);

            let contato = ListaDeContatos[posicaoContato];   

            setContatos(contato);

            let data = String(contato.birthday).split(' ');
            let days = String(data[0]).split('/');
            let dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');

            setFirstName(contato.first_name)
            setLastName(contato.last_name)
            setEmail(contato.email)
            setGender(contato.gender)
            setLanguage(contato.language)
            setAvatar(contato.avatar)
            setBirthday(dataFormatada)

        })(idParams);
      
    }, []);

    async function editarContato(){

        let newContact = [];
        let data = [];
        let days = [];
        let dataFormatada = [];
        
        if(birthday.indexOf("-") > -1){

            data = String(birthday).split(' ');
            days = String(data[0]).split('-');
            dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');
            
        }else{

            data = String(birthday).split(' ');
            days = String(data[0]).split('/');
            dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');

        }

        let languageFormatada = language.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
        { return a.toUpperCase(); });

        birthday = dataFormatada;
        language = languageFormatada;
        
        newContact = {id, first_name, last_name, email, gender, language, avatar, birthday};
        
        ListaContatos[posicaoDocontato] =  newContact;

        await localStorage.setItem("contatosApi", JSON.stringify(ListaContatos));

        if(ContatoEditado){

            await localStorage.setItem("MSG", "EditadoSuccess");

        }else{
            await localStorage.setItem("MSG", "ExcluidoSuccess");

        }

    }

    async function deleteContact(id) {
        
        await localStorage.setItem("MSG", "ExcluidoSuccess");
        
        let contato = ListaContatos.indexOf(ListaContatos.find(n => n.id == id));

        ListaContatos.splice(contato, 1);


        await localStorage.setItem("contatosApi", JSON.stringify(ListaContatos));

        return history.push("/ListaDeContatos");
    }


 return (
    <div class="container-editarContato">
        <div className="container ">
            <div class="card card-body">

                <div class="jumbotron py-4  mb-2">
                    <h1 class="display-4 text-center">Editar Contato</h1>
                </div>

                <div className="row ">

                    <div className="col-md-4 ">
                        <div class="card " >

                            <div className="text-center mt-2">
                                <img class="card-img-top img-thumbnail rounded-circle" src={contatos.avatar} alt="Card image cap" style={{height: '12rem'}, {maxWidth: '14rem'}}/>
                            </div>

                            <div className="text-center px-2 mb-2">

                                <button class="btn btn-info btn-sm my-2 w-50" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Alterar foto
                                </button>

                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body p-0">

                                        <div class="col mb-4">
                                            <label for="validationServer02">Digite a Url</label>
                                            <input type="url" class="form-control input-url" id="validationServer02" 
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

                        </div>
                    </div>
                

                    <div className="col-md-8">
                        <div className="card card-body  py-2">

                            <form onSubmit={editarContato} action={  `/ListaDeContatos`  }>
                        
                                <div className="row py-0">

                                    <div class="form-group col-md-6 py-0 my-2">
                                        <label for="exampleInputEmail1">Primeiro Nome:</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" 
                                        placeholder="Primeiro nome"  value={first_name} onChange={(e)=> setFirstName(e.target.value)}/>
                                    </div>

                                    <div class="form-group col-md-6 py-0 my-2">
                                        <label for="exampleInputEmail1">Ultimo Nome:</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1"  
                                        placeholder="Ultimo nome"  value={last_name} onChange={(e)=> setLastName(e.target.value)}/>
                                    </div>

                                </div>
                            
                                <div className="row">
                                    
                                    <div class="form-group  col-sm-6 py-0 my-2">
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
                                        <button type="submit" class="btn btn-leste" onClick={()=>{ ContatoEditado = true}} >Confirmar</button>
                                        <button type="button" class="btn btn-danger ml-2" onClick={()=>{deleteContact(id)}}>Excluir</button>
                                    </div>
                                </div>
                            
                            </form>

                        </div>
                    </div>
                </div>   
            </div>   
        </div>
    </div>
 )
}




