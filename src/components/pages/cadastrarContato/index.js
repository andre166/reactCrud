import React, { useState } from 'react';
import './cadastrarContato.css';

export default function AddContato() {

    let [first_name, setFirstName] = useState("");
    let [last_name, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [gender, setGender] = useState("");
    let [language, setLanguage] = useState("");
    let [avatar, setAvatar] = useState("");
    let [birthday, setBirthday] = useState("");
    
    async function gerarId(){
        
        let ultimoId = 0;
        
        const response = await localStorage.getItem("ListaDeContatos");
        
        let contactsArray = JSON.parse(response);
        
        let ultimo = contactsArray[contactsArray.length - 1];
    
        ultimoId = ultimo.id + 1;
        
        let id = parseInt(ultimoId);
        
        register(id);
        
    }
    
    async function register(id) {
        
        const response = await localStorage.getItem("ListaDeContatos");
        let contactsArray = JSON.parse(response);
        
        let newContact = [];
        
        let data = String(birthday).split(' ');
        let days = String(data[0]).split('-');
        let dataFormatada =  [days[2],"/", days[1],"/", days[0]].join('');

        let languageFormatada = language.toLowerCase().replace(/(?:^|\s)\S/g, function(a) 
        { return a.toUpperCase(); });
        
        
        birthday = dataFormatada;
        language = languageFormatada;
        
        newContact = {id, first_name, last_name, email, gender, language, avatar, birthday}
        
        contactsArray.push(newContact);
        
        await localStorage.setItem("ListaDeContatos", JSON.stringify(contactsArray));
        await localStorage.setItem("MSG", "CadastradoSuccess");
        
    }
  
    
    return(
        
        <div class="container container-addContato">
            <div className="card card-body mt-2 ">
               
                <div class="jumbotron py-4">
                    <h1 class="text-center contato-h1">Cadastrar Contatos</h1>
                </div>

                <div className="card card-body form-cadastro">
                    
                    <form onSubmit={gerarId} action={  `/ListaDeContatos`  }>

                        <div class="form-row">

                            <div class="col-md-4 mb-3">
                                <label>Primeiro Nome:</label>
                                <input type="text" class="form-control" 
                                value={first_name} maxLength="17"
                                onChange={(e)=> setFirstName(e.target.value)} placeholder="Digite o Primeiro Nome" required />
                                
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="validationServer02">Último Nome:</label>
                                <input type="text" class="form-control" id="validationServer02" 
                                value={last_name} required maxLength="17"
                                onChange={(e)=> setLastName(e.target.value)} placeholder="Digite o Último nome" />
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="validationServer02">Email:</label>
                                <input type="email" class="form-control" id="validationServer02" 
                                value={email} required autoComplete="off" maxLength="30"
                                onChange={(e)=> setEmail(e.target.value)} placeholder="Digite o Email" />
                            </div>

                        </div>

                        <div class="form-row">

                            <div class="col-md-4 mb-3">
                                <label for="validationServer02">Idioma:</label>

                                <input type="text" class="form-control" id="validationServer02" 
                                value={language} required maxLength="17"
                                onChange={(e)=> setLanguage(e.target.value)} placeholder="Digite o idioma" />
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="validationServer02">Data de nascimento:</label>
                                <input type="date" class="form-control" id="validationServer02" 
                                value={birthday} required
                                onChange={(e)=> setBirthday(e.target.value)} placeholder="Digite o sobre nome" />
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="validationServer02">Avatar(Url)</label>
                                <input type="url" class="form-control" id="validationServer02" 
                                value={avatar}  onChange={(e)=> setAvatar(e.target.value)} placeholder="https://" />
                            </div>

                        </div>

                        <div class="form-row">


                            <label class="ml-2 " for="validationServer02">Sexo: </label>
                            <div class="col-md-4 mb-3 form-check-inline">

                                <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" id="customControlValidation1" name="genero" value="M"   onChange={e => setGender(e.target.value) } required/>
                                    <label class="custom-control-label" for="customControlValidation1">Masculino</label>
                                </div>

                                <div class="custom-control custom-radio ml-2">
                                    <input type="radio" class="custom-control-input" id="customControlValidation2" name="genero" value="F" onChange={e => setGender(e.target.value) } required />
                                    <label class="custom-control-label" for="customControlValidation2">Feminino</label>
                                </div>
                            </div>
                            
                        </div>

                        <div className="text-center">
                            <hr className="leste-bg-escuro"/>
                            <button class="btn btn-leste mt-2" type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>         
    );
}



