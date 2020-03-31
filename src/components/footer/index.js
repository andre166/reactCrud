import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './footer.css';


class Footer extends Component{
    render(){
        
        return(

            <footer class="footer-custom">
              
                    <div class="row w-100">

                        <div class="col-sm-12">

            
                            <div class="middle mt-4">
                                
                                <a class="btn-footer1" href="https://www.facebook.com/andre.mesquitasd" target="_blank">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a class="btn-footer1" href="https://www.instagram.com/mesquitaandre/?hl=pt-br" target="_blank">
                                    <i class="fab fa-instagram"></i>
                                </a>
                    
                                <a class="btn-footer1" href="https://www.linkedin.com/in/andr%C3%A9-mesquita-295974190/" target="_blank">
                                    <i class="fab fa-invision"></i>
                                </a>
            
                                <a class="btn-footer1" href="https://api.whatsapp.com/send?phone=5521981235902" target="_blank">
                                    <i class="fab fa-whatsapp"></i>
                                </a>

                                <a class="btn-footer1" href="https://github.com/andre166" target="_blank">
                                    <i class="fab fa-github"></i>
                                </a>

                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-2">
                        <b>André Mesquita</b> <span class="text-footer">&copy; Todos os direitos reservados</span>
                    </div>
            
            </footer>

            // <footer class="mt-4 w-100">

            //     <div class="footer-custom">
    
            //         <div class="text-center fustify-content-end h-100 ">
            //             <p class="mb-0 pb-2 p-footer h-100"> <b class="b-footer">André Mesquita</b> &copy; 2020 - Todos os direitos reservados</p>
            //         </div>

            //     </div>
            // </footer>
        
        );
    }
}

export default Footer;





