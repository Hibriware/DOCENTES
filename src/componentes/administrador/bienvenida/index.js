import React from 'react';
import Container from '@material-ui/core/Container';
import Img from '../../img/admin.webp';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import Acta_entregas from '../../administrador/acta_entregas'
import Button from '@material-ui/core/Button';
import './img.css';


const Bienvenida = () =>{
    return(
   <React.Fragment>
       <h1 style={{textAlign:'center'}}>Bienvenido</h1>
   <Container maxWidth="sm">
     <section className="im" style={{ backgroundImage:"url("+Img+")",backgroundSize:'cover', height: '100vh',textAlign:'center' }} >
     <Button className="btn" variant="outlined"><Link to="/inicio" >Empezar</Link></Button>
     </section>
   </Container>
 </React.Fragment>
    );
}

export default Bienvenida;