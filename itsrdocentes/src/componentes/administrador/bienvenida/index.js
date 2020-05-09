import React from 'react';
import Container from '@material-ui/core/Container';
import Img from '../../img/admin.webp';
import './img.css';

const Bienvenida = () =>{
    return(
   <React.Fragment>
       <h1 style={{textAlign:'center'}}>Bienvenido</h1>
   <Container maxWidth="sm">
     <section className="im" style={{ backgroundImage:"url("+Img+")",backgroundSize:'cover', height: '100vh' }} ></section>
   </Container>
 </React.Fragment>
    );
}

export default Bienvenida;