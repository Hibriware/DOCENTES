import React from 'react';
import '././css/loginCss.css';
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
import { useStyles } from './styles/styles';
import Add from '../componentes/img/20670.webp';
import AuthService from '../componentes/servicios/AuthService';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import *as toastr from 'toastr';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NoDisponible from "../componentes/404/NoDisponible";


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { usuario: '', password: '', showPassword: false ,loading:false};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.authService = new AuthService();
  }

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
  }

   handleClickShowPassword =()=> {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

   handleMouseDownPassword(event) {
    event.preventDefault();
  }

	handleSubmit() {
   	this.setState({loading: true})
   if(this.state.usuario.length && this.state.password.length){
	this.authService.login(this.state.usuario,this.state.password).then(() => {
		this.setState({loading: false})
		this.props.history.replace('/')
		this.props.onAuthChange();
	  }).catch(() =>{
	  	this.setState({loading: false})
		toastr.error("No se encontró el servicio ", null)
	  })
   }else{
	   this.setState({loading: false})
		toastr.warning("Ingrese su usuario y contraseña", null)
   }
	}

	render() {
    const {classes} = this.props;
		return (
			<div>
				<header className="stilos">


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
											<NoDisponible/>
											{/*<TextField
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
												<FormControl variant="outlined" fullWidth>
												<InputLabel htmlFor="outlined-adornment-password">Ingrese su contraseña</InputLabel>
												<OutlinedInput
												id="outlined-adornment-password"
												name="password"
												label="Ingrese su contraseña"
												fullWidth
												type={this.state.showPassword ? 'text' : 'password'}
												value={this.state.password}
												onChange={this.handleChange}
												endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={this.handleClickShowPassword}
														onMouseDown={this.handleMouseDownPassword}
														edge="end"
													>
														{this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
													</IconButton>
												</InputAdornment>
											}
												labelWidth={70}
												/>
												</FormControl>

												<Button style={{marginTop: '3rem'}}
												disabled={this.state.loading}
												fullWidth
												variant="contained"
												color="primary"
												className={classes.submit}
												onClick={this.handleSubmit}
												endIcon={this.state.loading ? <MoreHorizIcon/> : <ArrowRightAltIcon/>}
												>
												Iniciar
												</Button>*/}
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
