import React from 'react';
import './loginCss.css';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import Add from './20670.webp';
import AuthService from '../componentes/servicios/AuthService';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import *as toastr from 'toastr';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { usuario: '', password: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.authService = new AuthService();
  }
  
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
  }
  
	handleSubmit() {
   if(this.state.usuario.length && this.state.password.length){
	this.authService.login(this.state.usuario,this.state.password).then(() => {
		this.props.onAuthChange();
		this.props.history.replace('/')
	  }).catch(() =>{
		toastr.error("No se encontró el servicio ", null)
	  })
   }else{
		toastr.warning("Ingrese su usuario y contraseña", null)
   }
  }

	render() {
    const {classes} = this.props;
		return (
			<div>
				<header className="stilos">
					<nav className="navStilos">
						<a href="#" id="icono" className="icono nav_a">
							<Button variant="outlined" color="primary">
								Registrarse
							</Button>
						</a>
						<div className="enlaces uno" id="enlaces" />
					</nav>
					<div className="container">
						<div className="textos">
							<h2>LICLIC</h2>
							<h3>DOCENTES</h3>
							<img src={Add} alt="" />
						</div>
						<div className="logins">
							<Paper elevation={3}>
								<Container component="main" maxWidth="xs">
									<CssBaseline />
									<div className={classes.paper}>
										<Avatar className={classes.avatar}>
											<LockOutlinedIcon />
										</Avatar>
										<Typography component="h1" variant="h5">
											BIENVENIDO
										</Typography>
										<form style={{marginTop:'2rem'}} className={classes.form}   >
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												id="usuario"
												label="Ingrese su usuario"
												name="usuario"
												autoComplete="email"
											//	autoFocus
												onChange={this.handleChange}
											/>
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												name="password"
												label="Ingrese su contraseña"
												type="password"
												id="password"
												autoComplete="current-password"
												onChange={this.handleChange}
											/>
											<Button style={{marginTop:'3rem'}}
												fullWidth
												variant="contained"
												color="primary"
												className={classes.submit}
												onClick={this.handleSubmit}
												endIcon={<ArrowRightAltIcon />}
											>
												Iniciar
											</Button>
											<Grid container>
												<Grid item xs>
													<br></br>
												</Grid>
												<Grid item>
												</Grid>
											</Grid>
										</form>
									</div>
									<Box mt={4}> </Box>
								</Container>
								<CssBaseline />
							</Paper>
						</div>
					</div>
				</header>

				<div className="wave">
					<div style={{ height: '150px', overflow: 'hidden' }}>
						<svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
							<path
								d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
								style={{ stroke: 'none', fill: '#fff' }}
							/>
						</svg>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(withStyles(useStyles)(Login));
