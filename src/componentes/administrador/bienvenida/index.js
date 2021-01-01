import React from 'react';
import Container from '@material-ui/core/Container';
import Img from '../../img/admin-min.png';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './img.css';



const Bienvenida = ({ruta="/"}) =>{
const [{alias}] = JSON.parse(sessionStorage.getItem("resul"))

    return(
   <React.Fragment>
       <h1 style={{textAlign:'center'}}>Bienvenido:</h1>
       <h4 style={{textAlign:'center',textTransform:"uppercase"}}>{alias}</h4>
   <Container maxWidth="sm">
     <section className="im" style={{ backgroundImage:"url("+Img+")",backgroundSize:'cover', height: '100vh',textAlign:'center' }} >
     <Button className="btn" variant="outlined"><Link to={ruta} >Empezar</Link></Button>
     </section>
   </Container>
 </React.Fragment>
    );
}

export default Bienvenida;
