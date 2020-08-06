import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {useStyles} from './styles';
import Imgs from '../../img/blob-shape.svg';
import Imgs1 from '../../img/blob-shape2.svg';
import Imgs2 from '../../img/blob-shape3.svg';
import Imgs3 from '../../img/blob-shape4.svg';

const StoreImg =[{n:Imgs},{n:Imgs1},{n:Imgs2},{n:Imgs3}]

const Cards =  ({clave_materia , nombre,modalidad, semestre,plan}) =>{
const classes = useStyles();


    return(
<>
<Card elevation={5} style={{backgroundColor:'whitesmoke',backgroundPosition: 'left', marginTop:4 ,width:400,textAlign:'center',backgroundImage:"url("+StoreImg[Math.floor(Math.random() * (4 - 0)) + 0].n+")"}} className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Materia
        </Typography>
        <Typography component="h2">
         <small >{nombre}</small> 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Modalidad: {modalidad}
        </Typography>
        <Typography variant="body2" component="p">
        Plan: {plan}
          <br />
          Clave: {clave_materia}
        </Typography>
      </CardContent>
      <CardActions>
    <Button size="small">Semestre: "{semestre}"</Button> <Button style={{marginInlineStart:'auto'}} size="small"><Link to="/Docente">Iniciar</Link></Button>
      </CardActions>
    </Card>
</>
    );
}

export default Cards;