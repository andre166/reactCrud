import React from 'react';
import './footer.css';

export default function Footer() {
        
        return(

            <footer class="footer-custom">
                <div class="row w-100">

                    <div class="col-sm-5">
                        <div class="middle">
                            
                            <a class="btn-footer1" href="https://www.facebook.com/andre.mesquitasd" target="_blank" rel="noreferrer" aria-label="Facebook ícone">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="btn-footer1" href="https://www.instagram.com/mesquitaandre/?hl=pt-br" target="_blank" rel="noreferrer" aria-label="Instagram ícone">
                                <i class="fab fa-instagram"></i>
                            </a>
                
                            <a class="btn-footer1" href="https://www.linkedin.com/in/andr%C3%A9-mesquita-295974190/" target="_blank" rel="noreferrer" aria-label="Linkedin ícone">
                                <i class="fab fa-invision"></i>
                            </a>
        
                            <a class="btn-footer1" href="https://api.whatsapp.com/send?phone=5521981235902" target="_blank" rel="noreferrer" aria-label="Whatsapp ícone">
                                <i class="fab fa-whatsapp"></i>
                            </a>

                            <a class="btn-footer1" href="https://github.com/andre166" target="_blank" rel="noreferrer" aria-label="GitHub ícone">
                                <i class="fab fa-github"></i>
                            </a>

                        </div>
                    </div>

                    <div class="col-sm-2 portfolio-container">
                        <a href="https://angularportifolio.herokuapp.com/home" target="_blank" rel="noreferrer"><label className="btn-portifolio" aria-label="Link para o portifólio">Portifólio <i class="fas fa-external-link-alt"></i></label></a>
                    </div>

                    <div class="col-sm-5">
                        <div class="text-center">
                            <b>André Mesquita</b> <span class="text-footer">&copy; Todos os direitos reservados</span>
                        </div>
                    </div>


                </div>
            </footer>
        
        );
    }





